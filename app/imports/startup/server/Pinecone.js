import { Pinecone } from '@pinecone-database/pinecone';
import { Document } from 'langchain/document';
import { Meteor } from 'meteor/meteor';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/dist/embeddings/openai';
import { Articles } from '../../api/articles/Articles';

/* eslint-disable no-console */
// Initialize Pinecone database
const pinecone = new Pinecone({
  apiKey: Meteor.settings.PINECONE_API_KEY,
  environment: Meteor.settings.PINECONE_ENVIRONMENT,
});
// Initialize OpenAI Embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: Meteor.settings.OPENAI_API_KEY,
});
// Initialize Pinecone index
const index = pinecone.index(Meteor.settings.PINECONE_INDEX);
// Get Pinecone index stats
const indexStats = await index.describeIndexStats();
console.log(`Total vector count: ${indexStats.totalRecordCount}`);

Meteor.methods({
  addEmbeddingstoDatabse: async function () {
    // Get articles from articles collection
    const articles = Articles.collection.find().fetch();
    const articleDocs = [];
    // Add all articles to one string
    for (let i = 0; i < articles.length; i++) {
      const article = new Document({
        pageContent: articles[i].content,
        metadata: {
          fileName: articles[i].fileName,
          title: articles[i].title,
        },
      });
      articleDocs.push(article);
    }
    // Split string into chunks of 2000 characters with 20 character overlap
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 20,
    });

    const chunks = await splitter.splitDocuments(articleDocs);
    // Loop through chunks of articles and add embedding to Pinecone database in batches of 100
    for (let j = 0; j < chunks.length + 100; j += 100) {
      const embeddingArray = [];
      for (let i = j; ((i < j + 100) && (i < chunks.length)); i++) {
        const chunk = chunks[i];
        // eslint-disable-next-line no-await-in-loop
        const embedding = await embeddings.embedQuery(chunk.pageContent);
        if (embedding) {
          embeddingArray.push({
            id: i.toString(),
            values: embedding,
            metadata: {
              content: chunk.pageContent,
              fileName: chunk.metadata.fileName,
              title: chunk.metadata.title,
            },
          });
        }
      }
      if (embeddingArray.length > 0) {
        console.log('Indexing embeddings');
        // eslint-disable-next-line no-await-in-loop
        await index.upsert(embeddingArray);
      }
    }
  },
});
// Check if Pinecone database is empty
if (indexStats.totalRecordCount === 0) {
  // If empty, add embeddings to Pinecone database
  console.log('Adding Embeddings to Pinecone Database');
  Meteor.call('addEmbeddingstoDatabse');
}

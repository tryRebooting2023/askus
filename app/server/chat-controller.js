import { Meteor } from 'meteor/meteor';
import OpenAI from 'openai';
import { OpenAIEmbeddings } from 'langchain/dist/embeddings/openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { check } from 'meteor/check';
import { Articles } from '../imports/api/articles/Articles';

const openai = new OpenAI({
  apiKey: Meteor.settings.openaiApiKey,
});

// Constants
const MAX_SESSION = 2;
const MAX_TOKENS_PER_MESSAGE = 400;
/* eslint-disable no-console */
// Initialize Pinecone database
const pinecone = new Pinecone({
  apiKey: Meteor.settings.pineconeApiKey,
  environment: Meteor.settings.pineconeEnvironment,
});
// Initialize OpenAI Embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: Meteor.settings.openaiApiKey,
});
// Initialize Pinecone index
const index = pinecone.index(Meteor.settings.pineconeIndex);

const throwError = (type, message) => {
  console.error(message);
  throw new Meteor.Error(type, message);
};

const createOpenAICompletion = async (messages) => {
  try {
    const filteredMessages = messages.map(({ role, content }) => ({ role, content }));

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: filteredMessages,
      temperature: 0.2,
      max_tokens: MAX_TOKENS_PER_MESSAGE,
    });

    console.log('OpenAI API Response:', response);

    if (response && response.choices && response.choices[0]) {
      return response.choices[0].message.content;
    }
    return throwError('api-error', 'Unexpected OpenAI API response format');

  } catch (error) {
    return throwError('api-error', `Failed to get a response from the chatbot: ${error.message}`);
  }
};
const getEmbeddings = async (messages) => {
  const userMessageEmbedding = await embeddings.embedQuery(messages);
  console.log(`userMessageEmbedding: ${userMessageEmbedding}`);
  // Search Pinecone database for similar articles
  const searchResults = await index.query({
    vector: userMessageEmbedding,
    topK: 3,
    includeMetadata: true,
  });
  // Get context from first search result
  const context = searchResults.matches[0].metadata.content;
  // Get three links from search results
  const file1 = searchResults.matches[0].metadata.fileName.split('.')[0];
  const file2 = searchResults.matches[1].metadata.fileName.split('.')[0];
  const file3 = searchResults.matches[2].metadata.fileName.split('.')[0];
  const link1 = `https://www.hawaii.edu/askus/${file1}`;
  const link2 = `https://www.hawaii.edu/askus/${[file2]}`;
  const link3 = `https://www.hawaii.edu/askus/${file3}`;
  const linkArray = [link1, link2, link3];

  // Get the titles
  const title1 = searchResults.matches[0].metadata.title.split('.')[0];
  const title2 = searchResults.matches[1].metadata.title.split('.')[0];
  const title3 = searchResults.matches[2].metadata.title.split('.')[0];
  const titleArray = [title1, title2, title3];

  // Update useCount of article
  Articles.collection.update({ fileName: searchResults.matches[0].metadata.fileName }, { $inc: { useCount: 1 } });
  console.log(Articles.collection.find({ fileName: searchResults.matches[0].metadata.fileName }).fetch());
  // Return context and linkArray

  console.log(`Context Retrieved: ${context}`);

  return {
    context,
    linkArray,
    titleArray,
  };
};
// Define a global or persistent object to store session data
const userSessions = {};

Meteor.methods({
  async getChatResponse(userId, userMessage) {
    check(userId, String);
    check(userMessage, String);
    const embeddingResults = await getEmbeddings(userMessage);
    const context = embeddingResults.context;
    const linkArray = embeddingResults.linkArray;
    const titleArray = embeddingResults.titleArray;
    // Retrieve or initialize the user's session
    const userSession = userSessions[userId] || {
      messages: [],
    };

    // Ensure the session does not exceed the maximum length
    if (userSession.messages.length > MAX_SESSION) {
      userSession.messages = userSession.messages.slice(-MAX_SESSION);
    }

    const initialContext = [
      { role: 'system', content: 'You are a helpful chatbot that can answer questions based on the following articles provided.' },
      { role: 'system', content: 'You can engage in friendly conversation, but your main purpose is to provide information from our knowledge base.' },
      { role: 'system', content: `Base answers on this context: ${context}` },
      { role: 'assistant', content: 'Hello! How can I assist you today?' },
    ];

    console.log('Session History:', userSession.messages);

    const messages = [
      ...initialContext,
      ...userSession.messages,
      { role: 'user', content: userMessage },
    ];

    const chatResponse = await createOpenAICompletion(messages);

    userSession.messages.push({ role: 'assistant', content: chatResponse });
    userSessions[userId] = userSession; // Update the session
    return {
      chatResponse,
      linkArray,
      titleArray,
    };
  },
});

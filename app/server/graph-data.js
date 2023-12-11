import { Meteor } from 'meteor/meteor';
import { Articles } from '../imports/api/articles/Articles';

Meteor.methods({
  'getGraphData'() {
    // Get the top 6 articles with the most useCount greater than 0
    const articles = Articles.collection.find({ useCount: { $gt: 0 } }, { sort: { useCount: -1 }, limit: 6 }).fetch();
    const articleData = articles.map((article) => article.useCount);
    const articleLabels = articles.map((article) => {
      // Append fileName to form the link
      const link = `https://www.hawaii.edu/askus/${article.fileName.split('.')[0]}`;
      return { label: article.title, link: link, count: article.useCount };
    });
    return {
      articleData: articleData,
      articleLabels: articleLabels,
    };
  },
});

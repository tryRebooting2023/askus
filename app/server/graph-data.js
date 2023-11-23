import { Meteor } from 'meteor/meteor';
import { Articles } from '../imports/api/articles/Articles';

Meteor.methods({
  'getGraphData'() {
    // Get the top 6 articles with the most useCount greater than 0
    const articles = Articles.collection.find({ useCount: { $gt: 0 } }, { sort: { useCount: -1 }, limit: 6 }).fetch();
    // Get useCount and title for each article
    const articleData = articles.map((article) => article.useCount);
    const articleLabels = articles.map((article) => article.title);
    // Return articleData and articleLabels
    return {
      articleData: articleData,
      articleLabels: articleLabels,
    };
  },
});

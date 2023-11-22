import { Meteor } from 'meteor/meteor';
import { Articles } from '../imports/api/articles/Articles';

Meteor.methods({
  'getGraphData'() {
    const articles = Articles.collection.find({ useCount: { $gt: 0 } }).fetch();
    const articleData = articles.map((article) => article.useCount);
    const articleLabels = articles.map((article) => article.title);
    return {
      articleData: articleData,
      articleLabels: articleLabels,
    };
  },
});

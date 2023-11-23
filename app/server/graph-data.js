import { Meteor } from 'meteor/meteor';
import { Articles } from '../imports/api/articles/Articles';

Meteor.methods({
  'getGraphData'() {
    const articles = Articles.collection.find({ useCount: { $gt: 0 } }).fetch();
    const articleData = articles.map((article) => article.useCount);
    const articleLabels = articles.map((article) => {
      // Append fileName to form the link
      const link = `https://www.hawaii.edu/askus/${article.fileName}`;
      return { label: article.title, link: link };
    });
    return {
      articleData: articleData,
      articleLabels: articleLabels,
    };
  },
});

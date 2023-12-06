import { Meteor } from 'meteor/meteor';
import { Articles } from '../../api/articles/Articles';

// Publish the Articles collection for all users.
Meteor.publish('articles', function () {
  // You can simply return the entire collection.
  return Articles.find();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

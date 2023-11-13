import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ArticlesCollection. It encapsulates state and variable values for stuff.
 */
class ArticlesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ArticlesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      fileName: String,
      title: String,
      content: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ArticlesCollection.
 * @type {ArticlesCollection}
 */
export const Articles = new ArticlesCollection();

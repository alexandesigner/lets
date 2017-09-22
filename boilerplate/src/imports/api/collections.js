import { Mongo } from 'meteor/mongo'

export const CollectionName = new Mongo.Collection('collectionName');

const collections = Mongo.Collection.getAll()
console.log(collections)

// collections.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false,
// })

// collections.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true,
// })
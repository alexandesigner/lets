import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const Documents = new Mongo.Collection('documents')

Documents.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
})

Documents.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

export default Documents
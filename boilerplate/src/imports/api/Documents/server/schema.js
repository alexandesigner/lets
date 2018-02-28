import Documents from '../documents'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

Documents.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.'
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue () {
      if (this.isInsert) return (new Date()).toISOString()
    }
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue () {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString()
    }
  },
  title: {
    type: String,
    label: 'The title of the document.'
  },
  body: {
    type: String,
    label: 'The body of the document.'
  }
})

Documents.attachSchema(Documents.schema)

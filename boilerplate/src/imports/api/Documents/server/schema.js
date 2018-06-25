import Documents from '../documents'
import SimpleSchema from 'simpl-schema'

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
  },
  image: {
    optional: true,
    type: Object,
    label: 'The Image of the document.'
  },
  'image.name': {
    type: String,
    label: 'The name of Image of the document.'
  },
  'image.type': {
    type: String,
    label: 'The type of Image of the document.'
  },
  'image.extension': {
    type: String,
    label: 'The extension of Image of the document.'
  },
  'image.path': {
    type: String,
    label: 'The path of Image of the document.'
  },
  'image.imageId': {
    type: String,
    label: 'The ID of the image.'
  }
})

Documents.attachSchema(Documents.schema)

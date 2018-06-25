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
    type: Object,
    label: 'The Image of the document.',
    optional: true
  },
  'image.name': {
    type: String,
    label: 'The name of Image of the document.',
    optional: true
  },
  'image.type': {
    type: String,
    label: 'The type of Image of the document.',
    optional: true
  },
  'image.extension': {
    type: String,
    label: 'The extension of Image of the document.',
    optional: true
  },
  'image.path': {
    type: String,
    label: 'The path of Image of the document.',
    optional: true
  },
  'image.imageId': {
    type: String,
    label: 'The ID of the image.',
    optional: true
  }
})

Documents.attachSchema(Documents.schema)

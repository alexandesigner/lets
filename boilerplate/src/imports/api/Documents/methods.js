import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import rateLimit from '../../utils/rate-limit'
import Documents from './documents'

// Insert Document
export const insertDocument = new ValidatedMethod({
  name: 'Documents.methods.insert',
  validate: new SimpleSchema({
    createdAt: {
      type: Date,
      label: 'The date this document was created.'
    },
    owner: {
      type: String,
      label: 'The ID of the user this document belongs to.'
    },
    title: {
      type: String,
      label: 'The title of the document.'
    },
    subtitle: {
      type: String,
      label: 'The subtitle of the document.'
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
  }).validator(),
  run (doc) {
    try {
      return Documents.insert({ owner: this.userId, ...doc })
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})

// Update document
export const updateDocument = new ValidatedMethod({
  name: 'Documents.methods.update',
  validate: new SimpleSchema({
    _id: { type: String },
    updatedAt: {
      type: Date,
      label: 'The date this document was created.'
    },
    owner: {
      type: String,
      label: 'The ID of the user this document belongs to.'
    },
    title: {
      type: String,
      label: 'The title of the document.'
    },
    subtitle: {
      type: String,
      label: 'The subtitle of the document.'
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
  }).validator(),
  run (doc) {
    try {
      const documentId = doc._id
      return Documents.update(documentId, {
        $set: { ...doc }
      })
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})

// Remove document
export const removeDocument = new ValidatedMethod({
  name: 'Documents.methods.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run (id) {
    try {
      return Documents.remove(id)
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})

rateLimit({
  methods: [
    'Documents.methods.insert',
    'Documents.methods.update',
    'Documents.methods.remove'
  ],
  limit: 5,
  timeRange: 1000
})

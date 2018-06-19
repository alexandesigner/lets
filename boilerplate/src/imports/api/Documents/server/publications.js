import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Documents from '../documents'

Meteor.publish('documents', function () {
  return Documents.find({})
})

Meteor.publish('documents.owner', function () {
  return Documents.find({ owner: this.userId })
})

Meteor.publish('documents.view', function documentsView (documentId) {
  check(documentId, String)
  return Documents.find({_id: documentId, owner: this.userId})
})

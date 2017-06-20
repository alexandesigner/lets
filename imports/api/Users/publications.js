import { Meteor } from 'meteor/meteor'
import { UsersCollection } from './users'

Meteor.publish('usersPublish', () => {
  return UsersCollection.find({})
})

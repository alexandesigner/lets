import { Meteor } from 'meteor/meteor'

export const UsersCollection = Meteor.users

UsersCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
})

UsersCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
})

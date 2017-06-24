import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

// Extend profile object field in Meteor Users
export const ProfileSchema = new SimpleSchema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String }
})

// Remove User
export const removeUser = new ValidatedMethod({
  name: 'Users.methods.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run(id) {
    try {
      Meteor.users.remove(id)
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})

// Update User
export const updateUser = new ValidatedMethod({
  name: 'Users.methods.update',
  validate: new SimpleSchema({
    _id: { type: String },
    updatedAt: { type: Date, optional: true },
    emails: { type: Array },
      'emails.$': { type: Object },
      'emails.$.address': { type: String, regEx: SimpleSchema.RegEx.Email },
      'emails.$.verified': { type: Boolean },
    profile: { type: ProfileSchema, optional: true },
    services: { type: Object, optional: true, blackbox: true },
    roles: { type: Array, optional: true, blackbox: true },
      'roles.$': { type: String }
  }).validator(),
  run(user) {
    try {
      Meteor.users.update(user._id, {
        $set: {
          updatedAt: new Date(),
          password: user.services.password,
          emails: [{
            address: user.emails[0].address,
            verified: user.emails[0].verified
          }],
          profile: {
            firstName: user.profile.firstName,
    				lastName: user.profile.lastName,
    				phone: user.profile.phone
          },
          roles: user.roles
        }
      })
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})

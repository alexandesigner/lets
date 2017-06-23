import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

// Extend profile object field in Meteor Users
export const ProfileSchema = new SimpleSchema({
  firstName: { type: String, },
  lastName: { type: String, },
  phone: { type: String, }
})

// Remove User
export const removeUser = new ValidatedMethod({
  name: 'User.method.remove',
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
  name: 'User.method.update',
  validate: new SimpleSchema({
    _id: { type: String },
    createdAt: { type: Date, optional: true, },
    emails: { type: Array, optional: true, },
      'emails.$': { type: Object, },
      'emails.$.address': { type: String, regEx: SimpleSchema.RegEx.Email, },
      'emails.$.verified': { type: Boolean, },
    password: { type: String },
    profile: { type: ProfileSchema, optional: true, },
    services: { type: Object, optional: true, blackbox: true, },
    roles: { type: Object, optional: true, blackbox: true, },
    locations: { type: Array, optional: true, },
      'locations.$': { type: Object, },
      'locations.$.street': { type: String },
      'locations.$.number': { type: String, },
      'locations.$.complement': { type: String, },
      'locations.$.neighborhood': { type: String, },
      'locations.$.city': { type: String, },
      'locations.$.state': { type: String, },
      'locations.$.reference': { type: String, }
  }).validator(),
  run(user) {
    try {
      Meteor.users.update(user._id, {
        $set: {
          updatedAt: new Date(),
          password: user.services.password,
          emails: [{
            address: user.emails.address,
            verified: user.emails.verified
          }],
          profile: {
            firstName: user.profile.firstName,
    				lastName: user.profile.lastName,
    				phone: user.profile.phone
          },
          roles: user.roles,
          locations: [{
            address: {
              street: values.street,
              number: values.number,
              complement: values.complement,
              city: values.city,
              state: values.state
            }
          }]
        }
      })
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})

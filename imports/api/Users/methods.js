import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

import { UsersCollection } from './users'

// Extend profile object field in UsersCollection
export const ProfileSchema = new SimpleSchema({
  firstName: { type: String, },
  lastName: { type: String, },
  phone: { type: String, },
  cpf: { type: String, optional: true, },
  cnpj: { type: String, optional: true, }
})

// Insert User
export const insertUsers = new ValidatedMethod({
  name: 'Users.methods.insert',
  validate: new SimpleSchema({
    createdAt: { type: Date, optional: true, },
    emails: { type: Array, optional: true, },
      'emails.$': { type: Object, },
      'emails.$.address': { type: String, regEx: SimpleSchema.RegEx.Email, },
      'emails.$.verified': { type: Boolean, },
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
      return UsersCollection.insert(user)
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})

// Remove User
export const removeUser = new ValidatedMethod({
  name: 'User.method.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run(id) {
    try {
      UsersCollection.remove(id)
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
      UsersCollection.update(user._id, {
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
    				phone: user.profile.phone,
    				cpf: user.profile.cpf,
    				cnpj: user.profile.cnpj
          },
          locations: [{
            address: {
              street: values.street,
              number: values.number,
              complement: values.complement,
              city: values.city,
              state: values.state,
            }
          }]
        }
      })
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})

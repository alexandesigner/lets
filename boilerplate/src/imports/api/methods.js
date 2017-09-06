import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Collections
import { 
  Events, 
  Coverages, 
  Messages 
} from './collections'

Meteor.methods({

  // Events
  ['events.add'] (args) {
    new SimpleSchema({
      name: { type: String },
    }).validate(args)

    const { name } = args

    Events.insert({
      name,
      created: new Date(),
    })
  },

  ['events.remove'] (args) {
    new SimpleSchema({
      _id:  { type: String },
    }).validate(args)

    const { _id } = args

    Events.remove(_id)
  },

  // Coverages
  ['coverages.add'] (args) {
    new SimpleSchema({
      name: { type: String },
    }).validate(args)

    const { name } = args

    Coverages.insert({
      name,
      created: new Date(),
    })
  },
  
  ['coverages.remove'] (args) {
    new SimpleSchema({
      _id:  { type: String },
    }).validate(args)

    const { _id } = args

    Coverages.remove(_id)
  },

  // Messages
  ['messages.add'] (args) {
    new SimpleSchema({
      text: { type: String },
    }).validate(args)

    const { name } = args

    Messages.insert({
      name,
      created: new Date(),
    })
  },

  ['messages.remove'] (args) {
    new SimpleSchema({
      _id:  { type: String },
    }).validate(args)

    const { _id } = args

    Messages.remove(_id)
  },

})

import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

// Collections
import { 
  CollectionName,
} from './collections'

Meteor.methods({

  // CollectionName
  ['collectionName.add'] (args) {
    new SimpleSchema({
      name: { type: String },
    }).validate(args)

    const { name } = args

    CollectionName.insert({
      name,
      created: new Date(),
    })
  },

  ['collectionName.remove'] (args) {
    new SimpleSchema({
      _id:  { type: String },
    }).validate(args)

    const { _id } = args

    CollectionName.remove(_id)
  }
  
})

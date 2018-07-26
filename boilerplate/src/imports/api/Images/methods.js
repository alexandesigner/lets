import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import Images from './images'

// Remove Image
export const removeImage = new ValidatedMethod({
  name: 'Images.methods.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run (id) {
    try {
      return Images.remove(id)
    } catch (exception) {
      throw new Meteor.Error('500', exception.message)
    }
  }
})
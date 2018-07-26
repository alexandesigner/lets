import { Meteor } from 'meteor/meteor'
import Images from '../images'

Meteor.publish('files.images.all', function () {
  return Images.find().cursor
})

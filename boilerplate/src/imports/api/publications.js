import { Meteor } from 'meteor/meteor'

// Collections
import { 
  Events, 
  Coverages, 
  Messages 
} from './collections'

// Events
Meteor.publish('events', function (limit) {
  return Events.find({}, {
    sort: { created: -1 }
  })
})

// Coverages
Meteor.publish('coverages', function () {
  return Coverages.find({}, {
    sort: { created: -1 }
  })
})

// Messages
Meteor.publish('messages', function () {
  return Messages.find({}, {
    sort: { created: -1 }
  })
})
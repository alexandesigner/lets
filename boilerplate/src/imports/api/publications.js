import { Meteor } from 'meteor/meteor'

// Collections
import { 
  CollectionName
} from './collections'

// Collection Name
Meteor.publish('collectionName', function () {
  return CollectionName.find({}, {
    sort: { created: -1 }
  })
})
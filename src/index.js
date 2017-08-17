import './imports/api/methods'

if (Meteor.isClient) {
  import './client'
} else if (Meteor.isServer) {
  import './server'
}

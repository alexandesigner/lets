import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

export default () => {
  return new Promise((resolve, reject) => {
    Tracker.autorun((c) => {
      // stop computation when Meteor.user() is ready
      Meteor.user() !== undefined && c.stop()
      // return false if user is a guest
      Meteor.user() === null && resolve(false)
      // return true if user is logged in
      Meteor.user() && resolve(true)
    })
  })
}

/*
  
  Usage in vue router
  
  beforeEnter: (to, from, next) => {
    isUser().then(response => {
      // if true, continue, else redirect to Login page
      response ? next() : next({name: 'login'})
    })
  }

*/

// https://forums.meteor.com/t/vue-meteor-accounts/32695/19

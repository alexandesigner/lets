import { Meteor } from 'meteor/meteor'

// Basic User
const isBasicAuth = (to, from, next) => {
  if (!Meteor.userId()) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
}

export {
  isBasicAuth
}

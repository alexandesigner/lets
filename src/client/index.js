import 'intersection-observer'

import { Meteor } from 'meteor/meteor'
import CreateApp from '../imports/app'

Meteor.startup(() => {
  CreateApp({
    ssr: false
  })
})

import base from './base'
import { Events } from '../api/collections'

export default {
  extends: base,

  data () {
    return {
      events: [],
    }
  },

  meteor: {
    $subscribe: {
      'events': [],
    },

    events () {
      return Events.find({})
    },
  },
}

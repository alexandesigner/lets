import base from './base'
import { Documents } from '../api/collections'

export default {
  extends: base,

  data () {
    return {
      documents: [],
    }
  },

  meteor: {
    $subscribe: {
      'documents': [],
    },

    documents () {
      return Documents.find({})
    },
  },
}

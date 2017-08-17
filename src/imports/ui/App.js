import { mapGetters } from 'vuex'
import Cart from './Cart.vue'

export default {
  components: {
    Cart
  },

  computed: {
    ...mapGetters('layout', [
      'showCart'
    ]),
  },
}

import 'isomorphic-fetch'

import './plugins'
import './supply'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import { injectSupply } from 'vue-supply'
import App from './ui/App.vue'
import routes from './routes'
import storeOptions from './store'
import ElementUI from 'element-ui'

function createApp (context) {
  const router = new VueRouter({
    mode: 'history',
    routes
  })

  const supplyCache = {}
  const suppliedStoreOptions = injectSupply(storeOptions, supplyCache)
  const store = new Vuex.Store(suppliedStoreOptions)

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  return {
    app: new Vue({
      el: '#app',
      router,
      store,
      supplyCache,
      ...App,
    }),
    router,
    store
  }
}

export default createApp
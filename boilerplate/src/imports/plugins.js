import Vue from 'vue'

// Vue Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// Meteor Tracker integration
import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueMeteorTracker)
Vue.config.meteor.freeze = true

import VueSupply from 'vue-supply'
Vue.use(VueSupply)

// Filters
import * as filters from './filters'
for (const key in filters) {
  Vue.filter(key, filters[key])
}

// Element UI
import ElementUI from 'element-ui'
Vue.use(ElementUI)

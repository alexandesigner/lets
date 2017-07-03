// Libs
import {Meteor} from 'meteor/meteor'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routerFactory from '/imports/routes';
import '/imports/ui/stylesheets/main'
import ElementUI from 'element-ui'

// App layout
import AppLayout from '/imports/ui/layout/App'

// Data moment.js
const moment = require('moment')
Vue.use(require('vue-moment'), {moment})

// App start
Meteor.startup(() => {
	// Start Worker (WIP)
  navigator.serviceWorker.register('/sw.js').then().catch(error => console.log(error))
  const router = routerFactory.create()
  new Vue({
    router,
    render: h => h(AppLayout),
  }).$mount('app')
})
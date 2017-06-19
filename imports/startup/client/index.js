// Libs
import {Meteor} from 'meteor/meteor'
import Vue from 'vue'
import routerFactory from '../../routes'

import '../../ui/stylesheets/main.styl'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// App layout
import AppLayout from '../../ui/layout/AppLayout.vue'

// App start
Meteor.startup(() => {
	// Start Worker
  navigator.serviceWorker.register('/sw.js').then().catch(error => console.log(error));
  // Start the router
  const router = routerFactory.create()
  new Vue({
    router,
    render: h => h(AppLayout),
  }).$mount('app')
})

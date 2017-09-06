import './api/publications'
import './startup/server'

import { VueSSR } from 'meteor/akryum:vue-ssr'
import CreateApp from './app'

// Simple createApp
VueSSR.createApp = function (context) {
  const { app, router, store } = CreateApp({
    ssr: true,
  })

  // set router's location
  router.push(context.url)

  return app
}


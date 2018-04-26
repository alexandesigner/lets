<p align="center"><a href="https://alexandesigner.github.io/lets" target="_blank"><img src="https://github.com/alexandesigner/lets/blob/master/arts/icon.png"height="285" /></a></p>

> Here you will find details for using this repository in the your projects

<details>
  <summary>Table of Contents</summary>

<!-- toc -->

- [Quick Start](#quick-start)
  * [Build Setup](#build-setup)
  * [Command Utils](#command-utils)
  * [Deployment](#deployment)
- [Application Structure](#application-structure)

<!-- tocstop -->

</details>

# Quick Start
How to start this project?

> Go to /boilerplate path and run this make command

## Build Setup

``` bash
# install dependencies
$ make install
```

## Command utils

``` bash
# Serve with hot reload at localhost port 3000
$ make dev

# Update meteor version and all packages
$ make update

# Running in --production flag, after configure .deploy/settings-production.json file
$ make production

# Reset database
$ make reset

# Reset database and Running server
$ make rebuild

# Setup deploy in your server
$ make setup-deploy

# Command to deployment see section Deployment
$ make deploy

# This project uses the Element UI library so you need to take a look at the (element-variables.css)[https://github.com/alexandesigner/lets/blob/master/boilerplate/src/element-variables.css] variables and change them according to the color palette of your project
$ make generate-styles
```

## Deployment

Configure the basics of dns and hosting .. then there is a basic [nginx configuration file](https://github.com/alexandesigner/base-server-config/blob/master/nginx.conf), use it with your domain settings. 

[Install this package](https://github.com/trimurtix/meteor-up-legacy)

``` bash

# Installing package fork mup branch using mupx
$ npm install -g trimurtix-mupx

# Setup deploy
$ make setup-deploy

# Deploy to production
$ make deploy

```

# Application Structure
The directory structure is built in a way to make things predictable and enforce code modularity and organization per feature/domain. The structure looks like this:

```
|_package.json
|public/                               <-- assets files
|resources/                            <-- icons/splashes to mobile-config
|settings/                             <-- settings files to populate Meteor.settings
|  |_settings-development.json
|  |_settings-production.json
|_src/
  |_client/                            <-- client entry point
  |_server/                            <-- server entry point
  |_imports/
  |  |_api/                            <-- data api server for application
  |  |_store/                          <-- uses vuex store
  |  |_supply/                         <-- resources that can automatically be activated and deactivated when used
  |  |_startup/                        <-- startup code for application
  |  |   |_server/                     <-- server startup code
  |  |_modules/                        <-- application modules go here 
  |  |_ui/                             <-- ui code for application
  |  |  |_App.html                     <-- main Route inject templates
  |  |  |_App.js                       <-- just script file to main template
  |  |  |_App.vue                      <-- inject SSR in templates
  |  |  |_components/                  <-- all components for application
  |  |  |_layouts/                     <-- layouts for application go here
  |  |  |_pages/                       <-- all pages for application
  |  |  |_style/                       <-- main ui styles use _stylus_
  |  |_filters.js                      <-- filters for application
  |  |_plugins.js                      <-- all plugins import for the application
  |  |_routes.js                       <-- routing use Vue Router for the application
  |_theme/                             <-- themify use Element UI library
  |_element-variables.scss             <-- element UI config variables
  |_index.html                         <-- start markup application
  |_index.js                           <-- import client/server for application
```
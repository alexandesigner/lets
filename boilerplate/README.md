<a href="https://alexandesigner.github.io/lets" target="_blank"><img src="https://github.com/alexandesigner/lets/blob/master/arts/icon.png" height="120" /></a>

In this project we are using a ui layer [Vue with Meteor](https://github.com/Akryum/vue-meteor) and Build data in the [Meteor with MongoDB](https://www.meteor.com/)

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

## Documentantion

[Read the Documentation](https://github.com/alexandesigner/lets/tree/master/docs)

## Contributors

Check the [issues](https://github.com/alexandesigner/lets/issues) that are open and if you have a new idea open an issue, you will be welcome to discuss an improvement, bug or critical

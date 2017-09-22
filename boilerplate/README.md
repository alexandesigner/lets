<a href="https://alexandesigner.github.io/lets" target="_blank"><img src="https://github.com/alexandesigner/lets/blob/master/arts/icon.png" height="120" /></a>

In this project we are using a ui layer [Vue with Meteor](https://github.com/Akryum/vue-meteor) and Build data in the [Meteor with MongoDB](https://www.meteor.com/)

## Build Setup

``` bash
# install dependencies
$ make install
```

## Running 

``` bash
# Now.. serve with hot reload at localhost:4000
$ make dev

# Running in --production flag, after configure .deploy/settings-production.json file
$ make production

# Reset database
$ make reset

# lint code
$ make lint
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

[Read the Documentation](https://lets.alexandesigner.com.br/docs)

## Versioning

To keep better organization of releases we follow the [Semantic Versioning 2.0.0](http://semver.org/) guidelines.

## Contributors

Check the [issues](https://github.com/alexandesigner/lets/issues) that are open and if you have a new idea open an issue, you will be welcome to discuss an improvement, bug or critical

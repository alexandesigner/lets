import { Mongo } from 'meteor/mongo'

export const Events = new Mongo.Collection('events')
export const Coverages = new Mongo.Collection('coverages')
export const Messages = new Mongo.Collection('messages')

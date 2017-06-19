<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <h3>{{ subtitle }}</h3>
    <slot name="page"></slot>
  </div>
</template>

<script>
import { ReactiveVar } from 'meteor/reactive-var'
import { Meteor } from 'meteor/meteor'

const pageContent = new ReactiveVar('')

export default {
  name: 'static-page',
  props: ['title', 'subtitle', 'content'],
  data () {
    return {
      page: null
    }
  },
  mounted () {
    console.log(this.$scopedSlots)
  },
  created () {
    console.log(pageContent.get())
  }
}
</script>

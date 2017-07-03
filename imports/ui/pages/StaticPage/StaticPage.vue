<template>
  <div class="page">
    <h1>{{ title }}</h1>
    <h3>{{ subtitle }}</h3>
    <slot name="page"></slot>
    <textarea :value="input" @blur="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import { ReactiveVar } from 'meteor/reactive-var'
import { Meteor } from 'meteor/meteor'
import marked from 'marked'

const pageContent = new ReactiveVar('')

export default {
  name: 'static-page',
  props: ['title', 'subtitle', 'content'],
  data () {
    return {
      page: null,
      input: '# hello'
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300),
  },
  mounted () {
    console.log(this.$scopedSlots)
  },
  created () {
    console.log(pageContent.get())
  },
  computed: {
    compiledMarkdown () {
      return marked(this.input, { sanitize: true })
    }
  }
}
</script>

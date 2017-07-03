<template>
  <div class="not-found">
    <div class="not-found_hero">
      Not Found
    </div>
    <div>
      This is not the page you are looking for. <router-link :to="{name:'index'}">Return Index</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'not-found'
  }
</script>

<style lang="stylus" scoped>
.not-found
  margin-top 84px
  text-align center
  &_hero
    font-size 2.5em
    color #666
    margin 12px
</style>

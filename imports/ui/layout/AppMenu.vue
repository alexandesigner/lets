<template>
  <div class="app-menu">
    <router-link :to="{ name:'index' }" exact>Index</router-link>
    <router-link :to="{ name:'about' }">About</router-link>
    <router-link :to="{ name:'terms' }">Terms</router-link>
  </div>
</template>

<script>
  export default {
    name: 'AppMenu'
  }
</script>

<style lang="stylus" scoped>
.app-menu
  margin 32px 0
  text-align center

.app-menu a
  display inline-block
  padding 6px
  margin 0 6px
  border-radius 3px

.app-menu a.v-link-active
  background #674CD8
  color white
</style>

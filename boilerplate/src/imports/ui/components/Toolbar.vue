<template>
  <header class="app-toolbar">
    <back-button v-if="isBack"></back-button>
    <h1 class="logo">
      <router-link to="/">
        <img src="/images/logo.svg" height="62" alt="Lets" />
      </router-link>
    </h1>
  </header>
</template>

<script>
import BackButton from './BackButton/BackButton'
export default {
  name: 'app-toolbar',
  props: [
    'is-back'
  ],
  components: {
    BackButton
  }
}
</script>

<style lang="stylus">
.app-toolbar
  display flex
  justify-content center
  height 72px
  align-items center
  background #fff
  margin-bottom 20px
  .back-button
    margin 8px
</style>
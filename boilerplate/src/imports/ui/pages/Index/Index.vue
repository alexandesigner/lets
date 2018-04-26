<template>
  <div class="app-index">
    <div class="menu">
      <router-link to="/">Home</router-link>/
      <router-link to="/documents">Documents</router-link>/
      <router-link to="/admin">Admin</router-link>
    </div>
    <img src="/images/brand.png" widht="600" />
    <a href="https://github.com/alexandesigner/lets"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" target="_blank"></a>
  </div>
</template>

<script>
  export default {
  	name: 'index'
  }
</script>

<style lang="stylus" scoped>
.app-index
  display flex
  align-items center
  justify-content center
  height 100%
  img
    margin 0 auto
  .menu
    position absolute
    left 50%
    transform translateX(-50%)
    top 40px
    display flex
    align-items center
    font-size 20px
    color #999
    a
      margin 0 10px
      font-size 20px
</style>

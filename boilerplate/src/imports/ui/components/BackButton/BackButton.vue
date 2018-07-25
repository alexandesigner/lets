<template>
  <button
    v-if="canGoBack"
    @click="goBack"
    class="button-back">
    <i class="el-icon-back"></i>
  </button>
</template>

<script>
export default {
  methods: {
    canGoBack () {
      window.history.length > 1
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.button-back
  position absolute
  z-index 2
  top 12px
  left 0
  border 0
  background transparent
  border-radius 50%
  cursor pointer
  i 
    font-size 30px
    color #606266
.mobile
  .button-back
    top 14px
</style>

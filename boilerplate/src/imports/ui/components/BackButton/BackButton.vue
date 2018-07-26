<template>
  <button
    v-if="canGoBack"
    @click="goBack"
    class="back-button">
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
@import '../../../startup/client/styles/base/custom-properties.styl'
.back-button
  position absolute
  z-index 2
  top 12px
  left 0
  border 0
  background transparent
  border-radius 50%
  cursor pointer
  transition var(--all-transition)
  &:hover
    left -2px
  &:active
    left -4px
  i 
    font-size 30px
.mobile
  .button-back
    top 14px
</style>

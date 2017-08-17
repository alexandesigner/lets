<template>
  <button
    v-if="canGoBack"
    @click="goBack"
    class="button-back">
    <svg class="icon">
      <use xlink:href="#arrow-left-alt" />
    </svg>
  </button>
</template>

<script>
export default {
  data: () => ({
    canGoBack: window.history.length > 1
  }),
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style scoped lang="stylus">
.button-back
  position absolute
  z-index 2
  top 16px
  left 0
  border 0
  background transparent
  border-radius 50%
  cursor pointer
.icon
  width 32px
  height 32px
.mobile
  .button-back
    top 14px
  .icon
    width 26px
    height 26px
</style>

<template>
  <div class="app-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import AppMenu from '/imports/ui/layout/AppMenu.vue'
import AppSidebar from '/imports/ui/layout/AppSidebar.vue'

export default {
  name: 'App',
  components: {
    AppMenu,
    AppSidebar
  }
}
</script>

<style lang="stylus" scoped>
	.app-layout
		height 100%
</style>
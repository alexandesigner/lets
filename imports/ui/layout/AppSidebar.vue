<template>
	<aside class="app-sidebar">
	  <div class="sidebar-content">
	    Sidebar 🔥
	  </div>
	</aside>
</template>

<script>
	export default {
		name: 'AppSidebar'
	}
</script>

<style lang="stylus" scoped>
.app-sidebar
  position fixed
  left 0
  width 320px
  height 100%
  box-shadow 0 0 95px 0px rgba(0,0,0,.08)
  .sidebar-content
    padding 20px
</style>
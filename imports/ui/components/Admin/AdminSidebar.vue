<template>
	<aside class="admin-sidebar">
	  <div class="sidebar-content">
	    Sidebar 🔥
	  </div>
	</aside>
</template>

<script>
	export default {
		name: 'AdminSidebar'
	}
</script>

<style lang="stylus" scoped>
.admin-sidebar
  position fixed
  left 0
  width 320px
  height 100%
  box-shadow 0 0 95px 0px rgba(0,0,0,.08)
  .sidebar-content
    padding 20px
</style>
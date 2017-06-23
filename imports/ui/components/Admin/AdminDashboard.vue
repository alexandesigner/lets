<template>
	<div class="admin-dashboard">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'AdminDashboard'
	}
</script>

<style lang="stylus" scoped>
.admin-dashboard
  padding-left 340px
  &_content
    padding 20px
</style>
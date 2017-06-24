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

<style lang="stylus">
.admin-dashboard
  padding-left 300px
  position relative
  .is-back-button
    padding-left 60px
  &_content
    padding 20px
  &_content-header
    position relative
    align-items center
    justify-content space-between 
    display flex
  	h2
      font-size 42px
      padding 0 0 15px 0
      text-align left
      font-weight 300
      letter-spacing -0.05em
      small
        font-size 16px
        font-weight 400
        letter-spacing -0.03em
        color #999
</style>
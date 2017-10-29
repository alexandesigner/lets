<template>
	<div class="admin-content">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'admin-content'
	}
</script>

<style lang="stylus">
.admin-content
  padding-left 220px
  position relative
  .is-back-button
    padding-left 60px
  &_main
    display flex
    justify-content center
    flex-direction column
    padding 20px 20px 0 20px
    &-form
      .el-col
        margin-bottom 10px
  &_main-header
    position relative
    align-items center
    justify-content space-between 
    display flex
    padding 10px 0
    .el-button
      &:hover
        .icon
          fill var(--color-primary)
      > span
        display flex
        justify-content center
        align-items center
      .icon
        margin-right 5px
      span
        font-weight 500
        font-size 14px
  	.title
      font-size 42px
      padding 0
      text-align left
      font-weight 400
      letter-spacing -0.05em
      small
        font-size 16px
        font-weight 400
        letter-spacing -0.03em
        color #999
</style>
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
@import '../../../startup/client/styles/base/custom-properties'
.admin-content
  padding-left 220px
  position relative
  .is-back-button
    padding-left 60px
  &_main
    display flex
    justify-content center
    flex-direction column
    padding 0
    &-table
      border-radius 4px
      img
        box-shadow 0 0 6px 0px rgba(0, 0, 0, 0.25)
        border-radius 3px
        margin 3px
    &-form
      .el-col
        margin-bottom 10px
  &_main-header
    position relative
    align-items center
    justify-content space-between 
    display flex
    margin-bottom 20px
    padding 30px
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
      margin-top 0
      small
        font-size 16px
        font-weight 400
        letter-spacing -0.03em
        color #999
</style>
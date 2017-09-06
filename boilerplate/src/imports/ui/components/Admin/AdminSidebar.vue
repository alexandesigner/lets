<template>
	<aside class="admin-sidebar">
	  <div class="sidebar-content">
	    <header class="sidebar-content_header">
	    	<router-link class="logo" :to="{name: 'admin-dashboard'}" exact>
	    		<img src="/images/logo.svg" width="60" height="60" alt="" />
	    	</router-link>
	    </header>
	    <div class="sidebar-content_nav">
    		<router-link class="nav-item" :to="{name: 'admin-dashboard'}" exact>
	    		Dashboard
	    		<svg class="icon">
            <use xlink:href="#arrow-right" />
          </svg>
	    	</router-link>
	    	<router-link class="nav-item" :to="{name: 'admin-users'}">
	    		Users
	    		<svg class="icon">
            <use xlink:href="#arrow-right" />
          </svg>
	    	</router-link>
	    	<router-link class="nav-item" :to="{name: 'admin-documents'}">
	    		Documents
	    		<svg class="icon">
            <use xlink:href="#arrow-right" />
          </svg>
	    	</router-link>
	    	<div class="nav-logout" @click="logout">
	    		Logout
	    		<svg class="icon">
            <use xlink:href="#arrow-right" />
          </svg>
	    	</div>
	    </div>
	  </div>
	</aside>
</template>

<script>
	export default {
		name: 'AdminSidebar',
		methods: {
			logout () {
        Meteor.logout()
        this.$router.push({ name: 'login' })
			}
		}
	}
</script>

<style lang="stylus" scoped>
.admin-sidebar
  position fixed
  left 0
  width 220px
  height 100%
  background #fff
  box-shadow 0 0 95px 0px rgba(0,0,0,.08)
  .sidebar-content
  	height 100%
  .sidebar-content
    &_header
    	display flex
    	justify-content space-between
    	align-items center
    	padding 20px
    	position relative
    	.logo
    		float left
    	.actions
    		float right
    		.config, .notifications
    			cursor pointer
    			margin 0 2px
		  			.icon
		  				fill var(--icon-color)
		  				width 24px
		  				height 24px
		  				cursor pointer
		  				transition var(--all-transition)
		  				&:hover
		  					fill var(--color-primary)	
    &_nav
    	display flex
    	margin-bottom 20px
    	flex-direction column
		.nav-item, .nav-logout
			position relative
			line-height 32px
			text-align left
			font-size 16px
			padding 5px 20px
			cursor pointer
			transition var(--all-transition)
			&:hover
				color var(--color-primary)
				.icon
					opacity 1
			.icon
				width 16px
				height 16px
				position absolute
				right 12px
				top 10px
				opacity 0
				fill var(--color-primary)
				transition var(--fade-transition)
		.router-link-exact-active
			color var(--color-primary)
			.icon
				opacity 1
		.nav-logout
    	position absolute
    	bottom 0
    	left 0
    	right 0
</style>
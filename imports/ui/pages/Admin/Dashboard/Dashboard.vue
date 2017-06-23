<template>
  <admin-dashboard>
    <admin-sidebar></admin-sidebar>
    <div class="admin-dashboard_content">
      Dashboard Conteúdo 🚀
    </div>
  </admin-dashboard>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar'
  import AdminDashboard from '../../../components/Admin/AdminDashboard'
  export default {
  	name: 'Dashboard',
    components: {
      AdminSidebar,
      AdminDashboard
    }
  }
</script>

<style lang="stylus" scoped>
.admin-dashboard
  padding-left 340px
  &_content
    padding 20px
</style>

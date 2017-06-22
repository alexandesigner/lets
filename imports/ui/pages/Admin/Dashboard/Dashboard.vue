<template>
  <div class="admin-dashboard">
    <admin-sidebar></admin-sidebar>
    <div class="admin-dashboard_content">
      Dashboard Conteúdo 🚀
      <el-button @click="logout">Logout</el-button>
    </div>
  </div>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar'
  export default {
  	name: 'Dashboard',
    methods: {
      logout() {
        Meteor.logout();
        this.$router.push({ name: 'login' });
      }
    },
    components: {
      AdminSidebar
    }
  }
</script>

<style lang="stylus" scoped>
.admin-dashboard
  padding-left 340px
  &_content
    padding 20px
</style>

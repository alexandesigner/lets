<template>
  <div class="admin-dashboard documents-new">
    <admin-sidebar></admin-sidebar>
    <div class="admin-dashboard_content">
      Documents New
    </div>
  </div>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue';
  export default {
  	name: 'DocumentsNew',
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

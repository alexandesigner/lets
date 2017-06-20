<template>
  <div class="admin-dashboard documents-edit">
    <admin-sidebar></admin-sidebar>
    <div class="admin-dashboard_content">
      Documents Edit
    </div>
  </div>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue';
  export default {
  	name: 'DocumentsEdit',
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

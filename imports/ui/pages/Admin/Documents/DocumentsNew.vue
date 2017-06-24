<template>
  <admin-dashboard>
    <admin-sidebar></admin-sidebar>
    <div class="admin-dashboard_content">
      Documents New
    </div>
  </admin-dashboard>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar.vue';
  import AdminDashboard from '../../../components/Admin/AdminDashboard.vue';
  export default {
    name: 'DocumentsNew',
    components: {
      AdminSidebar,
      AdminDashboard
    }
  }
</script>

<template>
  <admin-content>
    <admin-sidebar></admin-sidebar>
    <div class="admin-content_main">
      Dashboard Content 🚀
    </div>
  </admin-content>
</template>

<script>
  import AdminSidebar from '../../../components/Admin/AdminSidebar'
  import AdminContent from '../../../components/Admin/AdminContent'
  export default {
  	name: 'admin-dashboard',
    components: {
      AdminSidebar,
      AdminContent
    }
  }
</script>

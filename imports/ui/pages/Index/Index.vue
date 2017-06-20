<template>
  <div class="app-index">
    <app-sidebar></app-sidebar>
    <div class="app-index_content">
      Index Conteúdo 🚀
    </div>
  </div>
</template>

<script>
  import AppSidebar from '../../layout/AppSidebar.vue';
  export default {
  	name: 'Index',
    components: {
      AppSidebar
    }
  }
</script>

<style lang="stylus" scoped>
.app-index
  padding-left 340px
  &_content
    padding 20px
</style>

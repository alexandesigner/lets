<template>
  <div class="app-layout">
    <app-menu></app-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import AppMenu from '/imports/ui/layout/AppMenu.vue'

export default {
  name: 'App',
  components: {
    AppMenu
  }
}
</script>

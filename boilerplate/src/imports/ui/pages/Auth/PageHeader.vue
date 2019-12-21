<template>
  <header class="auth-layout_card-header">
    <router-link to="/">
      <img class="logo" src="/images/logo.svg" width="60" height="60" alt="Logo" />
    </router-link>
    <h2>{{ title }}</h2>
  </header>
</template>

<script>
export default {
  name: 'auth-page-header',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>

</style>
<template>
  <div class="page-content">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['content'],
    data: () => ({})
  }
</script>

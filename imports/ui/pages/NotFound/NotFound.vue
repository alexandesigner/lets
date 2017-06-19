<template>
<div class="not-found">
  <div class="hero">
    Not Found
  </div>
  <div>
    This is not the page you are looking for. <router-link :to="{name:'index'}">Return Index</router-link>
  </div>
</div>
</template>

<style scoped>
.not-found {
  margin-top: 84px;
  text-align: center;
}
.not-found .hero {
  font-size: 2.5em;
  color: #666;
  margin: 12px;
}
</style>

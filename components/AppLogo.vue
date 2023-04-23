<template>
  <router-link to="/" exact>
    <img class="logo-img" src="/emporix-logo-white.svg" alt="Emporix logo">
  </router-link>
</template>

<script>
export default {
  name: 'Applogo'
}
</script>

<style lang="scss" scoped>
.logo-img {
  height: 24px;
  cursor: pointer;
  width: inherit;
  display: block;
}
</style>

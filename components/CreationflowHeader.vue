<template>
  <header class="header">
    <NuxtLink to="/">
      <img
        alt="emporix logo"
        class="logo"
        src="/emporix-logo-white.svg"
      >
    </NuxtLink>
  </header>
</template>

<script>
export default {
  name: 'CreationflowHeader'
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: $brand-navy-800;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  padding: 0 32px;

  .logo {
    height: 24px;
  }
}
</style>

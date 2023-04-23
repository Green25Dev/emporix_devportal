<template>
  <div class="action-toolbar">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ActionToolbar'
}
</script>

<style lang="scss" scoped>
.action-toolbar {
  border-top: 1px solid black;
  width: 100%;
  padding: 24px 0;
  background-color: white;
}
</style>

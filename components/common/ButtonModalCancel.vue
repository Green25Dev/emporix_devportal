<template>
  <button class="cancel-btn">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonModalCancel'
}
</script>

<style lang="scss" scoped>
.cancel-btn {
  cursor: pointer;
  text-transform: uppercase;
  color: $brand-grey-400;
  font-weight: 900;
  letter-spacing: 1.75px;

  &:hover {
    color: $brand-grey-600;
  }
}
</style>

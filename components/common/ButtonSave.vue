<template>
  <button class="btn" :disabled="disabled">
    <slot />
  </button>
</template>

<script>

export default {
  name: 'ButtonSave',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  border: 2px solid $brand-blue-500;
  background: $brand-blue-500;
  color: white;
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  padding: 6px 16px;
  transition: background-color .2s, color .2s, border-color .2s;
  &:hover {
    background: black;
    border-color: black;
  }
  &:disabled {
    border-color: $brand-grey-200;
    background-color: white;
    color: $brand-grey-200;
  }
}
</style>

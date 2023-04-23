<template>
  <button class="btn" :class="theme" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: 'ButtonTertiary',
  props: {
    theme: {
      type: String,
      default: 'light'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.light {
  color: white;
}
.btn {
  height: 40px;
  border: 2px solid $brand-navy-800;
  background: $brand-navy-800;
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  padding: 6px 20px;
  transition: all 200ms;
  &:hover {
    border-color: $brand-blue-500;
    background: $brand-blue-500;
    color: white;
  }
}
</style>

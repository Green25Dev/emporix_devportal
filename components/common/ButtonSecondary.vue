<template>
  <button class="btn" :class="theme" :disabled="disabled">
    <slot />
  </button>
</template>

<script>

export default {
  name: 'ButtonSecondary',
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
  border-color: white;
}
.dark  {
  color: black;
  border-color: black;
}
.btn {
  border: 2px solid;
  background: transparent;
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 1.75px;
  text-transform: uppercase;
  padding: 6px 16px;
  transition: all 200ms;
  &:hover {
    border-color: $brand-blue-500;
    background: $brand-blue-500;
    color: white;
  }
  &:disabled {
    border:2px solid $brand-grey-200;
    background-color: white;
    color: $brand-grey-200;
  }
}
</style>

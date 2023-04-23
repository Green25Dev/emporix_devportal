<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 1L1 7" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M1 1L7 7" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  name: 'TimesIcon',
  props: {
    color: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '8'
    },
    width: {
      type: String,
      default: '8'
    }
  }
}
</script>

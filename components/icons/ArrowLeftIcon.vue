<template>
  <svg
    width="14"
    height="10"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="standard-icon"
  >
    <path d="M15 6L1 6" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6.25 11L1 6L6.25 1" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  name: 'ArrowLeftIcon',
  props: {
    color: {
      type: String,
      default: '#6A6A6A'
    }
  }
}
</script>

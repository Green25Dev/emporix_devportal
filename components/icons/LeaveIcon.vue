<template>
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="standard-icon"
  >
    <path d="M15.4382 11.5L19 8L15.4382 4.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M19 8L7.42403 8" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.1767 5.375V3C11.1767 1.89543 10.2812 1 9.17666 1H2.99999C1.89542 1 0.999987 1.89543 0.999987 3V13C0.999987 14.1046 1.89542 15 2.99999 15H9.17667C10.2812 15 11.1767 14.1047 11.1767 13.0001C11.1767 12.1245 11.1767 11.2 11.1767 10.625" :stroke="color" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</template>

<script>
export default {
  name: 'LeaveIcon',
  props: {
    color: {
      type: String,
      default: '#6A6A6A'
    }
  }
}
</script>

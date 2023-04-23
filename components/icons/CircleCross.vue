<template>
  <svg width="30" height="30" viewBox="0 0 30 30" :fill="color" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15"/>
    <rect
      x="13"
      y="6"
      width="4"
      height="18"
      rx="1"
      fill="white"
    />
    <rect
      x="6"
      y="17"
      width="4"
      height="18"
      rx="1"
      transform="rotate(-90 6 17)"
      fill="white"
    />
  </svg>
</template>

<script>
export default {
  name: 'CircleCross',
  props: {
    color: {
      type: String,
      default: '#009FE3'
    }
  }
}
</script>

<template>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.74979 4.9519V7.3279H10.9698V8.6599H8.74979V11.0479H7.23779V8.6599H5.02979V7.3279H7.23779V4.9519H8.74979Z" :fill="color" />
    <rect
      x="0.5"
      y="0.5"
      width="15"
      height="15"
      rx="1.5"
      :stroke="color"
      stroke-width="1"
    />
  </svg>
</template>

<script>
export default {
  name: 'AddIcon',
  props: {
    color: {
      type: String,
      default: 'black'
    }
  }
}
</script>

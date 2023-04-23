<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="4"
      cy="4"
      r="3.22"
      fill="white"
      :stroke="color"
      stroke-width="1.56"
    />
  </svg>
</template>

<script lang="js">

export default {
  name: 'CircleIcon',
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

<template>
  <svg :width="width" :height="height" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.53383 19.4351L2.42183 11.972L0 14.4955L9.53383 24.5L30 3.02349L27.5952 0.5L9.53383 19.4351Z" :fill="color" />
  </svg>
</template>

<script lang="js">

export default {
  name: 'CheckmarkIcon',
  props: {
    color: { type: String, default: '' },
    height: { type: String, default: '8' },
    width: { type: String, default: '8' }
  }
}
</script>

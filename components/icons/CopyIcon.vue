<template>
  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="mask0_274_7017"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="4"
      width="15"
      height="14"
    >
      <path d="M0.245361 18V4H2.11203V16.1333H14.2454V18H0.245361Z" fill="white" />
    </mask>
    <g mask="url(#mask0_274_7017)">
      <rect
        x="1.24536"
        y="5"
        width="12"
        height="12"
        rx="1"
        stroke="#7B8B99"
        stroke-width="2"
      />
    </g>
    <rect
      x="5.24536"
      y="1"
      width="12"
      height="12"
      rx="1"
      stroke="#27282A"
      stroke-width="2"
    />
  </svg>
</template>

<script>
export default {
  name: 'CopyIcon',
  props: {
    color: {
      type: String,
      default: '#6A6A6A'
    }
  }
}
</script>

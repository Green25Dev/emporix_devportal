<template>
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.2727 15V13.4445C13.2727 12.6193 12.9279 11.828 12.3142 11.2446C11.7004 10.6611 10.868 10.3333 10 10.3333H4.27273C3.40475 10.3333 2.57232 10.6611 1.95856 11.2446C1.3448 11.828 1 12.6193 1 13.4445V15"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.13625 7.22222C8.94373 7.22222 10.409 5.82933 10.409 4.11111C10.409 2.39289 8.94373 1 7.13625 1C5.32878 1 3.86353 2.39289 3.86353 4.11111C3.86353 5.82933 5.32878 7.22222 7.13625 7.22222Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M15.7275 4V10" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.8832 7H12.5715" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black'
    }
  }
}
</script>

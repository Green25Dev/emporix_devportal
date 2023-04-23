<template>
  <svg
    width="26"
    height="20"
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="standard-icon"
  >
    <path
      d="M18.4546 18.9999V16.9999C18.4546 15.939 17.9949 14.9216 17.1766 14.1715C16.3582 13.4213 15.2483 12.9999 14.091 12.9999H5.36366C4.20635 12.9999 3.09643 13.4213 2.27809 14.1715C1.45974 14.9216 1 15.939 1 16.9999V18.9999"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.72719 8.99999C12.1372 8.99999 14.0908 7.20913 14.0908 5C14.0908 2.79086 12.1372 1 9.72719 1C7.3172 1 5.36353 2.79086 5.36353 5C5.36353 7.20913 7.3172 8.99999 9.72719 8.99999Z"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M25 19V17C24.9993 16.1137 24.6775 15.2528 24.0852 14.5523C23.4928 13.8519 22.6634 13.3516 21.7273 13.13"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.3635 1.13013C18.3022 1.35043 19.1341 1.85083 19.7282 2.55244C20.3224 3.25404 20.6448 4.11695 20.6448 5.00512C20.6448 5.89329 20.3224 6.7562 19.7282 7.45781C19.1341 8.15942 18.3022 8.65982 17.3635 8.88012"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'ManageAppIcon',
  props: {
    color: {
      type: String,
      default: '#6A6A6A'
    }
  }
}
</script>

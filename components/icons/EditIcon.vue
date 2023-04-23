<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="standard-icon"
  >
    <path d="M7.26204 2.47595H2.39156C2.0225 2.47595 1.66855 2.62256 1.40758 2.88353C1.14661 3.1445 1 3.49845 1 3.86752V13.6085C1 13.9775 1.14661 14.3315 1.40758 14.5924C1.66855 14.8534 2.0225 15 2.39156 15H12.1325C12.5016 15 12.8555 14.8534 13.1165 14.5924C13.3775 14.3315 13.5241 13.9775 13.5241 13.6085V8.73799" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M12.4805 1.4323C12.7573 1.1555 13.1327 1 13.5242 1C13.9156 1 14.2911 1.1555 14.5679 1.4323C14.8447 1.7091 15.0002 2.08452 15.0002 2.47598C15.0002 2.86743 14.8447 3.24285 14.5679 3.51965L7.95793 10.1296L5.1748 10.8254L5.87059 8.04223L12.4805 1.4323Z" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  name: 'EditIcon',
  props: {
    color: {
      type: String,
      default: '#009FE3'
    }
  }
}
</script>

<template>
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="standard-icon"
  >
    <path d="M1 3.80011H2.4H13.6" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M4.49966 3.8V2.4C4.49966 2.0287 4.64716 1.6726 4.90971 1.41005C5.17226 1.1475 5.52835 1 5.89966 1H8.69966C9.07096 1 9.42706 1.1475 9.68961 1.41005C9.95216 1.6726 10.0997 2.0287 10.0997 2.4V3.8M12.1997 3.8V13.6C12.1997 13.9713 12.0522 14.3274 11.7896 14.5899C11.5271 14.8525 11.171 15 10.7997 15H3.79966C3.42835 15 3.07226 14.8525 2.80971 14.5899C2.54716 14.3274 2.39966 13.9713 2.39966 13.6V3.8H12.1997Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M5.90039 7.29999V11.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.69971 7.29999V11.5" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script>
export default {
  name: 'DeleteIcon',
  props: {
    color: {
      type: String,
      default: '#6A6A6A'
    }
  }
}
</script>

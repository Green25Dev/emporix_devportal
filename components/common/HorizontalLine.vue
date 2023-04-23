<template>
  <div class="divider" :style="{'border-color': color}" />
</template>
<script>
export default {
  name: 'HorizontalLine',
  props: {
    color: {
      type: String,
      default: '#C0D0DF'
    }
  }
}
</script>
<style lang="scss">
.divider {
  width: 100%;
  border: 1px solid;
}
</style>

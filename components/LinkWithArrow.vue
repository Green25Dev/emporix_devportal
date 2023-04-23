<template>
  <div class="link-container" :class="arrowOnRight ? 'justify-content' : 'arrow-left'">
    <span v-if="arrowOnRight" class="left-arrow" :class="isTitle ? 'paragraph-2' : 'label-2'">{{ text }}</span>
    <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path class="stroke1" d="M16 7L5.96046e-08 7" stroke-width="2" />
      <path class="stroke2" d="M9.93103 1L16 7L9.93103 13" stroke-width="2" stroke-linejoin="round" />
    </svg>
    <span v-if="!arrowOnRight" class="label-2">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'RightArrowIcon',
  props: {
    text: {
      type: String,
      default: ''
    },
    arrowOnRight: {
      type: Boolean,
      default: true
    },
    isTitle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.link-container {
  color: $brand-blue-500;
  width: 100%;
  transition: color 200ms;
  display: flex;
  align-items: center;
  min-width: fit-content;
  .stroke1 {
    stroke: #4DB1FD
  }
  .stroke2 {
    stroke: #128AFB
  }
  &:hover {
  color: black;
    .stroke1 {
      stroke: black
    }
    .stroke2 {
      stroke: black
    }
  }
}
.justify-content {
  justify-content: space-between;
}
.arrow-left {
  justify-content: flex-start;
  gap: 16px;
}
</style>

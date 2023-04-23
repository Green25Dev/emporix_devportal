<template>
  <button class="btn" :disabled="disabled" :class="{'disabled': disabled}">
    {{ $t(label) }}
    <slot v-if="arrow" class="slot">
      <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 7L5.96046e-08 7" class="arrow1" stroke-width="2" />
        <path d="M9.93103 1L16 7L9.93103 13" class="arrow2" stroke-width="2" stroke-linejoin="round" />
      </svg>
    </slot>
  </button>
</template>

<script>

export default {
  name: 'ButtonPrimary',
  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background: linear-gradient($brand-blue-300, $brand-blue-500);
  color: white;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 12px;
  border: 1px solid $brand-blue-500;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  &.disabled {
    background: $brand-grey-300;
    border-color: $brand-grey-300;
    pointer-events: none;
  }
  .arrow1 {
    stroke: $brand-blue-200;
  }
  .arrow2 {
    stroke: white;
  }
  &:hover {
    background: linear-gradient($brand-navy-300, $brand-navy-800);
    border: 1px solid $brand-navy-800;
    .arrow1 {
      stroke: $brand-grey-200;
    }
    .arrow2 {
      stroke: $brand-grey-400;
    }
  }
}
</style>

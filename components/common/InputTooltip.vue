<template>
  <div
    class="input-tooltip"
    @mouseenter="isOpened = true"
    @mouseleave="isOpened = false"
  >
    <TooltipIcon width="16" height="16" class="icon" />
    <transition name="fade">
      <div v-if="isOpened" class="content">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import TooltipIcon from '~/components/icons/TooltipIcon'
export default {
  name: 'InputTooltip',
  components: { TooltipIcon },
  data () {
    return {
      isOpened: false
    }
  }
}
</script>

<style lang="scss" scoped>
.input-tooltip {
  display: inline-flex;
  position: relative;

  .icon {
    cursor: pointer;
  }

  .content {
    z-index: 1;
    padding: 16px;
    background: $brand-navy-800;
    color: white;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    position: absolute;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.5);
    top: 50%;
    left: calc(100% + 16px);
    transform: translateY(-50%);
    width: max-content;
    max-width: 400px;
    border-radius: 4px;
    @include tablet-down() {
      max-width: 250px;
    }
    @include phone-only() {
      position: fixed;
      left: 0;
      top: 80px;
      transform: unset;
      max-width: unset;
      width: 100%;
      border-radius: unset;
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      right: 100%;
      margin-top: -8px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent $brand-navy-800 transparent transparent;
    }
  }
}
</style>

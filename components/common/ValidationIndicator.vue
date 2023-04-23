<template>
  <div
    :class="{ initial: !touched, invalid: !valid }"
    class="validation-indicator"
  >
    <CircleIcon
      v-if="!touched"
      width="8"
      height="8"
      :color="'gray'"
    />
    <CheckmarkIcon
      v-if="touched && valid"
      width="8"
      height="8"
      :color="'green'"
    />
    <TimesIcon
      v-if="touched && !valid"
      width="8"
      height="8"
      :color="'red'"
    />
    <span class="label">{{ label }}</span>
  </div>
</template>

<script>
import TimesIcon from '~/components/icons/TimesIcon'
import CheckmarkIcon from '~/components/icons/CheckmarkIcon'
import CircleIcon from '~/components/icons/CircleIcon'

export default {
  components: { CheckmarkIcon, TimesIcon, CircleIcon },
  props: {
    label: {
      type: String,
      default: ''
    },
    valid: {
      type: Boolean,
      default: false
    },
    touched: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style lang="scss" scoped>
.validation-indicator {
  display: flex;
  align-items: center;
  font-family: Lato, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: $validGreen;
  margin-right: 8px;
  &.invalid {
    color: $invalidRed;
  }

  &.initial {
    color: gray;
  }

  .label {
    margin-left: 8px;
  }
}
</style>

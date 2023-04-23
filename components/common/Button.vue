<template>
  <button
    class="btn"
    :class="theme"
    :disabled="disabled"
  >
    <div class="label-container">
      {{ label }}
      <LeaveIcon v-if="icon" color="#ffffff" class="icon"/>
    </div>
  </button>
</template>

<script>
import LeaveIcon from '~/components/icons/LeaveIcon'

export default {
  name: 'Button',
  components: {
    LeaveIcon
  },
  props: {
    label: {
      type: String,
      default: 'Submit'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.btn {
  height: 40px;
  font-family: Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  vertical-align: center;
  min-width: 120px;
  padding: 0 16px;
  transition: all 200ms;
  border-radius: 2px;
  &:disabled {
    background-color: $lightGray;
  }
  &:disabled:hover {
    background-color: $searchLightGray;
  }
  .label-container {
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      margin-left: 8px;
      path {
        stroke: white;
      }
    }
  }
}

.default {
  background: $lightBlue;
  color: white;
  &:hover {
    background-color: black;
  }
}

.warning {
  background: $error;
  color: white;
  &:hover {
    background-color: black;
  }
}

.warning-ghost {
  background: white;
  color: $error;
  border: 1px solid $error;
  &:hover {
    border-color: black;
    color: black;
  }
}
</style>

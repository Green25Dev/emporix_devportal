<template>
  <div>
    <label v-if="toplabel" class="top-label">
      <span class="label-text">{{ toplabel }}</span>
      <InputTooltip v-if="$slots['tooltip']" class="label-tooltip">
        <slot name="tooltip" />
      </InputTooltip>
    </label>
    <div class="flex justify-content-center align-items-center">
      <div
        v-click-outside="close"
        class="dropdown-container"
        :class="{'expanded': expanded, 'no-border': noBorder, 'lightborder': lightBorder, 'no-avatar': noAvatar
        }"
      >
        <div
          v-if="selectedOption"
          class="value-container"
          :class="{'bold': bold, 'no-border': noBorder, 'no-avatar': noAvatar}"
          @click="toggleExpand"
        >
          <TenantAvatar v-if="!noAvatar" class="mr-2" :tenant="selectedOption.label" />
          <label :class="{'no-avatar': noAvatar}" class="mr-2">{{ selectedOption.label }}</label>
          <img src="/dropdown-arrow-icon.svg" alt="dropdown arrow" class="arrow-icon" :class="{'expanded': expanded}">
        </div>
        <div class="options-container" :class="{'expanded': expanded,'no-border': noBorder, 'lightborder': lightBorder, 'no-avatar': noAvatar}">
          <div v-for="option in filteredOptions" :key="option.value" class="dropdown-option" :class="{'no-avatar': noAvatar}" @click.stop="selectOption(option)">
            <TenantAvatar v-if="!noAvatar" class="mr-2" :tenant="option.label" />
            {{ option.label }}
          </div>
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TenantAvatar from '~/components/common/TenantAvatar'
import InputTooltip from '~/components/common/InputTooltip'

export default {
  name: 'Dropdown',
  components: { TenantAvatar, InputTooltip },
  props: {
    value: {
      type: String,
      default: ''
    },
    noAvatar: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    lightBorder: {
      type: Boolean,
      default: false
    },
    toplabel: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default () {
        return [{
          value: 1,
          label: 'Label'
        }, {
          value: 2,
          label: 'Label2'
        }
        ]
      }
    }
  },
  data () {
    return {
      selectedOption: {
        value: '1',
        label: 'Label'
      },
      filteredOptions: [],
      expanded: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (newValue) {
        const selectedOption = this.options.filter(option => option.value === newValue)
        const filteredOptions = this.options.filter(option => option.value !== newValue)
        this.selectedOption = selectedOption[0]
        this.filteredOptions = filteredOptions
      }
    }
  },
  methods: {
    selectOption (option) {
      this.selectedOption = option
      this.expanded = false
      this.$emit('select', this.selectedOption)
    },
    toggleExpand () {
      this.expanded = !this.expanded
    },
    close () {
      this.expanded = false
    }
  }
}
</script>

<style lang="scss">
$dropdownWidth: 100%;

.top-label {
  display: inline-flex;
  margin-bottom: 8px;

  .label-text {
    color: $brand-grey-400;
    font-size: 14px;
    line-height: 16px;
    font-weight: $weight-bold;
  }

  .label-tooltip {
    margin-left: 8px;
    height: 16px;
  }
}

.dropdown-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  position: relative;
  height: 36px;
  padding: 8px 16px;
  font-size: 14px;
  line-height: 24px;
  width: $dropdownWidth;
  cursor: pointer;

  &.no-avatar {
    height: 38px;
  }

  &.no-border {
    border: 1px solid transparent;
  }
  &.lightborder {
    border: 2px solid $brand-grey-300;
  }

  .value-container {
    display: flex;
    height: 36px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-transform: uppercase;

    &.no-avatar {
      font-weight: bold;
      text-transform: none;
    }

    &.bold {
      font-weight: bold;
    }

    &.no-border {
      border: 1px solid transparent;
    }

    &.lightborder {
      border: 2px solid $brand-grey-300;
    }
  }

  .arrow-icon {
    transition: transform 0.2s ease-in-out;
    margin-left: auto;

    &.expanded {
      transform: rotate(180deg);
    }
  }

  &.expanded {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .options-container {
    border: 2px solid #000000;
    width: calc(#{$dropdownWidth} + 4px);
    top: 36px;
    left: -2px;
    position: absolute;
    display: none;
    background: #ffffff;
    z-index: 10;

    &.bold {
      font-weight: bold;
    }

    &.no-border {
      border: 1px solid transparent;
    }

    &.lightborder {
      width: calc(100% + 4px);
      left: -2px;
      top: 34px;
      border: 2px solid $brand-grey-300;
    }

    .dropdown-option {
      text-transform: uppercase;
      height: 38px;
      border-top: 1px solid $brand-grey-300;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      font-weight: bold;
      color: black;
      &.no-avatar {
        text-transform: none;
      }
    }

    &.expanded {
      display: block;
      border-block-start-style: unset;
    }
  }
}
</style>

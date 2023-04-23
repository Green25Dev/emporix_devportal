<template>
  <div class="w-full wrapper">
    <label
      v-if="label.length > 0"
      class="input-label"
      :class="{ invalid: errors.length > 0 && blur}"
      :for="name"
    >
      {{ label }}
    </label>
    <img v-if="searchicon" src="/icons/search.svg" class="search-icon">
    <input
      ref="input"
      class="w-full"
      :placeholder="placeholder"
      :name="name"
      :type="type"
      :required="required"
      :disabled="disabled"
      :autofocus="autofocus"
      :class="{
        invalid: errors.length > 0 && blur,
        withLabel: label.length > 0,
        withSearch: searchicon,
        big: big,
        blue: blue
      }"
      :value="value"
      @blur="blurAndFakeInput($event.target.value)"
      @input="$emit('input', $event.target.value)"
      @keyup.enter = "$emit('enterKeyUp', $event.target.value)"
    >
    <transition name="fade">
      <div v-if="!novalidate && errors.length > 0 && blur">
        <small v-for="error in errors" :key="error.msg" class="error-message">
          <TimesIcon width="8" height="8" :color="'red'" />
          <span class="error-message-text">{{ $t(error.msg) }}</span>
        </small>
      </div>
    </transition>
  </div>
</template>

<script>
import TimesIcon from '~/components/icons/TimesIcon'

export default {
  name: 'TextInput',
  components: { TimesIcon },
  props: {
    novalidate: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'input'
    },
    blue: {
      type: Boolean,
      default: false
    },
    big: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    searchicon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      blur: false
    }
  },
  watch: {
    focus (oldVal, newVal) {
      if (!oldVal && newVal) {
        this.$refs.input.focus()
      } else {
        this.$refs.input.blur()
      }
    }
  },
  methods: {
    blurAndFakeInput (value) {
      this.$emit('input', value)
      this.blur = true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;

  .search-icon {
    position: absolute;
    left: 10px;
    top: calc(50% - 0.5em);
  }
}

.input-label {
  font-family: Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: $brand-grey-400;
  height: 32px;
  transition: color .2s;

  &.invalid {
    color: $red-600;
  }
}

input {
  padding: 0 5px;
  border: 2px solid $brand-grey-400;
  box-sizing: border-box;
  border-radius: 2px;
  font-size: 14px;
  line-height: 32px;
  font-weight: bold;
  transition: color .2s, border-color .2s;
  &:disabled {
    color: $brand-grey-400;
  }

  &.big {
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    border-color: $brand-grey-300;
  }

  &.blue {
    color: $brand-blue-500;
    font-weight: bold;
    height: 40px;
    border-color: $brand-grey-300;
    text-align: center;
  }

  &.withLabel {
    margin-top: 8px;
  }

  &.invalid {
    border: 2px solid $red-600;
  }

  &.valid {
    border: 1px solid $gray;
  }

  &:focus {
    border: 2px solid $lightBlue;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
  }

  &.withSearch {
    border: 2px solid $brand-grey-400;
    color: $brand-grey-400;
    padding-left: 42px;

    &::placeholder {
      color: $brand-grey-400;
    }
  }
}

.search-icon {
  color: $gray;
}

.error-message {
  display: block;
  margin-top: 8px;
  color: $red-600;
  font-size: 12px;
  line-height: 16px;

  &-text {
    margin-left: 8px;
  }
}
</style>

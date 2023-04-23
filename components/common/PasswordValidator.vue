<template>
  <div class="validators">
    <ValidationIndicator
      class="indicator"
      :label="$t('validation.password.length')"
      :valid="lengthValid()"
      :touched="touched()"
    />
    <ValidationIndicator
      class="indicator"
      :label="$t('validation.password.uppercase')"
      :valid="uppercaseValid()"
      :touched="touched()"
    />
    <ValidationIndicator
      class="indicator"
      :label="$t('validation.password.lowercase')"
      :valid="lowercaseValid()"
      :touched="touched()"
    />
    <ValidationIndicator
      class="indicator"
      :label="$t('validation.password.containNumbers')"
      :valid="containNumberValid()"
      :touched="touched()"
    />
    <ValidationIndicator
      class="indicator"
      :label="$t('validation.password.doesntContainUserName')"
      :valid="doesntContainUserNameValid()"
      :touched="touched()"
    />
  </div>
</template>

<script>
import ValidationIndicator from '~/components/common/ValidationIndicator'

export default {
  name: 'PasswordValidator',
  components: { ValidationIndicator },
  props: {
    password: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    }
  },
  watch: {
    password () {
      if (!this.touched) {
        return 'untouched'
      }
      const overallValid =
        this.uppercaseValid() &&
        this.lowercaseValid() &&
        this.lengthValid() &&
        this.containNumberValid() &&
        this.doesntContainUserNameValid()
      this.$emit('valid', overallValid)
    }
  },
  methods: {
    lengthValid () {
      return this.password.length >= 8
    },
    uppercaseValid () {
      return /(?=.*?[A-Z])/.test(this.password)
    },
    lowercaseValid () {
      return /(?=.*?[a-z])/.test(this.password)
    },
    doesntContainUserNameValid () {
      let result = true
      const otherThanLetterChar = /(?![a-z]|[A-Z])./
      const matches = this.userName
        .split(otherThanLetterChar)
        .filter(match => match.length > 2)
        .map(match => match.toLowerCase())

      matches.forEach((match) => {
        if (this.password.toLowerCase().includes(match)) {
          result = false
        }
      })
      return result
    },
    containNumberValid () {
      return /(?=.*?[0-9])/.test(this.password)
    },
    touched () {
      return this.password.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.validators {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;

  .indicator {
    margin-right: 14px;
  }
}
</style>

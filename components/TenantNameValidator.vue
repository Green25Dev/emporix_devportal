<template>
  <div class="tenant-name-validator">
    <div class="validator-title">
      {{ $t('tenantNameValidator.description') }}
    </div>
    <ul :class="{ 'tenant-name-touched': touched() }">
      <li
        class="validator-point"
        :class="{ invalid: !startLetterValid(), valid: startLetterValid()}"
      >
        {{ $t('tenantNameValidator.startLetter') }}
      </li>
      <li
        class="validator-point"
        :class="{ invalid: !lettersAndNumbersValid(), valid: lettersAndNumbersValid()}"
      >
        {{ $t('tenantNameValidator.lettersAndNumbers') }}
      </li>
      <li
        class="validator-point"
        :class="{ invalid: !lengthValid(), valid: lengthValid()}"
      >
        {{ $t('tenantNameValidator.length', {max: $config.TENANT_NAME_LENGTH}) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TenantNameValidator',
  props: {
    tenantName: { default: '', type: String }
  },
  watch: {
    tenantName () {
      if (!this.touched) {
        return 'untouched'
      }
      const overallValid = this.lengthValid() && this.startLetterValid() && this.lettersAndNumbersValid()
      this.$emit('valid', overallValid)
    }
  },
  methods: {
    lengthValid () {
      const maxLength = this.$config.TENANT_NAME_LENGTH
      const minLength = 3

      return this.tenantName.length <= maxLength && this.tenantName.length >= minLength
    },
    startLetterValid () {
      return /^[a-z]/.test(this.tenantName)
    },
    lettersAndNumbersValid () {
      return /^[a-z0-9]*$/.test(this.tenantName)
    },
    touched () {
      return this.tenantName.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.tenant-name-validator {
  font-size: 14px;
  line-height: 20px;
  color: $brand-grey-400;

  .validator-title {
    margin-bottom: 8px;
  }

  .validator-point {
    margin-left: 32px;
    transition: color .2s;
  }

  .tenant-name-touched {
    .invalid {
      color: $invalidRed;
    }

    .valid {
      color: $validGreen;
    }
  }
}

</style>

<template>
  <div class="verify-container flex flex-column justify-content-center">
    <h1>
      {{ $t('tenant.verify.title') }}
    </h1>
    <span class="description">{{ $t('tenant.verify.text', {email: 'email@email.com'}) }}</span>
    <span class="question">{{ $t('tenant.verify.question') }}</span>
    <Button :label="$t('tenant.verify.resend.label')" />
  </div>
</template>

<script>
import Button from '~/components/common/Button'

export default {
  components: {
    Button
  },
  layout: 'centered',
  data () {
    return {
      errors: []
    }
  },
  methods: {
    addError (error) {
      this.errors.push(error)
    },
    clearErrors () {
      this.errors = []
    }
  }
}
</script>

<style lang="scss" scoped>
.verify-container {
  font-family: Lato, sans-serif;
  font-style: normal;
  margin-top: 112px;
  text-align: center;

  h1 {
    color: black;
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
  }

  .description {
    margin-top: 32px;
    font-size: 14px;
    line-height: 20px;
  }

  .question {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    margin-top: 64px;
    margin-bottom: 32px;
    color: $gray;
  }

  .tenant-name-input {
    margin-top: 32px;
    margin-bottom: 16px;
  }
}

</style>

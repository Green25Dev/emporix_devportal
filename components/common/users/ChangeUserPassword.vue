<template>
  <div v-if="currentUserId === userId">
    <div class="pb-2">
      {{ $t('changePassword.currentUser.text') }}
    </div>
    <NuxtLink to="/account-settings?tab=change-password" class="mt-2">
      <ButtonTertiary> {{ $t('changePassword.currentUser.link') }}</ButtonTertiary>
    </NuxtLink>
  </div>
  <form
    v-else
    id="settings"
    class="change-password-form"
    novalidate
    @submit.prevent=""
  >
    <TextInput
      v-model="newPassword"
      type="password"
      class="text-input"
      :label="$t('changePassword.newPassword')"
      @input="touched.newPassword = true"
    />
    <PasswordValidator
      class="password-validator"
      :user-name="userName"
      :password="newPassword"
      @valid="newPasswordValid = $event"
    />
    <TextInput
      v-model="verifyNewPassword"
      type="password"
      class="text-input"
      :label="$t('changePassword.newPasswordValidation')"
      :errors="differentPasswordsError()"
      @input="touched.verifyPassword = true"
    />
  </form>
</template>

<script>
import TextInput from '~/components/common/TextInput'
import PasswordValidator from '~/components/common/PasswordValidator'
import ButtonTertiary from '~/components/common/ButtonTertiary'

export default {
  components: {
    ButtonTertiary,
    PasswordValidator,
    TextInput
  },
  props: {
    userId: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      newPassword: '',
      verifyNewPassword: '',
      touched: {
        newPassword: false,
        verifyPassword: false
      },
      newPasswordValid: false
    }
  },
  computed: {
    currentUserId () {
      return this.$store.getters['auth/getCurrentUserId']()
    }
  },
  watch: {
    newPassword () {
      this.emitNewPassword(this.newPassword)
      this.emitOverallPasswordValidity()
      this.emitDiscardPossibility()
    },
    verifyNewPassword () {
      this.emitNewPassword(this.newPassword)
      this.emitOverallPasswordValidity()
      this.emitDiscardPossibility()
    },
    newPasswordValid () {
      this.emitOverallPasswordValidity()
    }
  },
  methods: {
    emitNewPassword (newPassword) {
      this.$emit('newPassword', newPassword)
    },
    emitOverallPasswordValidity () {
      const isPasswordValid = this.newPasswordValid && this.newPassword === this.verifyNewPassword
      this.$emit('valid', isPasswordValid)
    },
    emitDiscardPossibility () {
      const isDiscardPossible = this.verifyNewPassword !== '' || this.newPassword !== ''
      this.$emit('discard', isDiscardPossible)
    },
    resetForm () {
      this.newPassword = ''
      this.verifyNewPassword = ''
    },
    differentPasswordsError () {
      const arePasswordsSame = this.newPassword === this.verifyNewPassword

      if (!this.touched.verifyPassword || arePasswordsSame) {
        return []
      }
      return [{ msg: 'validation.password.same' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password-form {
  .text-input {
    margin-bottom: 32px;
    @include phone-only() {
      margin-bottom: 16px;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .password-validator {
    margin: -24px 0 32px;
    @include phone-only() {
      margin: -8px 0 16px;
    }
  }
}
</style>

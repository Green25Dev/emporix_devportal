<template>
  <div class="pb-6 padded-content">
    <div class="title-container">
      <h1>{{ $t('accSettings.title') }}</h1>
    </div>
    <v-progress-circular v-if="!initUser && !initPassword" indeterminate />
    <div v-else>
      <v-tabs v-model="tab" class="tabs-labels">
        <v-tab>{{ $t('accSettings.tabs.personalSettings') }}</v-tab>
        <v-tab>{{ $t('accSettings.tabs.changePass') }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="tab-content">
            <div class="content-title">
              {{ $t('accSettings.personalDetails.title') }}
            </div>
            <div class="content-form">
              <TextInput
                v-model="user.firstName"
                type="text"
                class="text-input input-narrow"
                :label="$t('accSettings.personalDetails.labels.firstName')"
              />
              <TextInput
                v-model="user.lastName"
                type="text"
                class="text-input input-narrow"
                :label="$t('accSettings.personalDetails.labels.lastName')"
              />
              <TextInput
                v-model="user.email"
                type="text"
                class="text-input"
                :label="$t('accSettings.personalDetails.labels.email')"
                :disabled="true"
              />
            </div>
          </div>
          <div class="tab-content">
            <div class="content-title">
              {{ $t('accSettings.emailPreferences.title') }}
            </div>
            <div class="content-form">
              <v-checkbox
                v-model="user.newsletter"
                :on-icon="'mdi-checkbox-intermediate'"
                color="info"
                :label="$t('accSettings.emailPreferences.newsletter')"
                class="checkbox"
              />
            </div>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="tab-content">
            <div class="content-title">
              {{ $t('accSettings.oldPass.title') }}
            </div>
            <div class="content-form">
              <TextInput
                v-model="password.old"
                type="password"
                class="text-input"
                :label="$t('accSettings.oldPass.labels.oldPass')"
              />
            </div>
          </div>
          <div class="tab-content">
            <div class="content-title">
              {{ $t('accSettings.newPass.title') }}
            </div>
            <div class="content-form">
              <TextInput
                v-model="password.new"
                type="password"
                class="text-input"
                :label="$t('accSettings.newPass.labels.newPass')"
                @input="touched.newPassword = true"
              />
              <PasswordValidator
                class="password-validator"
                :user-name="authData.login"
                :password="password.new"
                @valid="newPasswordValid = $event"
              />
              <TextInput
                v-model="password.confirm"
                type="password"
                class="text-input"
                :label="$t('accSettings.newPass.labels.confirmPass')"
                :errors="differentPasswordsError()"
                @input="touched.confirmPassword = true"
              />
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>

      <ActionToolbar class="toolbar-actions">
        <div class="buttons">
          <template v-if="tab === 0">
            <ButtonSecondary
              theme="dark"
              :disabled="!userChanged || loading"
              @click.native="discardUserChanges"
            >
              {{ $t('global.discard') }}
            </ButtonSecondary>
            <ButtonSave
              class="save-btn"
              :disabled="!userChanged || loading"
              @click.native="changeUserData"
            >
              {{ $t('global.save') }}
            </ButtonSave>
          </template>

          <template v-if="tab === 1">
            <ButtonSecondary
              theme="dark"
              :disabled="!passwordChanged || loading"
              @click.native="discardPasswordChanges"
            >
              {{ $t('global.discard') }}
            </ButtonSecondary>
            <ButtonSave
              class="save-btn"
              :disabled="!arePasswordsSame() || !newPasswordValid || loading"
              @click.native="changePassword"
            >
              {{ $t('global.save') }}
            </ButtonSave>
          </template>
        </div>
      </ActionToolbar>
    </div>
  </div>
</template>

<script>

import TextInput from '~/components/common/TextInput'
import ActionToolbar from '~/components/common/ActionToolbar'
import ButtonSecondary from '~/components/common/ButtonSecondary'
import ButtonSave from '~/components/common/ButtonSave'
import PasswordValidator from '~/components/common/PasswordValidator'
import { areObjEqual, cloneObj } from '~/commons/utils'

const SETTINGS = 'personal-settings'
const CHANGE_PASSWORD = 'change-password'

export default {
  components: { PasswordValidator, ButtonSave, TextInput, ActionToolbar, ButtonSecondary },
  layout: 'portal',
  data () {
    return {
      tab: 0,
      loading: false,
      initUser: null,
      user: null,
      initPassword: null,
      password: {
        old: '',
        new: '',
        confirm: ''
      },
      userChanged: false,
      passwordChanged: false,
      newPasswordValid: false,
      touched: {
        newPassword: false,
        confirmPassword: false
      }
    }
  },
  computed: {
    authData () {
      return this.$store.getters['auth/getAuthData']()
    }
  },
  watch: {
    $route () {
      this.changeTabByUrlParam()
    },
    user: {
      handler () {
        this.userChanged = !areObjEqual(this.user, this.initUser)
      },
      deep: true
    },
    password: {
      handler () {
        this.passwordChanged = !areObjEqual(this.password, this.initPassword)
      },
      deep: true
    }
  },
  async mounted () {
    this.changeTabByUrlParam()
    await this.loadUserData()
    this.initUser = cloneObj(this.user)
    this.initPassword = cloneObj(this.password)
    this.userChanged = false
    this.passwordChanged = false
  },
  methods: {
    async changePassword () {
      this.loading = true
      try {
        await this.$authAdapterService().changePassword(
          this.password.old,
          this.password.new
        )
        this.password = cloneObj(this.initPassword)
        this.$toast.success(this.$t('accSettings.toasts.changePassSuccess'), {
          icon: 'check'
        })
      } catch (error) {
        this.$toast.error(this.$t('accSettings.toasts.changePassError'), {
          icon: 'alert-outline'
        })
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async changeUserData () {
      this.loading = true
      try {
        await this.$authAdapterService().updateUser(this.user)
        this.$store.dispatch('auth/updateUser', { ...this.user })
        this.$toast.success(this.$t('accSettings.toasts.saveSuccess'), { icon: 'check' })
        this.initUser = cloneObj(this.user)
        this.userChanged = false
      } catch (error) {
        this.$toast.error(this.$t('accSettings.toasts.saveError'), { icon: 'alert-outline' })
      } finally {
        this.loading = false
      }
    },
    async fetchUser () {
      try {
        return await this.$authAdapterService().getCurrentUser()
      } catch (error) {
        this.$toast.error(this.$t('accSettings.toasts.fetchError'), { icon: 'alert-outline' })
      }
    },
    async loadUserData () {
      const userData = await this.fetchUser()
      this.loading = false
      this.user = {
        firstName: userData.user.firstName,
        lastName: userData.user.lastName,
        email: userData.user.email,
        newsletter: userData.newsletter,
        termsAndCondition: userData.termsAndCondition
      }
    },
    arePasswordsSame () {
      return this.password.new === this.password.confirm
    },
    differentPasswordsError () {
      if (!this.touched.confirmPassword || this.arePasswordsSame()) {
        return []
      }
      return [{ msg: 'validation.password.same' }]
    },
    discardUserChanges () {
      this.userChanged = false
      this.user = cloneObj(this.initUser)
    },
    discardPasswordChanges () {
      this.password = false
      this.password = cloneObj(this.initPassword)
    },
    changeTabByUrlParam () {
      const { tab } = this.$route.query

      if (tab === SETTINGS) {
        this.tab = 0
      } else if (tab === CHANGE_PASSWORD) {
        this.tab = 1
      } else {
        this.tab = 0
      }
    }
  }
}
</script>

<style lang="scss">
.tabs-labels {
  margin-bottom: 48px !important;
}

.tab-content {
  display: flex;
  margin-bottom: 48px;
  @include phone-only() {
    display: block;
  }

  .content-title {
    width: 200px;
    margin-right: 24px;
    font-size: 20px;
    line-height: 24px;
    font-weight: $weight-bold;
    @include phone-only() {
      margin-bottom: 24px;
      width: 100%;
    }
  }

  .content-form {
    width: 420px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @include phone-only() {
      width: 100%;
    }

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

    .input-narrow {
      width: calc(50% - 16px) !important;
      @include phone-only() {
        width: 100% !important;
      }
    }
  }
}

.checkbox {
    margin-top: 0 !important;
    padding-top: 2px !important;

  label.v-label {
    left: 10px !important;
  }

  .v-input--selection-controls__input .v-icon {
    color: $lightBlue;
  }
}

.toolbar-actions {
  position: fixed;
  bottom: 0;
  left: 0;

  .buttons {
    display: flex;
    justify-content: flex-end;
    padding-right: 160px;
    @include desktop-down() {
      padding-right: 24px;
    }

    .save-btn {
      margin-left: 16px;
    }
  }
}
</style>

<template>
  <div class="relative h-full w-full">
    <div class="padded-content">
      <div class="title-container">
        <NuxtLink to="/users" class="back">
          <div>{{ $t('editUser.backToManageUsers') }}</div>
        </NuxtLink>
        <h1>{{ $t('editUser.title') }}</h1>
      </div>
      <v-progress-circular v-if="!initUserData" indeterminate />
      <div v-else>
        <div class="tabs mt-5">
          <v-tabs v-model="tab">
            <v-tab>{{ $t('editUser.personalSettings') }}</v-tab>
            <v-tab>{{ $t('editUser.changePassword') }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <div class="grid edit-form">
                <div class="grid col-sm-12 col-md-8">
                  <div class="grid grid-nogutter col-4">
                    <label> {{ $t('editUser.section.details') }}</label>
                  </div>
                  <div class="grid col-sm-12 col-md-8">
                    <TextInput
                      label="First name"
                      disabled
                      :value="userData.user.firstName"
                      class="pl-0 pt-0 col-sm-12 col-md-6"
                    />
                    <TextInput
                      label="Last name"
                      :value="userData.user.lastName"
                      disabled
                      class="pr-0 pt-0 pl-0 lastName col-sm-12 col-md-6"
                    />
                    <TextInput
                      label="Email address"
                      :value="userData.user.email"
                      disabled
                      class="px-0 col-12"
                    />
                  </div>
                  <div class="grid grid-nogutter mt-2 pt-0 col-sm-12 col-md-4">
                    <label>{{ $t('editUser.section.tenantRole') }}</label>
                  </div>
                  <div class="grid mt-2 col-sm-12 col-md-8">
                    <v-select
                      v-model="userData.user.accessType"
                      dense
                      outlined
                      :items="tenantRoles"
                      class="col-12"
                    />
                  </div>
                  <div class="grid grid-nogutter pt-0 col-sm-12 col-md-4 mt-2">
                    <label>{{ $t('editUser.section.mdRole') }}</label>
                  </div>

                  <div class="grid col-sm-12 col-md-8 mt-2">
                    <v-progress-circular
                      v-if="userAppProfile === null"
                      indeterminate
                      size="10"
                      width="1"
                      class="align-items-center justify-content-center"
                    />
                    <v-select
                      v-else
                      v-model="userAppProfile.accessType"
                      class="col-12"
                      dense
                      outlined
                      item-value="value"
                      item-text="label"
                      :items="mdRoles"
                    />
                  </div>
                </div>
              </div>
            </v-tab-item>
            <v-tab-item>
              <div class="grid edit-form">
                <div class="grid col-sm-12 col-md-7">
                  <div class="grid col-sm-12 col-md-4">
                    <label> {{ $t('editUser.section.changePassword') }}</label>
                  </div>
                  <div class="grid col-sm-12 col-md-8">
                    <ChangeUserPassword
                      ref="changeUserPassword"
                      :user-id="userData.user.id"
                      :user-name="userData.user.login"
                      class="col-12"
                      @valid="passwordValid = $event"
                      @discard="passwordChanged = $event"
                      @newPassword="newPassword = $event"
                    />
                  </div>
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
                  :disabled="!passwordValid || loading"
                  @click.native="changePassword"
                >
                  {{ $t('global.save') }}
                </ButtonSave>
              </template>
            </div>
          </ActionToolbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/common/TextInput'
import { areObjEqual, cloneObj, MD_NAME, NO_ACCESS } from '~/commons/utils'
import ButtonSecondary from '~/components/common/ButtonSecondary'
import ActionToolbar from '~/components/common/ActionToolbar'
import ChangeUserPassword from '~/components/common/users/ChangeUserPassword'
import ButtonSave from '~/components/common/ButtonSave'

const SETTINGS = 'settings'
const CHANGE_PASSWORD = 'change-password'

export default {
  components: {
    ButtonSave,
    ChangeUserPassword,
    ActionToolbar,
    ButtonSecondary,
    TextInput
  },
  layout: 'portal',
  data () {
    return {
      loading: false,
      appIds: [],
      mdId: '',
      initUserData: null,
      userData: null,
      userAppProfile: null,
      initUserAppProfile: null,
      tenantRoles: ['User', 'Admin'],
      mdRoles: [{
        label: NO_ACCESS,
        value: NO_ACCESS,
        id: NO_ACCESS
      }],
      tab: null,
      userChanged: false,
      newPassword: null,
      passwordChanged: false,
      passwordValid: false
    }
  },
  computed: {
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  watch: {
    $route () {
      this.changeTabByUrlParam()
    },
    currentTenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        this.$router.push('/users')
      }
    },
    userData: {
      handler () {
        this.userChanged = !areObjEqual(this.userData, this.initUserData)
      },
      deep: true
    },
    'userAppProfile.accessType': {
      handler () {
        this.userChanged = !areObjEqual(this.userAppProfile, this.initUserAppProfile)
      },
      deep: true
    }
  },
  async mounted () {
    this.changeTabByUrlParam()
    if (this.$route.query.appIds) {
      this.appIds = this.$route.query.appIds.split('&')
    }
    await this.loadUserData()
    this.userChanged = false
  },
  methods: {
    changeTabByUrlParam () {
      const { tab } = this.$route.query
      if (tab === SETTINGS) {
        this.tab = 0
      } else if (tab === CHANGE_PASSWORD) {
        this.tab = 1
      } else {
        this.tab = 0
      }
    },

    async loadUserData () {
      try {
        const userId = this.$route.params.user
        const userData = await this.$authAdapterService().getUserDatils(userId)
        this.userData = userData
        for (const appId of this.appIds) {
          const app = await this.$authAdapterService().getApplication(appId)
          if (app.name === MD_NAME) {
            this.mdId = app.id
            this.mdRoles = [...this.mdRoles, ...await this.$authAdapterService().getAccessTypes(appId)]
            const userAppProfile = await this.$authAdapterService().getUserApplicationProfile(userId, appId)
            if (userAppProfile[0] === undefined || userAppProfile[0].accessType === undefined) {
              this.userAppProfile = { accessType: NO_ACCESS }
            } else {
              this.userAppProfile = userAppProfile[0]
            }
            break
          }
        }
        this.initUserData = cloneObj(this.userData)
        this.initUserAppProfile = cloneObj(this.userAppProfile)
      } catch (error) {
        this.$toast.error('Could not load user data!', { icon: 'alert-outline' })
      }
    },

    discardUserChanges () {
      this.userChanged = false
      this.userData = cloneObj(this.initUserData)
      this.userAppProfile = cloneObj(this.initUserAppProfile)
    },

    discardPasswordChanges () {
      this.$refs.changeUserPassword.resetForm()
    },

    async changeUserData () {
      this.loading = true
      try {
        if (this.userData.user.accessType === 'Admin') {
          await this.$authAdapterService().makeTeamMemberAnAdmin(this.userData.user.id)
        } else if (this.userData.user.accessType === 'User') {
          await this.$authAdapterService().makeTeamMemberAnUser(this.userData.user.id)
        }
        const mdRole = this.mdRoles.find(mdRole => mdRole.label === this.userAppProfile.accessType)
        if (mdRole && mdRole.label !== NO_ACCESS) {
          await this.$authAdapterService().assignUserToApp(this.userData.user.id, mdRole.id, this.mdId)
        } else if (mdRole.label === NO_ACCESS) {
          await this.$authAdapterService().deleteUserFromApp(this.userData.user.id, this.mdId)
        }

        this.$toast.success(this.$t('editUser.toasts.saveUser.changed'), { icon: 'check' })
        await this.loadUserData()
      } catch (error) {
        console.error(error)
        this.$toast.error(this.$t('editUser.toasts.saveUser.error'), { icon: 'alert-outline' })
      } finally {
        this.loading = false
      }
    },

    async changePassword () {
      this.loading = true
      try {
        await this.$authAdapterService().changeUserPassword(this.userData.user.id, this.newPassword)
        this.$toast.success(this.$t('editUser.toasts.saveUser.changed'), { icon: 'check' })
        this.discardPasswordChanges()
        await this.loadUserData()
      } catch (error) {
        this.$toast.error(this.$t('editUser.toasts.saveUser.errorChanged'), { icon: 'alert-outline' })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.back {
  text-decoration: none;
  color: $brand-grey-500;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.05em;

  > * {
    margin-bottom: 24px;
  }
}

.lastName {
  @include tablet-down() {
    padding-left: 0px;
  }
}

.edit-form {
  label {
    word-break: break-word;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    font-weight: bold;
    padding-top: 12px;
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

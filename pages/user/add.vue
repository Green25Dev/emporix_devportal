<template>
  <div class="relative h-full w-full">
    <div class="padded-content">
      <div class="title-container">
        <NuxtLink to="/users" class="back">
          <div>{{ $t('editUser.backToManageUsers') }}</div>
        </NuxtLink>
        <h1>{{ $t('addUser.title') }}</h1>
      </div>
      <div class="grid edit-form">
        <div class="grid col-sm-12 col-md-8">
          <div class="grid col-sm-12 col-md-4">
            <label> {{ $t('editUser.section.details') }}</label>
          </div>
          <div class="grid col-sm-12 col-md-8">
            <TextInput
              v-model="userData.firstName"
              label="First name"
              class="px-0 col-sm-12 col-md-6"
              :errors="errors.firstName"
              required
              @input="setFirstNameError()"
            />
            <TextInput
              v-model="userData.lastName"
              label="Last name"
              class="lastName pr-0 col-sm-12 col-md-6"
              :errors="errors.lastName"
              required
              @input="setLastNameError()"
            />
            <TextInput
              v-model="userData.email"
              label="Email address"
              :errors="errors.email"
              required
              class="px-0 col-12"
              @input="setEmailError()"
            />
          </div>
          <div class="grid col-sm-12 col-md-4">
            <label>{{ $t('editUser.section.tenantRole') }}</label>
          </div>
          <div class="grid col-sm-12 col-md-8">
            <v-select
              v-model="userData.accessType"
              dense
              outlined
              :items="tenantRoles"
              class="col-sm-12 col-md-6 pt-3"
            />
          </div>
          <div class="grid col-sm-12 col-md-4 mt-5">
            <label>{{ $t('editUser.section.mdRole') }}</label>
          </div>

          <div class="grid col-sm-12 col-md-8 mt-5">
            <v-select
              v-model="userData.mdRole"
              class="col-sm-12 col-md-6 pt-3"
              dense
              outlined
              item-value="value"
              item-text="label"
              :items="mdRoles"
            />
          </div>
        </div>
      </div>
    </div>

    <ActionToolbar class="toolbar-actions">
      <div class="buttons">
        <ButtonSecondary
          theme="dark"
          :disabled="!userDataChanged || loading"
          @click.native="discard"
        >
          {{ $t('global.discard') }}
        </ButtonSecondary>
        <ButtonSave
          class="save-btn"
          :disabled="!userDataChanged || !isFormValid() || loading"
          @click.native="saveUser"
        >
          {{ $t('global.save') }}
        </ButtonSave>
      </div>
    </ActionToolbar>
  </div>
</template>

<script>
import TextInput from '~/components/common/TextInput'
import { areObjEqual, cloneObj, MD_NAME } from '~/commons/utils'
import ButtonSecondary from '~/components/common/ButtonSecondary'
import ActionToolbar from '~/components/common/ActionToolbar'
import ButtonSave from '~/components/common/ButtonSave'

export default {
  components: {
    ActionToolbar,
    ButtonSecondary,
    ButtonSave,
    TextInput
  },
  layout: 'portal',
  data () {
    return {
      mdId: '',
      appIds: [],
      initUserData: null,
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        accessType: 'User',
        mdRole: null
      },
      tenantRoles: ['User', 'Admin'],
      mdRoles: [{
        label: 'No Access',
        value: null,
        id: null
      }],
      userDataChanged: false,
      errors: {
        firstName: [],
        lastName: [],
        email: []
      },
      loading: false
    }
  },
  watch: {
    userData: {
      handler () {
        this.userDataChanged = !areObjEqual(this.userData, this.initUserData)
      },
      deep: true
    }
  },
  async mounted () {
    this.initUserData = cloneObj(this.userData)
    if (this.$route.query.appIds) {
      this.appIds = this.$route.query.appIds.split('&')
    }
    await this.loadUserData()
  },
  methods: {
    async loadUserData () {
      this.loading = true
      try {
        for (const appId of this.appIds) {
          const app = await this.$authAdapterService().getApplication(appId)
          if (app.name === MD_NAME) {
            this.mdId = app.id
            this.mdRoles = [{
              label: 'No Access',
              value: null
            }, ...await this.$authAdapterService().getAccessTypes(appId)]
            break
          }
        }
      } catch (error) {}
      this.loading = false
    },
    isFirstNameValid () {
      return this.userData.firstName.length > 0
    },
    isLastNameValid () {
      return this.userData.lastName.length > 0
    },
    isEmailValid () {
      const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      return emailRegex.test(this.userData.email)
    },
    setFirstNameError () {
      if (!this.isFirstNameValid()) {
        this.errors.firstName = [{ msg: 'users.validation.reqName' }]
        return
      }
      this.errors.firstName = []
    },
    setLastNameError () {
      if (!this.isLastNameValid()) {
        this.errors.lastName = [{ msg: 'users.validation.reqLastName' }]
        return
      }
      this.errors.lastName = []
    },
    setEmailError () {
      if (!this.isEmailValid()) {
        this.errors.email = [{ msg: 'users.validation.reqEmail' }]
        return
      }
      this.errors.email = []
    },
    isFormValid () {
      return (
        this.isFirstNameValid() &&
        this.isLastNameValid() &&
        this.isEmailValid()
      )
    },
    discard () {
      this.userData = cloneObj(this.initUserData)
      this.errors.firstName = []
      this.errors.lastName = []
      this.errors.email = []
      this.userDataChanged = false
    },
    saveUser () {
      if (this.isFormValid()) {
        this.createTeamMember()
      }
    },
    async createTeamMember () {
      this.loading = true
      try {
        const user = {
          isAdmin: this.userData.accessType === 'Admin',
          email: this.userData.email,
          firstName: this.userData.firstName,
          lastName: this.userData.lastName
        }
        const userResponse = await this.$authAdapterService().addUser(user)
        const mdRole = this.mdRoles.find(mdRole => mdRole.label === this.userData.mdRole)
        if (mdRole) {
          await this.$authAdapterService().assignUserToApp(userResponse.id, mdRole.id, this.mdId)
        }
        this.$toast.success(this.$t('users.toasts.createTeamMember.success', { userEmail: user.email }), { icon: 'check' })
        this.$router.push('/users')
      } catch (error) {
        console.error(error)
        this.$toast.error(this.$t('users.toasts.createTeamMember.error'), { icon: 'alert-outline' })
      }
      this.loading = false
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
    padding-left: 0;
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

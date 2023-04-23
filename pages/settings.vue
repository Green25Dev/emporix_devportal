<template>
  <div v-if="loading">
    <v-progress-circular color="#2F3270" indeterminate />
  </div>
  <PortalContentCard v-else>
    <h4 class="title">
      {{ $t('settings.title') }}
    </h4>
    <form id="settings" class="settings-form" novalidate @submit.prevent="saveChanges">
      <v-row>
        <v-col class="left-column col-3">
          {{ $t('settings.details.title') }}
        </v-col>
        <v-col class="col-9">
          <v-row>
            <TextInput
              v-model="tenantDetails.company.name"
              type="text"
              class="text-input col-12"
              :label="$t('settings.details.companyName')"
              :disabled="accessType === accessTypes.USER"
              required
              @input="submitEnabler"
            />
          </v-row>
        </v-col>
      </v-row>
      <v-row class="disable-until-api-allow-deletion">
        <v-col class="left-column col-3">
          {{ $t('settings.tenantManagement.title') }}
        </v-col>
        <v-col class="col-7">
          <Button
            type="button"
            :theme="'warning-ghost'"
            :label="$t('settings.tenantManagement.button')"
            @click.native="deleteTenant"
          />
        </v-col>
      </v-row>
    </form>
    <Button
      form="settings"
      class="button-save"
      :label="$t('settings.button')"
      :disabled="!changed || accessType === accessTypes.USER"
    />
  </PortalContentCard>
</template>

<script>
import TextInput from '~/components/common/TextInput'
import Button from '~/components/common/Button'
import PortalContentCard from '~/components/portal/PortalContentCard'
import { accessTypes } from '~/commons/accessTypes'

export default {
  components: {
    TextInput,
    Button,
    PortalContentCard
  },
  layout: 'portal',
  data () {
    return {
      loading: true,
      tenantDetails: {
        company: {
          name: ''
        }
      },
      changed: false,
      accessTypes
    }
  },
  computed: {
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    },
    accessType () {
      return this.$store.getters['auth/getAccessType']()
    }
  },
  watch: {
    async currentTenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        this.tenantDetails.company.name = ''
        await this.fetchTenantDetails()
      }
    }
  },
  async mounted () {
    await this.fetchTenantDetails()
    this.loading = false
  },
  methods: {
    submitEnabler () {
      this.changed = true
    },
    deleteTenant () {
      console.log('connect tenant deletion')
    },
    async fetchTenantDetails () {
      try {
        const details = await this.$authAdapterService().getTenantDetails()
        this.tenantDetails = { ...details }
      } catch (error) {
        this.$toast.error('Details not fetched properly', { icon: 'alert-outline' })
      }
    },
    async saveChanges () {
      try {
        await this.$authAdapterService().updateTenantDetails(this.tenantDetails)
        this.$toast.success('Tenant details updated!', { icon: 'check' })
      } catch (error) {
        this.$toast.error('Sorry, there was a problem during the details updating', { icon: 'alert-outline' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.settings-form {
  flex-grow: 1;
  @include phone-only() {
    flex-grow: 0;
  }
}

.left-column {
  font-size: 18px;
  font-weight: bold;
}

.button-save {
  margin-top: 32px;
  align-self: flex-start;
}

.disable-until-api-allow-deletion {
  display: none;
}
</style>

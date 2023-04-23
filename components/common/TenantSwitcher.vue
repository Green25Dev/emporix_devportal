<template>
  <div class="tenant-dropdown">
    <div v-if="loading" class="grid align-items-center justify-content-center spinner">
      <v-progress-circular color="#2F3270" size="12" indeterminate />
    </div>
    <div v-else>
      <Dropdown
        v-if="tenantOptions.length > 0"
        ref="tenant-dropdown"
        :options="tenantOptions"
        :value="currentTenant.tenant"
        bold
        @select="switchTenant"
      >
        <template #actions>
          <div class="dropdown-option add-tenant" @click="addNewTenant">
            <AddIcon :color="'#596168'" />
            {{ $t('tenantSwitcher.addTenant') }}
          </div>
          <div class="dropdown-option add-tenant" @click="editTenant">
            <img src="/icons/pencil-black.svg">
            {{ $t('tenantSwitcher.editTenant') }}
          </div>
        </template>
      </Dropdown>
      <div v-else>
        <Button label="Create tenant" class="dashboard-button" @click.native="addNewTenant()" />
      </div>
    </div>
  </div>
</template>
<script>
import Dropdown from '~/components/common/Dropdown'
import AddIcon from '~/components/icons/AddIcon'
import Button from '~/components/common/Button'

export default {
  components: {
    Button,
    AddIcon,
    Dropdown
  },
  data () {
    return {
      loading: true,
      tenantOptions: [],
      tenants: []
    }
  },
  computed: {
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  created () {
    this.$nuxt.$on('refreshTenantSwitcher', () => {
      this.fetchTenants()
      this.$forceUpdate()
    })
  },
  async mounted () {
    await this.fetchTenants()
    this.loading = false
  },
  methods: {
    addNewTenant () {
      this.$router.push('/tenant/name')
    },
    editTenant () {
      if (this.currentTenant === undefined) {
        this.$router.push('/manage-tenants')
      }
      this.$router.push(`/tenant/${this.currentTenant.tenant}`)
      this.$refs['tenant-dropdown'].toggleExpand()
    },
    async fetchTenants () {
      try {
        const tenants = await this.$authAdapterService().getTenants()
        this.tenants = tenants
        this.tenantOptions = tenants.map(({ tenant }) => ({
          label: tenant,
          value: tenant
        }))
        if (this.currentTenant === undefined) {
          console.log('No current tenant, choosing first one from the call')
          await this.$store.dispatch('auth/chooseTenant', tenants[0])
        }
        if (tenants.length === 0) {
          this.$router.push('/tenant/name')
        }
        await this.$store.dispatch('auth/setTenants', tenants)
      } catch (error) {
        console.error('Applications not fetched properly', error)
      }
    },
    switchTenant (tenantName) {
      const tenantData = this.tenants.filter(signleTenant => signleTenant.tenant === tenantName.value)[0]
      this.$store.dispatch('auth/chooseTenant', {
        ...tenantData
      })
    }
  }
}
</script>

<style lang="scss">
.tenant-dropdown {
  border: 2px solid #000000;
  min-width: 200px;
  .spinner {
    margin-top: 0;
    height: 36px;
  }
}
.add-tenant {
  font-weight: normal !important;
  color: $brand-grey-600;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    width: 17px;
    margin-right: 8px;
  }
  img {
    margin-right: 6px;
  }

  &:hover {
    background: $brand-grey-100;
  }

}
</style>

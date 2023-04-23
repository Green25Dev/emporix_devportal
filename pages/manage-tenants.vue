<template>
  <div class="padded-content">
    <div class="title-container">
      <h1>{{ $t('manageTenants.title') }}</h1>
    </div>
    <div class="tenants">
      <TenantCard
        v-for="tenant in tenants"
        :key="tenant.tenant"
        :tenant="tenant"
        :selected="tenant.tenant === currentTenant().tenant"
        @click.native="goToTenantSettings(tenant.tenant)"
      />
      <NuxtLink to="/tenant/name" class="add-tenant-link cursor-pointer">
        <div class="add-tenant mt-4">
          <img src="/icons/add.svg">
          <label>{{ $t('manageTenants.addTenant') }}</label>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import TenantCard from '~/components/common/TenantCard'

export default {
  components: { TenantCard },
  layout: 'portal',
  data () {
    return {
      tenant: {
        name: 'MPREIS'
      }
    }
  },
  computed: {
    ...mapGetters({
      tenants: 'auth/getTenants',
      currentTenant: 'auth/getTenant'
    })
  },
  methods: {
    goToTenantSettings (tenant) {
      this.$router.push(`/tenant/${tenant}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.title-container {
  padding-bottom: 24px;
  margin-bottom: 48px;
  border-bottom: 1px solid $brand-grey-400;
}

.tenants {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .add-tenant-link {

    .add-tenant {
      cursor: pointer;
      position: relative;
      width: 264px;
      height: 296px;
      background: linear-gradient(180deg, #4DB1FD 0%, #128AFB 100%);
      border: 2px solid $brand-blue-500;
      padding: 65px;
      display: flex;
      flex-direction: column;
    }
  }

  label {
    margin-top: 48px;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

  }

  > * {
    margin-right: 48px;
    text-decoration: none;
  }
}
</style>

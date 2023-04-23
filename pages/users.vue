<template>
  <div class="pb-6 padded-content">
    <div class="title-container">
      <h1>{{ $t('users.title') }}</h1>
    </div>
    <div class="tabs">
      <v-tabs v-if="tab !== null" v-model="tab">
        <v-tab>{{ $t('users.tenant') }}</v-tab>
        <v-tab v-for="app in applications" :key="app.id" value="app.id">
          {{ app.details.label }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <Tenant :app-ids="appIdsQuery" />
        </v-tab-item>
        <v-tab-item v-for="app in applications" :key="app.id">
          <AppUsers
            :app-ids="appIdsQuery"
            :app-id="app.id"
            :app-name="app.details.label"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>
<script>

import Tenant from '~/components/common/users/tenant'
import AppUsers from '~/components/common/users/app-users'
import { USER_TABS_KEY } from '~/commons/utils'

const TENANT = 'tenant'
const MANAGEMENT = 'management-dashboard'

export default {
  components: {
    Tenant,
    AppUsers
  },
  layout: 'portal',
  data () {
    return {
      tab: null,
      applications: []
    }
  },
  computed: {
    appIdsQuery () {
      return this.applications.map(app => app.id).join('&')
    },
    tenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  watch: {
    tab (tabValue) {
      localStorage.setItem(USER_TABS_KEY, tabValue)
    },
    async tenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        await this.loadData()
      }
    },
    $route () {
      this.changeTabByUrlParam()
    }
  },
  async mounted () {
    this.changeTabByUrlParam()
    await this.loadData()
  },
  methods: {
    changeTabByUrlParam () {
      const { tab } = this.$route.query
      if (tab === TENANT) {
        this.tab = 0
      } else if (tab === MANAGEMENT) {
        this.tab = 1
      } else {
        this.tab = 0
      }
    },
    async loadData () {
      await this.fetchApplications()
      const tabFromStorage = localStorage.getItem(USER_TABS_KEY)
      if (tabFromStorage) {
        this.tab = parseInt(tabFromStorage)
      } else {
        this.tab = 0
      }
    },
    async fetchApplications () {
      try {
        this.applications = await this.$authAdapterService().getApplications()
      } catch (error) {
        this.$toast.error('Sorry, applications were not fetched properly', { icon: 'alert-outline' })
        console.error('Could not fetch applications', error)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.greetings {
  font-size: 32px;
  line-height: 38px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid $brand-grey-400;
  max-width: 960px;
  @include phone-only() {
    font-size: 28px;
    background-color: white;
    margin-bottom: 0;
  }
}

.users-container {
  padding: 32px 0;
}

</style>

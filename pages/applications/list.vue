<template>
  <div v-if="loading">
    <v-progress-circular color="#2F3270" indeterminate />
  </div>
  <PortalContentCard v-else>
    <h4 class="title">
      {{ $t('applications.title') }}
    </h4>
    <v-data-table
      :headers="headers"
      :items="applications"
      :disable-sort="true"
      class="applications-grid hidden md:block"
      :items-per-page="itemsPerPage"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-page-first',
        lastIcon: 'mdi-page-last',
        itemsPerPageText: 'Items per page'
      }"
      @page-count="pageCount = $event"
    >
      <template #item.name="{ item }">
        <div class="font-bold">
          {{ item.name }}
        </div>
      </template>
      <template #item.credentials="{ item }">
        <div v-if="item.credentials !== undefined">
          <Credentials
            :client-id="item.credentials.clientId"
            :client-secret="item.credentials.clientSecret"
            @renewed="keysRenewed()"
          />
        </div>
      </template>
      <template #item.actions="{ item }">
        <div class="flex justify-content-end">
          <NuxtLink v-if="item.id !== undefined" class="action-link" :to="'/applications/app?appId='+item.id">
            <ManageAppIcon />
            <div> {{ $t('applications.manage') }} </div>
          </NuxtLink>
        </div>
      </template>
    </v-data-table>
    <MobileApplicationList class="md:hidden" :applications="applications" />
  </PortalContentCard>
</template>

<script>

import PortalContentCard from '~/components/portal/PortalContentCard'
import ManageAppIcon from '~/components/icons/ManageAppIcon'
import Credentials from '~/components/portal/applications/Credentials'
import MobileApplicationList from '~/components/portal/applications/MobileApplicationList'

export default {
  components: {
    MobileApplicationList,
    Credentials,
    ManageAppIcon,
    PortalContentCard
  },
  layout: 'portal',
  data () {
    return {
      loading: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      applications: [],
      headers: [
        {
          text: 'Name',
          value: 'name'
        }, {
          text: '',
          value: 'credentials'
        },
        {
          value: 'actions',
          sortable: false
        }
      ]
    }
  },
  computed: {
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  watch: {
    async currentTenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        this.applications = []
        await this.fetchApplications()
      }
    }
  },
  async mounted () {
    await this.fetchApplications()
  },
  methods: {
    async fetchApplications () {
      try {
        this.applications = await this.$authAdapterService().getApplications()
        this.loading = false
      } catch (error) {
        this.$toast.error('Sorry, applications were not fetched properly', { icon: 'alert-outline' })
        console.error('Could not fetch applications', error)
        this.loading = false
      }
    },
    async keysRenewed () {
      await this.fetchApplications()
    }
  }
}
</script>

<style lang="scss">
h2 {
  font-family: Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
}

.light-blue-test {
  color: $lightBlue
}

.overview-container {
  display: flex;
  flex-direction: column;

  > * {
    margin-bottom: 20px;
  }
}

.v-data-table {
  table {
    tbody {
      font-family: Lato, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
    }
  }
}
</style>

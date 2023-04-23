<template>
  <div v-if="loading" class="padded-content flex justify-content-center p-3">
    <v-progress-circular color="#2F3270" indeterminate />
  </div>
  <div v-else class="padded-content">
    <div class="title-container">
      <h1><span class="title-name-highlight">{{ currentTenant.tenant }}</span> {{ $t('applications.title') }}</h1>
    </div>
    <v-tabs v-model="tab">
      <v-tab>{{ $t('applications.tabs.manage') }}</v-tab>
      <v-tab>{{ $t('applications.tabs.quick') }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div>
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
            <template #item.clientId="{ item }">
              <div v-if="item.clientId !== undefined">
                <Credentials
                  :client-id="item.clientId"
                  :client-secret="item.clientSecret"
                />
              </div>
            </template>
            <template #item.credentials="{ item }">
              <div v-if="item.credentials !== undefined">
                <ClientSecret
                  :client-secret="item.credentials.clientSecret"
                  :client-id="item.credentials.clientId"
                  @renewed="keysRenewed()"
                />
              </div>
            </template>
            <template #item.actions="{ item }">
              <div
                class="flex justify-content-end align-items-center cursor-pointer actions"
                @click="goToExample(item)"
              >
                <div>
                  GET STARTED
                </div>
                <div>
                  <img src="/icons/arrow-right-blue.svg">
                </div>
              </div>
            </template>
          </v-data-table>
          <div class="sm:block md:hidden">
            <v-data-table
              :headers="mobileHeaders"
              :items="applications"
              :disable-sort="true"
              class="applications-grid"
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
                <MobileListItem>
                  <template slot="content">
                    <div class="font-bold">
                      {{ item.name }}
                    </div>
                  </template>
                  <template slot="item-actions">
                    <div class="grid grid-nogutter">
                      <div class="col-12">
                        <Credentials
                          :client-id="item.clientId"
                          :client-secret="item.clientSecret"
                        />
                      </div>
                      <div class="col-12">
                        <ClientSecret
                          :client-secret="item.credentials.clientSecret"
                          :client-id="item.clientId"
                          @renewed="keysRenewed()"
                        />
                      </div>
                      <div class="col-12">
                        <div
                          class="flex justify-content-end align-items-center cursor-pointer actions"
                          @click="goToExample(item)"
                        >
                          <div>
                            GET STARTED
                          </div>
                          <div>
                            <img src="/icons/arrow-right-blue.svg">
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </MobileListItem>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <Example :credentials="currentCredentials" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>

import Credentials from '~/components/portal/applications/Credentials'
import ClientSecret from '~/components/portal/applications/ClientSecret'
import Example from '~/components/portal/applications/Example'
import MobileListItem from '~/components/common/MobileListItem'

const LIST = 'list'
const EXAMPLES = 'examples'

export default {
  components: {
    MobileListItem,
    Example,
    ClientSecret,
    Credentials
  },
  layout: 'portal',
  data () {
    return {
      currentClientId: 'clientId',
      currentSecret: 'clientSecret',
      currentAppName: 'appName',
      tab: null,
      loading: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      applications: [],
      mobileHeaders: [{ value: 'name' }],
      headers: [
        {
          text: 'App',
          value: 'name'
        },
        {
          text: 'Client ID',
          value: 'clientId'
        },
        {
          text: 'Secret',
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
    currentCredentials () {
      return {
        clientId: this.currentClientId,
        clientSecret: this.currentSecret,
        appName: this.currentAppName
      }
    },
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },

  watch: {
    async currentTenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        this.applications = []
        await this.fetchApis()
        this.setCurrent()
      }
    },
    $route () {
      this.changeTabByUrlParam()
    }
  },
  async mounted () {
    this.changeTabByUrlParam()
    this.applications = []
    await this.fetchApis()
    this.setCurrent()
  },
  methods: {
    changeTabByUrlParam () {
      const { tab } = this.$route.query
      if (tab === LIST) {
        this.tab = 0
      } else if (tab === EXAMPLES) {
        this.tab = 1
      } else {
        this.tab = 0
      }
    },
    setCurrent () {
      if (this.applications.length > 0) {
        this.currentSecret = this.applications[0].credentials.clientSecret
        this.currentClientId = this.applications[0].credentials.clientId
        this.currentAppName = this.applications[0].name
      }
    },
    async fetchApis () {
      try {
        this.applications = await this.$authAdapterService().getApis()
        this.loading = false
      } catch (error) {
        this.$toast.error('Sorry, applications were not fetched properly', { icon: 'alert-outline' })
        console.error('Could not fetch applications', error)
        this.loading = false
      }
    },
    async keysRenewed () {
      await this.fetchApis()
    },
    goToExample (item) {
      this.currentSecret = item.credentials.clientSecret
      this.currentClientId = item.credentials.clientId
      this.currentAppName = item.name
      this.tab = 1
    }
  }
}
</script>

<style lang="scss" scoped>
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

.actions {
  color: $brand-grey-400;
  font-weight: 900;
  font-size: 14px;
}

.action-link {
  a {
    text-decoration: none !important;
  }

}
</style>

<template>
  <div v-if="loading" class="flex justify-content-center p-3">
    <v-progress-circular color="#2F3270" indeterminate />
  </div>
  <div v-else>
    <div class="pt-5">
      <div v-admin-only>
        <NuxtLink :to="'/applications/add-user?appId=' + appIds" class="add-user-button">
          <ButtonPrimary label="">
            <img src="~/static/icons/plus-white.svg">
            {{ $t('users.addUser') }}
          </ButtonPrimary>
        </NuxtLink>
      </div>
      <div class="search-bar grid grid-nogutter align-items-center">
        <TextInput
          v-model="search"
          :searchicon="true"
          :placeholder="$t('applications.app.search.placeholder')"
          class="col-sm-12 col-md-3"
          novalidate
        />
      </div>
      <div class="grid grid-nogutter my-6 pl-2 align-items-center just">
        <span class="show-label font-bold">{{ $t('App Role') }}</span>
        <div class="cursor-pointer user-filter grid grid-nogutter justify-content-center align-items-center">
          <input id="all" v-model="showUsers" type="radio" value="All">
          <label for="all">{{ $t('tenant.team.table.all') }}</label>
        </div>
        <div
          v-for="accessType in accessTypes"
          :key="accessType.value"
          class="cursor-pointer user-filter  grid grid-nogutter justify-content-center align-items-center"
        >
          <input :id="accessType.value" v-model="showUsers" type="radio" :value="accessType.value">
          <label :for="accessType.value">{{ accessType.label }}</label>
        </div>
      </div>

      <div class="hidden md:block">
        <v-data-table
          :headers="headers"
          :items="visibleUsers"
          :search="search"
          class="applications-grid col-12 p-0"
          :items-per-page="itemsPerPage"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-page-first',
            lastIcon: 'mdi-page-last',
            itemsPerPageText: 'Items per page'
          }"
          @page-count="pageCount = $event"
        >
          <template #item.actions="{ item }">
            <div class="actions flex justify-content-end">
              <NuxtLink v-admin-only :to="'/user/'+item.id+'?appIds='+appIds">
                <img src="/icons/pencil-black.svg">
              </NuxtLink>
              <img v-if="item.id !== undefined" v-admin-only src="/icons/delete.svg" @click="deleteUser(item)">
            </div>
          </template>
        </v-data-table>
      </div>
      <div class="block md:hidden">
        <v-data-table
          :headers="mobileHeaders"
          :items="visibleUsers"
          :search="search"
          :hide-default-header="true"
          class="applications-grid col-12 p-0"
          :items-per-page="itemsPerPage"
          :disable-sort="true"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-page-first',
            lastIcon: 'mdi-page-last',
            itemsPerPageText: 'Items per page'
          }"
          @page-count="pageCount = $event"
        >
          <template #item.name="{item}">
            <MobileListItem>
              <template slot="content">
                <div class="grid grid-nogutter p-2">
                  <div class="col-12 label-1 font-bold">
                    {{ item.firstName }} {{ item.lastName }}
                  </div>
                  <div class="col-12 label-1">
                    {{ item.email }}
                  </div>
                </div>
              </template>
              <template slot="item-actions">
                <div class="grid grid-nogutter p-2">
                  <div class="grid grid-nogutter col-6">
                    <div class="grid grid-nogutter">
                      <div class="grid grid-nogutter col-12">
                        <div class="col-12 label-1 label-gray">
                          Role
                        </div>
                      </div>
                      <div class="grid grid-nogutter col-12">
                        <div class="col-12 label-1">
                          {{ item.accessType }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-nogutter col-6">
                    <div v-admin-only class="actions mobile-actions flex justify-content-end align-self-end">
                      <NuxtLink :to="'/user/'+item.id+'?appIds='+appIds">
                        <img src="/icons/pencil-black.svg">
                      </NuxtLink>
                      <img v-if="item.id !== undefined" v-admin-only src="/icons/delete.svg" @click="deleteUser(item)">
                    </div>
                  </div>
                </div>
              </template>
            </MobileListItem>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '~/components/common/TextInput'
import { openModal } from '~/plugins/modal-service'
import ConfirmBox from '~/components/common/ConfirmBox'
import ButtonPrimary from '~/components/common/ButtonPrimary'
import MobileListItem from '~/components/common/MobileListItem'

export default {
  name: 'AppUsers',
  components: {
    MobileListItem,
    TextInput,
    ButtonPrimary
  },
  layout: 'portal',
  props: ['appId', 'appIds'],
  data () {
    return {
      loading: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      showUsers: 'All',
      visibleUsers: [],
      accessTypes: [],
      appName: '',
      search: '',
      users: [],
      mobileHeaders: [
        {
          value: 'name'
        }
      ],
      headers: [
        {
          text: this.$t('users.tableManagementHeaders.name'),
          value: 'name'
        },
        {
          text: this.$t('users.tableManagementHeaders.email'),
          value: 'email'
        },
        {
          text: this.$t('users.tableManagementHeaders.accessType'),
          value: 'accessType'
        },
        {
          text: '',
          value: 'actions'
        }
      ]
    }
  },
  computed: {
    accessType () {
      return this.$store.getters['auth/getAccessType']()
    },
    tenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  watch: {
    async tenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        await this.loadData()
      }
    },
    showUsers (newShowUserFilter) {
      if (newShowUserFilter === 'All') {
        this.visibleUsers = this.users
      } else {
        this.visibleUsers = this.users.filter(user => user.accessType === newShowUserFilter)
      }
    }
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    async loadData () {
      this.loading = true
      try {
        await this.fetchApp(this.appId)
        if (this.accessType === 'Admin') {
          await this.fetchAccessTypes(this.appId)
        }
        await this.fetchAppUsers(this.appId)
      } catch (e) {
        this.loading = false
      }
      this.loading = false
    },
    async fetchApp (appId) {
      try {
        const { name } = await this.$authAdapterService().getApplication(appId)
        this.appName = name
      } catch (error) {
        this.$toast.error(this.$t('users.toasts.fetchApp.error'), { icon: 'alert-outline' })
      }
    },
    async fetchAccessTypes (appId) {
      try {
        this.accessTypes = [...await this.$authAdapterService().getAccessTypes(appId)]
      } catch (error) {
        this.$toast.error(this.$t('users.toasts.fetchAccessTypes.error'), { icon: 'alert-outline' })
      }
    },
    async fetchAppUsers (appId) {
      try {
        this.users = await this.$authAdapterService().getAppUsers(appId)
        this.visibleUsers = this.users
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$toast.error(this.$t('users.toasts.fetchAppUsers.error'), { icon: 'alert-outline' })
      }
    },

    async deleteUser ({
      id,
      name
    }) {
      const confirmation = await openModal(ConfirmBox, {
        header: this.$t('users.toasts.deleteUser.header', { name }),
        text: this.$t('users.toasts.deleteUser.text')
      })
      if (confirmation) {
        try {
          await this.$authAdapterService().deleteUserFromApp(id, this.appId)
          await this.fetchAppUsers(this.appId)
        } catch (error) {
          this.$toast.error(this.$t('users.toasts.deleteUser.error'), { icon: 'alert-outline' })
        }
      }
    },
    async changeAccessType (newAccessType, {
      id,
      name
    }) {
      const confirmation = await openModal(ConfirmBox, {
        header: this.$t('users.toasts.changeAccessType.header', {
          name,
          accessType: newAccessType.value
        }),
        text: this.$t('users.toasts.changeAccessType.text')
      })
      if (confirmation) {
        try {
          await this.$authAdapterService().changeUserAccessType(id, newAccessType.id, this.appId)
          await this.fetchAppUsers(this.appId)
        } catch (error) {
          this.$toast.error(this.$t('users.toasts.changeAccessType.error'), { icon: 'alert-outline' })
        }
      } else {
        this.users = []
        this.fetchAppUsers(this.appId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.user-filter {
  margin-left: 16px;

  label {
    margin-left: 4px;
  }
}

.show-label {
  color: $brand-grey-400;
  font-size: 14px;
}

.search-bar {
  margin: 49px 0 14px 0;
}

.add-user-button {
  text-decoration: none;
}

.search-bar {
  margin-bottom: 14px;
}

.back-to-apps-icon {
  margin-right: 8px;
}

.accessType {
  margin-top: 8px;
}

.v-data-table .v-data-table__wrapper table tbody .v-data-table__mobile-table-row .v-data-table__mobile-row {
  border-bottom: none !important;
}

</style>

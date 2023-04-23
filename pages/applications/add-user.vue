<template>
  <div class="padded-content">
    <div class="title-container">
      <NuxtLink to="/users" class="back">
        <div>{{ $t('editUser.backToManageUsers') }}</div>
      </NuxtLink>
      <h1>{{ $t('addUser.title') }}</h1>
    </div>

    <div v-if="loading" class="flex justify-content-center p-3">
      <v-progress-circular color="#2F3270" indeterminate />
    </div>
    <div v-else>
      <div class="search-bar grid grid-nogutter align-items-center">
        <TextInput
          v-model="search"
          :searchicon="true"
          :placeholder="$t('applications.app.search.placeholder')"
          class="col-sm-12 col-md-3"
          novalidate
        />
      </div>
      <div class="hidden md:block">
        <v-data-table
          :headers="headers"
          :items="teamMembers"
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
          <template #item.accessType="{ item }">
            <div class="accessType">
              <div v-if="accessTypes.length > 0" class="select">
                <Dropdown
                  light-border
                  no-avatar
                  :options="accessTypes"
                  :value="accessTypes[0].value"
                  @select="addAccessTypeToAssignableUser($event,item)"
                />
              </div>
            </div>
          </template>
          <template #item.actions="{ item }">
            <div class="actions flex justify-content-end">
              <div class="flex justify-content-end">
                <AssignUserIcon v-if="item.id !== undefined" @click.native="assignUser(item)" />
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
      <div class="block md:hidden">
        <v-data-table
          :headers="mobileHeaders"
          :items="teamMembers"
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
                          <div v-if="accessTypes.length > 0" class="select">
                            <Dropdown
                              no-avatar
                              light-border
                              :options="accessTypes"
                              :value="accessTypes[0].value"
                              @select="addAccessTypeToAssignableUser($event,item)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="grid grid-nogutter col-6">
                    <div class="actions mobile-actions flex justify-content-end align-self-end">
                      <div class="flex justify-content-end">
                        <AssignUserIcon v-if="item.id !== undefined" @click.native="assignUser(item)" />
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
  </div>
</template>

<script>
import Vue from 'vue'
import TextInput from '~/components/common/TextInput'
import AssignUserIcon from '~/components/icons/AssignUserIcon'
import { openModal } from '~/plugins/modal-service'
import ConfirmBox from '~/components/common/ConfirmBox'
import Dropdown from '~/components/common/Dropdown'
import MobileListItem from '~/components/common/MobileListItem'

export default {
  components: {
    MobileListItem,
    AssignUserIcon,
    TextInput,
    Dropdown
  },
  layout: 'portal',
  data () {
    return {
      mobileHeaders: [
        {
          value: 'name'
        }
      ],
      loading: true,
      appId: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      teamMembers: [],
      headers: [
        {
          text: 'Team member',
          value: 'name'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Access type',
          value: 'accessType'
        },
        {
          text: '',
          value: 'actions'
        }
      ],
      accessTypes: [],
      search: '',
      showUsers: 'All'
    }
  },
  computed: {
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  watch: {
    currentTenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        this.$router.push('/applications/list')
      }
    }
  },
  async mounted () {
    const { appId } = this.$route.query
    this.appId = appId
    await this.fetchAccessTypes()
    await this.fetchAssignables()
  },
  methods: {
    async fetchAccessTypes () {
      try {
        this.accessTypes = [...this.accessTypes, ...await this.$authAdapterService().getAccessTypes(this.appId)]
      } catch (error) {
        this.$toast.error('Sorry, access types were not fetched properly', { icon: 'alert-outline' })
      }
    },
    async fetchAssignables () {
      try {
        let users = await this.$authAdapterService().getAssignables(this.appId)
        users = users.map(user => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`
        }))
        this.teamMembers = users
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$toast.error('Sorry, assignable users were not fetched properly', { icon: 'alert-outline' })
      }
    },
    async assignUser ({
      accessType,
      name,
      id
    }) {
      if (accessType === undefined) {
        accessType = this.accessTypes[0]
      }
      const confirmation = await openModal(ConfirmBox, {
        header: `Assign ${name} with access type ${accessType.value}`,
        text: 'Are you sure you want to assign user?'
      })
      if (confirmation) {
        try {
          debugger
          await this.$authAdapterService().assignUserToApp(id, accessType.id, this.appId)
          await this.fetchAssignables()
        } catch (error) {
          console.error(error)
          this.$toast.error('Sorry, could not assign user to the application', { icon: 'alert-outline' })
        }
      }
    },
    addAccessTypeToAssignableUser ($event, item) {
      Vue.set(item, 'accessType', $event)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-user {
  display: flex;
  align-items: center;
  color: black;
  font-size: 16px;
  font-weight: bold;
}

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

.add-user:hover .add-user-icon {
  fill: black;
}

.name {
  font-weight: bold;
}

.status-cell {
  text-transform: capitalize;
  color: $gray;

  &.status-active {
    color: $validGreen
  }
}

.back-to-apps-icon {
  margin-right: 8px;
}

.show-label {
  color: $gray
}
</style>

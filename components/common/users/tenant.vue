<template>
  <div v-if="loading" class="flex justify-content-center">
    <v-progress-circular color="#2F3270" indeterminate />
  </div>
  <div v-else>
    <div class="pt-5">
      <div v-admin-only>
        <NuxtLink :to="'/user/add?appIds=' + appIds" class="add-user-button">
          <ButtonPrimary label="" class="">
            <img src="~/static/icons/plus-white.svg">
            {{ $t('users.addUser') }}
          </ButtonPrimary>
        </NuxtLink>
      </div>
    </div>

    <div class="search-bar grid grid-nogutter align-items-center">
      <TextInput
        v-model="search"
        :searchicon="true"
        :placeholder="$t('tenant.team.search.placeholder')"
        class="col-sm-12 col-md-4"
        novalidate
      />
    </div>
    <div class="grid grid-nogutter my-6 pl-2 align-items-center just">
      <span class="show-label font-bold">
        {{ $t('Tenant Role') }}
      </span>
      <div class="cursor-pointer user-filter grid grid-nogutter justify-content-center align-items-center">
        <input id="all" v-model="showUsers" type="radio" value="All">
        <label for="all">{{ $t('tenant.team.table.all') }}</label>
      </div>
      <div class="cursor-pointer user-filter  grid grid-nogutter justify-content-center align-items-center">
        <input id="admin" v-model="showUsers" type="radio" value="Admin">
        <label for="admin">{{ $t('tenant.team.table.admins') }}</label>
      </div>
      <div class="cursor-pointer user-filter  grid grid-nogutter justify-content-center align-items-center">
        <input id="users" v-model="showUsers" type="radio" value="User">
        <label for="users">{{ $t('tenant.team.table.users') }}</label>
      </div>
    </div>
    <div class="hidden md:block">
      <v-data-table
        :headers="headers"
        :items="visibleTeamMembers"
        item-key="id"
        class="users-table col-12 p-0"
        :search="search"
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
          <div class="name">
            {{ item.name }}
          </div>
        </template>
        <template #item.accessType="{item}">
          <div class="accessType">
            <div>
              {{ item.accessType }}
            </div>
          </div>
        </template>
        <template #item.status="{ item }">
          <div class="status-cell" :class="{'status-active': item.status === 'ACTIVE'}">
            {{ item.status }}
          </div>
        </template>
        <template #item.actions="{ item }">
          <div v-admin-only class="actions flex justify-content-end">
            <NuxtLink v-admin-only :to="'/user/'+item.id+'?appIds='+appIds">
              <img src="/icons/pencil-black.svg">
            </NuxtLink>
            <div class="inline-block">
              <LeaveIcon v-if="currentUserId === item.id" @click.native="leaveTenant()" />
              <img v-else v-admin-only src="/icons/delete.svg" @click="removeFromTenant(item)">
            </div>
          </div>
        </template>
      </v-data-table>
    </div>
    <div class="block md:hidden">
      <v-data-table
        :headers="mobileHeaders"
        :items="visibleTeamMembers"
        :hide-default-header="true"
        :search="search"
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
                <div class="col-12 font-bold">
                  {{ item.firstName }} {{ item.lastName }}
                </div>
                <div class="col-12">
                  {{ item.email }}
                </div>
              </div>
            </template>
            <template slot="item-actions">
              <div class="grid grid-nogutter p-2">
                <div class="grid grid-nogutter col-6">
                  <div class="grid grid-nogutter">
                    <div class="grid grid-nogutter col-12">
                      <div class="col-6 label-1 label-gray">
                        Role
                      </div>
                      <div class="col-6 label-1 label-gray">
                        Status
                      </div>
                    </div>
                    <div class="grid grid-nogutter col-12">
                      <div class="col-6 label-1">
                        {{ item.accessType }}
                      </div>
                      <div class="col-6 label-1 status-cell" :class="{'status-active': item.status === 'ACTIVE'}">
                        {{ item.status }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid grid-nogutter col-6">
                  <div v-admin-only class="actions mobile-actions flex justify-content-end align-self-end">
                    <NuxtLink :to="'/user/'+item.id+'?appIds='+appIds">
                      <img src="/icons/pencil-black.svg">
                    </NuxtLink>
                    <NuxtLink :to="'/user/'+item.id+'?appIds='+appIds+`&tab=change-password`">
                      <img src="/icons/lock.svg">
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
</template>

<script>
import TextInput from '~/components/common/TextInput'
import { openModal } from '~/plugins/modal-service'
import ConfirmBox from '~/components/common/ConfirmBox'
import ButtonPrimary from '~/components/common/ButtonPrimary'
import MobileListItem from '~/components/common/MobileListItem'
import LeaveIcon from '~/components/icons/LeaveIcon'

export default {
  name: 'Tenant',
  components: {
    LeaveIcon,
    MobileListItem,
    TextInput,
    ButtonPrimary
  },
  layout: 'portal',
  props: ['appIds'],
  data () {
    return {
      loading: true,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      pagesOptions: [5, 10, 15],
      visibleTeamMembers: [],
      mobileHeaders: [
        {
          value: 'name'
        }
      ],
      accessTypes: [
        {
          label: 'User',
          value: 'User'
        }, {
          label: 'Admin',
          value: 'Admin'
        }],
      teamMembers: [],
      headers: [
        {
          text: this.$t('users.tableTenantHeaders.teamMember'),
          value: 'name',
          width: '15%'
        },
        {
          text: this.$t('users.tableTenantHeaders.email'),
          value: 'email',
          width: '15%'
        },
        {
          text: this.$t('users.tableTenantHeaders.tenantRole'),
          value: 'accessType',
          width: '15%'
        },
        {
          text: this.$t('users.tableTenantHeaders.status'),
          value: 'status',
          width: '15%'
        },
        {
          text: '',
          value: 'actions',
          width: '10%'
        }
      ],
      search: '',
      showUsers: 'All'
    }
  },
  computed: {
    currentUserId () {
      return this.$store.getters['auth/getCurrentUserId']()
    },
    accessType () {
      return this.$store.getters['auth/getAccessType']()
    },
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  watch: {
    async currentTenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        this.visibleTeamMembers = []
        this.showUsers = 'All'
        await this.fetchTeamMembers()
      }
    },
    showUsers (newShowUserFilter) {
      if (newShowUserFilter === 'All') {
        this.visibleTeamMembers = this.teamMembers
      } else {
        this.visibleTeamMembers = this.teamMembers.filter(teamMember => teamMember.accessType === newShowUserFilter)
      }
    }
  },
  async mounted () {
    await this.fetchTeamMembers()
  },
  methods: {
    async fetchTeamMembers () {
      try {
        let users = await this.$authAdapterService().getUsers()
        users = users.map(user => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`
        }))
        this.teamMembers = users
        this.visibleTeamMembers = this.teamMembers
        this.loading = false
      } catch (error) {
        this.loading = false
        this.$toast.error('Sorry, team members were not fetched properly', { icon: 'alert-outline' })
      }
    },
    async changeAccessType (accessType, teamMember) {
      const { value } = accessType
      const confirmation = await openModal(ConfirmBox, {
        header: `Make ${teamMember.name} an ${accessType.value}`,
        text: 'Are you sure you want to change team member access type?'
      })

      if (confirmation) {
        try {
          if (value === 'Admin') {
            await this.$authAdapterService().makeTeamMemberAnAdmin(teamMember.id)
          } else {
            await this.$authAdapterService().makeTeamMemberAnUser(teamMember.id)
          }
        } catch (error) {
          this.$toast.error('Sorry, there was a problem during the managing a team member', { icon: 'alert-outline' })
        }
      }
      this.$nuxt.$loading.start()
      this.visibleTeamMembers = []
      await this.fetchTeamMembers()
      this.$nuxt.$loading.finish()
    },
    async removeFromTenant ({
      id,
      name
    }) {
      const confirmation = await openModal(ConfirmBox, {
        header: `Are you sure you want to remove ${name}?`,
        text: `${name} will lose all access to ${this.currentTenant.tenant}`
      })
      if (confirmation) {
        await this.$authAdapterService().removeFromTenant(id)
        await this.fetchTeamMembers()
      }
    },
    async leaveTenant () {
      const confirmation = await openModal(ConfirmBox, {
        header: 'Leave the team?',
        text: 'Are you sure you want to leave your team?'
      })
      if (confirmation) {
        try {
          await this.$authAdapterService().leaveTenant()
          const tenants = await this.$authAdapterService().getTenants()
          if (tenants.length > 0) {
            await this.$store.dispatch('auth/chooseTenant', tenants[0])
            await this.$router.push('/')
          } else {
            await this.$store.dispatch('auth/signOut', this.$config.DEV_PORTAL_LOGOUT)
            await this.$router.push('/team-settings')
          }
        } catch (error) {
          this.$toast.error('Sorry could not leave team. Please check if you are not the only admin!')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.add-user-button {
  text-decoration: none;
}

.search-bar {
  margin: 49px 0 14px 0;
}

.name {
  font-weight: bold;
}

.user-filter {
  margin-left: 16px;

  label {
    margin-left: 4px;
  }
}

.status-cell {
  text-transform: capitalize;
  color: $gray;

  &.status-active {
    color: $validGreen
  }
}

.show-label {
  color: $brand-grey-400;
  font-size: 14px;
}

.user-mobile-table {

}

.pagination {
  margin-top: 16px;
}

.light-blue-test {
  color: $lightBlue
}

</style>

<template>
  <div class="guides">
    <div v-for="(card, index) in cards" :key="index" v-if=" card.permission !== undefined ?   checkManageDemoDataPermission(authData.login, card.permission) : true"  class="card">
      <div class="img-wr">
        <img :src="'/icons/'+card.imageName" alt="title image" class="img">
      </div>
      <div class="text-wr">
        <div class="title-wr">
          <NuxtLink :to="card.to" class="headline-5 card-title">
            <LinkWithArrow class="headline-link" :is-title="true" :text="$t(card.title)" />
          </NuxtLink>
        </div>
        <p class="paragraph-1 desc">
          {{ $t(card.desc) }}
        </p>
        <div v-if="card.links" class="links">
          <NuxtLink
            v-for="link in card.links"
            :key="link.index"
            class="link"
            :to="link.to"
          >
            <LinkWithArrow :arrow-on-right="false" class="headline-link" :text="$t(link.title)" />
          </NuxtLink>
        </div>
        <div v-else class="links">
          <a
            v-for="href in card.hrefs"
            :key="href.index"
            class="link"
            :href="href.href"
            target="_blank"
          >
            <LinkWithArrow :arrow-on-right="false" class="headline-link" :text="$t(href.title)" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkWithArrow from '~/components/LinkWithArrow'
import { demoDataPermissionRules } from '~/commons/demoDataPermissionRules'

export default {
  name: 'Overview',
  components: { LinkWithArrow },
  data () {
    return {
      cards: [
        {
          imageName: 'manage-users.svg',
          title: 'Manage Users',
          desc: 'Manage users, tenant roles and application access & roles',
          to: '/users',
          links: [
            {
              title: 'Tenant',
              to: '/users?tab=tenant'
            },
            {
              title: 'Management Dashboard',
              to: '/users?tab=management-dashboard'
            }
          ]
        },
        {
          imageName: 'manage-api.svg',
          title: 'Manage API Keys',
          desc: 'View API Keys and quickly start building',
          to: '/api-keys',
          links: [
            {
              title: 'Manage API Keys',
              to: '/api-keys?tab=list'
            },
            {
              title: 'Quick Start Example',
              to: '/api-keys?tab=examples'
            }
          ]
        },
        {
          imageName: 'manage-tenants.svg',
          title: 'Manage Tenants',
          desc: 'Manage your tenants or create new ones',
          to: '/manage-tenants',
          links: [
            {
              title: 'Manage Tenants',
              to: '/manage-tenants'
            },
            {
              title: 'Add Tenant',
              to: '/tenant/name'
            }
          ]
        },
        {
          imageName: 'my-account.svg',
          title: 'My Account',
          desc: 'Manage your profile and password',
          to: '/account-settings',
          links: [
            {
              title: 'Personal settings',
              to: '/account-settings?tab=personal-settings'
            },
            {
              title: 'Change Password',
              to: '/account-settings?tab=change-password'
            }
          ]
        },
        {
          imageName: 'management-dashboard.svg',
          title: 'Management Dashboard',
          desc: 'Log in to management dashboard',
          to: '/',
          hrefs: [
            {
              title: 'Log in to Management Dashboard',
              href: this.$config.MGMT_DASHBOARD_URL
            },
          ]
        },
        {
          imageName: 'documentation.svg',
          title: 'Documentation',
          desc: 'Browse the documentation Guides amd API Reference',
          to: '/',
          hrefs: [
            {
              title: 'Guides',
              href: `${this.$config.DOC_PORTAL_URL}getting-started/generalConcepts`
            },
            {
              title: 'API Reference',
              href: `${this.$config.DOC_PORTAL_URL}api-reference`
            }
          ]
        },
        {
          imageName: 'manage-demo-data.svg',
          title: 'Manage Demo Data',
          desc: 'Import sample data for demos.',
          to: '/demo-data/product/add',
          links: [
            {
              title: 'Add Product Data',
              to: '/demo-data/product/add'
            },
            {
              title: 'View Import Jobs',
              to: '/demo-data/imports'
            }
          ],
          permission: demoDataPermissionRules
        },
        
      ]
    }
  },
  computed: {
    authData () {
      return this.$store.getters['auth/getAuthData']()
    }
  },
  methods: {
    checkManageDemoDataPermission(email, permissionList)  {
        for (let permission of permissionList){
            if(email.includes(permission.rule)){
              return true
            }
        }
        return false
    }
  }
}
</script>

<style lang="scss" scoped>
.guides {
  display: flex;
  // justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.card {
  display: flex;
  flex-shrink: 0;
  width: calc(50% - 64px);
  padding: 32px 32px 32px 0;
  border-top: 1px solid $brand-grey-300;
  @include tablet-down() {
    width: calc(50% - 32px);
  }
  @include phone-only() {
    width: 100%;
  }

  &:nth-of-type(1) {
    border-top: 0;
  }

  &:nth-of-type(2) {
    border-top: 0;
    @include phone-only() {
      border-top: 1px solid $brand-grey-300;
    }
  }

  &:nth-of-type(odd) {
    margin-right: 64px;
    @include tablet-down() {
      margin-right: 24px;
    }
    @include phone-only() {
      margin: 0;
    }
  }

  &:nth-of-type(even) {
    margin-left: 64px;
    @include tablet-down() {
      margin-left: 24px;
    }
    @include phone-only() {
      margin: 0;
    }
  }

  .img-wr {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    text-align: right;
    @include tablet-down() {
      width: 56px;
      height: 56px;
    }

    .img {
      max-height: 100%;
    }
  }

  .text-wr {
    margin-left: 32px;
    width: 100%;
    @include tablet-down() {
      margin-left: 24px;
    }

    .title-wr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      .card-title {
        display: block;
        text-decoration: none;
        width: 100%;
      }
    }

    .desc {
      color: black;
      margin-bottom: 16px;
    }

    .link {
      display: flex;
      text-decoration: none;
      margin-bottom: 16px;
      width: fit-content;

      .link-text {
        color: $brand-blue-500;
        margin-left: 16px;
        transition: color 200ms;
      }

      &:hover {
        .link-text {
          color: black;
        }
      }
    }
  }
}
</style>

<template>
  <div class="mobile-menu">
    <div class="mobile-menu-content">
      <div class="p-3 w-full">
        <TenantSwitcher />
        <ButtonTertiary class="w-full">
          {{ $t('toolbar.manageTenants') }}
        </ButtonTertiary>
      </div>
      <HorizontalLine class="m-3" />
      <div class="nav flex align-items-center justify-content-center pt-4 pb-4">
        <NuxtLink
          class="nav-label mr-2 px-3"
          :to="'/'"
        >
          {{ $t('links.overview') }}
        </NuxtLink>
      </div>
      <div class="nav flex align-items-center justify-content-center pt-4 pb-4">
        <NuxtLink
          class="nav-label mr-2 px-3"
          :to="'/users'"
        >
          {{ $t('links.users') }}
        </NuxtLink>
        <img
          :class="{expanded: userCardsVisible}"
          src="/icons/arrow-drop-blue.svg"
          @click="toggleUserCardsVisibility()"
        >
      </div>
      <HeaderDrop v-if="userCardsVisible" full-width :opened-option="menuOptions.USERS" />
      <div class="nav flex align-items-center justify-content-center pt-4 pb-4">
        <NuxtLink
          class="nav-label mr-2 px-3"
          :to="'/api-keys'"
        >
          {{ $t('links.apiKeys') }}
        </NuxtLink>
        <img
          :class="{expanded: apiCardsVisible}"
          src="/icons/arrow-drop-blue.svg"
          @click="toggleApiCardsVisibility()"
        >
      </div>
      <HeaderDrop v-if="apiCardsVisible" full-width :opened-option="menuOptions.API_KEYS" />
      <div class="nav flex align-items-center justify-content-center pt-4 pb-4">
        <NuxtLink
          class="nav-label mr-2 px-3"
          :to="'/account-settings?tab=personal-settings'"
        >
          {{ $t('links.myAccount') }}
        </NuxtLink>
        <img
          :class="{expanded: accountCardsVisible}"
          src="/icons/arrow-drop-blue.svg"
          @click="toggleAccountCardsVisibility()"
        >
      </div>
      <HeaderDrop v-if="accountCardsVisible" full-width :opened-option="menuOptions.MY_ACCOUNT" />
      <HorizontalLine class="m-3" />
      <div class="px-3 mt-4">
        <ButtonSecondary theme="dark" class="w-full">
          <div class="flex justify-content-center align-items-center">
            <img class="mr-1" src="/icons/toolbar/documentation.svg">
            <div>{{ $t('toolbar.documentation') }}</div>
          </div>
        </ButtonSecondary>

        <ButtonSecondary theme="dark" class="w-full mt-2">
          <div class="flex justify-content-center align-items-center">
            <img class="mr-1" src="/icons/toolbar/management-dashboard.svg">
            <div>{{ $t('toolbar.managementDashboard') }}</div>
          </div>
        </ButtonSecondary>
        <div class="w-full mt-4 mb-4">
          <NuxtLink to="/logout" class="w-full">
            <ButtonSecondary theme="dark" class="w-full">
              <div class="flex justify-content-center align-items-center">
                <div>{{ $t('navigation.logout') }}</div>
              </div>
            </ButtonSecondary>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TenantSwitcher from '~/components/common/TenantSwitcher'
import ButtonTertiary from '~/components/common/ButtonTertiary'
import ButtonSecondary from '~/components/common/ButtonSecondary'
import { menuOptions } from '~/commons/menuOptions'
import { usersCards } from '~/commons/usersCards'
import { apiKeysCards } from '~/commons/apiKeysCards'
import { myAccountCards } from '~/commons/myAccountCards'
import HeaderDrop from '~/components/common/header/HeaderDrop'
import HorizontalLine from '~/components/common/HorizontalLine'

export default {
  components: {
    HorizontalLine,
    HeaderDrop,
    TenantSwitcher,
    ButtonTertiary,
    ButtonSecondary
  },
  data () {
    return {
      usersOpen: false,
      apiOpen: false,
      accountOpen: false,
      menuOptions,
      usersCards,
      apiKeysCards,
      myAccountCards
    }
  },
  computed: {
    userCardsVisible () {
      return this.usersOpen
    },
    apiCardsVisible () {
      return this.apiOpen
    },
    accountCardsVisible () {
      return this.accountOpen
    },
    authData () {
      return this.$store.getters['auth/getAuthData']()
    }
  },
  watch: {
    '$route' () {
      this.$emit('go')
    },
    usersOpen (newValue) {

    }
  },
  methods: {
    goToDashboard () {
      window.open(this.$config.MGMT_DASHBOARD_URL, '_newtab')
    },
    toggleUserCardsVisibility () {
      this.usersOpen = !this.usersOpen
    },
    toggleApiCardsVisibility () {
      this.apiOpen = !this.apiOpen
    },
    toggleAccountCardsVisibility () {
      this.accountOpen = !this.accountOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-menu {
  padding: 12px 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  overflow-y: scroll;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  .nav {
    img {
      transition: .5s;

      &.expanded {
        transform: rotate(180deg);
      }
    }

  }

  .nav-label {
    color: $brand-navy-800;
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
  }

  .user-info {
    margin-bottom: 8px;
    text-align: center;
  }

  .tenant-dropdown {
    margin-bottom: 32px;
    width: 100%;
  }

  .dashboard-button {
    margin-bottom: 32px;
  }

  .portal-navigation {
    width: 100%;
  }

  .divider {
    margin: 24px 0;
    border-top: $lightGray;
    width: 100%;
  }
}
</style>

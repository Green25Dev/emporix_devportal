<template>
  <div>
    <div class="actions-dropdown">
      <div
        v-click-outside="closeActions"
        class="dots"
        @click="toggleExpand"
      >
        ...
      </div>
      <div v-if="expanded" class="actions-container">
        <div
          class="action-item"
          @click="goToTenantSettings(item.tenant, item.accessType)"
        >
          {{ $t('accountSettings.settings') }}
        </div>
        <div
          class="action-item"
          @click="leaveTeam(item.tenant)"
        >
          {{ $t('accountSettings.leave') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { openModal } from '~/plugins/modal-service'
import ConfirmBox from '~/components/common/ConfirmBox'

export default {
  name: 'ActionsMenu',
  props: {
    userId: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    toggleExpand () {
      this.expanded = !this.expanded
    },
    closeActions () {
      this.expanded = false
    },
    async leaveTeam (tenantName) {
      this.expanded = false
      const confirmation = await openModal(ConfirmBox, {
        header: 'Leave Team',
        text: `Are you sure you want to leave ${tenantName}?`
      })
      if (confirmation) {
        try {
          await this.$authAdapterService().leaveTenant(tenantName)
          const tenants = await this.$authAdapterService().getTenants()
          this.$nuxt.$emit('refreshTenantSwitcher')
          if (tenants.length > 0) {
            await this.$store.dispatch('auth/chooseTenant', tenants[0])
            await this.$router.push('/')
          } else {
            await this.$store.dispatch('auth/signOut', this.$config.DEV_PORTAL_LOGOUT)
            await this.$router.push('/team-settings')
          }
        } catch
        (error) {
          this.$toast.error('Sorry could not leave team. Please check if you are not the only admin!')
        }
      }
    },
    goToTenantSettings (tenantName, access) {
      this.$store.dispatch('auth/chooseTenant', {
        tenant: tenantName,
        accessType: access
      })
      this.$router.push({
        path: 'settings'
      })
    }
  }
}
</script>

<style lang="scss">
.actions-dropdown {
  position: relative;

  .dots {
    font-size: 32px;
    padding-bottom: 20px;

    &:hover {
      color: $lightBlue;
      cursor: pointer;
    }
  }

  .actions-container {
    position: absolute;
    border: 1px solid $lightBlue;
    box-shadow: 2px 2px 32px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    width: 120px;
    background: white;
    top: 14px;
    left: 40px;
    overflow: hidden;

    div:first-of-type {
      border-bottom: 1px solid $lightGray;
    }

    .action-item {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 15px;

      &:hover {
        background: $lightGray;
      }
    }
  }
}
</style>

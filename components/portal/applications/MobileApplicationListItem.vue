<template>
  <div class="app-list-item">
    <div class="info flex justify-content-between">
      <div class="name">
        {{ application.name }}
      </div>
      <NuxtLink v-if="application.id !== undefined" class="action-link" :to="'/applications/app?appId='+application.id">
        <ManageAppIcon />
      </NuxtLink>
    </div>
    <Credentials
      v-if="application.credentials"
      :client-secret="application.credentials.clientSecret"
      :client-id="application.credentials.clientId"
    />
  </div>
</template>

<script>
import Credentials from '~/components/portal/applications/Credentials'
import ManageAppIcon from '~/components/icons/ManageAppIcon'

export default {
  components: {
    ManageAppIcon,
    Credentials
  },
  props: {
    application: {
      type: Object,
      default () {
        return {
          id: '',
          name: '',
          credentials: {
            clientId: '',
            clientSecret: ''
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-list-item {
  border-bottom: 1px solid $searchLightGray;
  min-height: 64px;
  padding: 0 16px;
  .info {
    min-height: 48px;
    align-items: center;
    .name {
      font-family: Lato,sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      color: black;
    }
  }

}
</style>

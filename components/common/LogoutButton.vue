<template>
  <div>
    <v-btn @click="logout()">
      {{ $t('buttons.logout') }}
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'LogoutButton',
  methods: {
    logout () {
      this.$store.dispatch('auth/signOut', $config.DEV_PORTAL_LOGOUT)
    }
  }
}
</script>

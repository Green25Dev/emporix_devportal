<template>
  <div class="light-blue-test grid">
    <v-progress-circular
      :size="100"
      :width="10"
      :color="'#009FE3'"
      indeterminate
      class="progress"
    />
  </div>
</template>

<script>
export default {
  layout: 'centered',
  async mounted () {
    const urlParams = this.$route.query
    const authData = {
      accessToken: urlParams.access_token,
      firstName: urlParams.firstName,
      lastName: urlParams.lastName,
      userId: urlParams.userId,
      login: urlParams.login,
      locale: urlParams.locale,
      idToken: urlParams.idToken,
      newsletter: urlParams.newsletter,
      termsAndCondition: urlParams.termsAndCondition
    }
    await this.$store.dispatch('auth/signIn', authData)
    const tenants = await this.getAllTenants()

    if (tenants && tenants.length > 0) {
      await this.$store.dispatch('auth/chooseTenant', tenants[0])
      await this.$router.push('/')
    } else {
      await this.$router.push('/tenant/name')
    }
  },
  methods: {
    getAllTenants () {
      return this.$authAdapterApi().$get('/devportal/tenants', {
        headers: {
          'X-Proxy-Authorization': `Bearer ${JSON.parse(localStorage.authData).accessToken}`,
          Authorization: `Bearer ${JSON.parse(localStorage.authData).accessToken}`
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  color: black;
  font-size: 52px;
  font-family: Roboto, sans-serif;
}

.light-blue-test {
  color: $lightBlue
}
</style>

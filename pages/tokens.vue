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
  mounted () {
    const urlParams = this.$route.query
    const authData = {
      accessToken: urlParams.access_token,
      firstName: urlParams.firstName,
      lastName: urlParams.lastName,
      userId: urlParams.userId,
      login: urlParams.login,
      locale: urlParams.locale
    }
    this.$store.dispatch('auth/signIn', authData)
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

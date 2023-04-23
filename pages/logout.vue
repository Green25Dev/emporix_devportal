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
    this.$store.dispatch('auth/signOut', this.$config.DEV_PORTAL_LOGOUT)
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

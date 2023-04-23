<template>
  <div class="padded-content">
    <h2
      v-if="authData &&authData.firstName && authData.lastName"
      class="greetings"
    >
      Hi <span class="title-name-highlight">{{ authData.firstName }}</span>! Welcome to Emporix
    </h2>
    <Overview class="tabs" />
  </div>
</template>

<script>

import Overview from '~/components/overview/Overview'

export default {
  components: {
    Overview
  },
  layout: 'portal',
  computed: {
    authData () {
      return this.$store.getters['auth/getAuthData']()
    }
  }
}
</script>

<style lang="scss" scoped>
.greetings {
  font-size: 32px;
  line-height: 38px;
  margin-bottom: 32px;
  max-width: 960px;
  @include phone-only() {
    font-size: 28px;
    padding: 0;
    background-color: white;
    margin-bottom: 0;
  }
}

.overview-title {
  color: black;
  font-size: 28px;
  font-weight: bold;
  @include phone-only() {
    margin-top: 0;
  }
}

.overview-subtitle {
  color: black;
  font-size: 18px;
  padding: 1rem 0 3rem 0;
}

.light-blue-test {
  color: $lightBlue
}

.info-card-container {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  width: 100%;
  @include tablet-down {
    display: block;
  }
}
</style>

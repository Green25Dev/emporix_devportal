<template>
  <div>
    <MobileApplicationListItem v-for="application in applications" :key="application.id" :application="application" />
  </div>
</template>

<script>
import MobileApplicationListItem from '~/components/portal/applications/MobileApplicationListItem'

export default {
  components: { MobileApplicationListItem },
  props: {
    applications: {
      type: Array,
      defaultValue: []
    }
  }
}
</script>

<style lang="scss" scoped>
.credentials {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
  }

  small {
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: $gray;
  }

  .client-id {

  }

  .client-secret {

  }
}
</style>

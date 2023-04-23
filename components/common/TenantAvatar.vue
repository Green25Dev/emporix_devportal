<template>
  <v-avatar tile color="#C0D0DF" size="24" class="rectangle">
    <span class="label">{{ initials }}</span>
  </v-avatar>
</template>

<script>
export default {
  name: 'TenantAvatar',
  props: {
    tenant: {
      type: String,
      default: 'MPREIS'
    }
  },
  computed: {
    initials () {
      return `${this.tenant.substring(0, 2)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.rectangle {
  border-radius: 2px;
}

.label {
  color: $brand-grey-700;
  font-size: 12px;
}
</style>

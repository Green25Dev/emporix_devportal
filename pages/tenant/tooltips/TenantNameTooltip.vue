<template>
  <div class="tenant-name-tooltip">
    <div class="first-item">
      {{ $t("tenant.chooseName.name.tooltip.1") }}
    </div>
    <div>{{ $t("tenant.chooseName.name.tooltip.2") }}</div>
  </div>
</template>

<script>
export default {
  name: 'TenantNameTooltip'
}
</script>

<style lang='scss' scoped>
.first-item {
  color: $brand-grey-300;
  margin-bottom: 16px;
}
</style>

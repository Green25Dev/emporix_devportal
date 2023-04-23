<template>
  <div class="currency-tooltip">
    <div class="first-item">
      {{ $t("tenant.chooseName.currency.tooltip.1") }}
    </div>
    <a
      href="https://docs.emporix.com/getting-started/creating-a-tenant/creating-a-tenant/#selecting-a-currency"
      target="_blank"
      class="link"
    >{{ $t("tenant.chooseName.currency.tooltip.2") }}</a>
  </div>
</template>

<script>
export default {
  name: 'TenantCurrencyTooltip'
}
</script>

<style lang='scss' scoped>
.currency-tooltip {
  display: flex;
  flex-direction: column;

  .first-item {
    color: $brand-grey-300;
    margin-bottom: 16px;
  }

  .link {
    color: white;
    margin-left: auto;
    text-decoration: underline;
    font-weight: $weight-bold;
    align-self: flex-end;
  }
}
</style>

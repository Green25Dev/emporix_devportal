<template>
  <div class="language-tooltip">
    <div class="first-item">
      {{ $t("tenant.chooseName.language.tooltip.1") }}
    </div>
    <a
      href="https://docs.emporix.com/getting-started/creating-a-tenant/creating-a-tenant/#selecting-a-language"
      target="_blank"
      class="link"
    >{{ $t("tenant.chooseName.language.tooltip.2") }}</a>
  </div>
</template>

<script>
export default {
  name: 'TenantLanguageTooltip'
}
</script>

<style lang="scss" scoped>
.language-tooltip {
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

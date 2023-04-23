<template>
  <div class="documentation-links">
    <h2 class="documentation-title">
      {{ $t('documentationLinks.title') }}
    </h2>
    <a class="link" href="https://developer.emporix.io/getting-started/introduction/" target="_blank">
      {{ $t('links.guides') }}
    </a>
    <a class="link" href="https://developer.emporix.io/api-reference" target="_blank">
      {{ $t('links.apiReference') }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'PortalDocumentationNav',
  computed: {}
}
</script>

<style lang="scss" scoped>
.documentation-links {
  margin-top: 36px;
  display: flex;
  flex-direction: column;

  .documentation-title {
    text-transform: uppercase;
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: $gray;
  }

  .link {
    margin-top: 25px;
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: $purple;
    text-decoration: none;
  }
}
</style>

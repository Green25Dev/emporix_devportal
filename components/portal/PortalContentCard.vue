<template>
  <div class="portal-card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PortalContentCard'
}
</script>

<style lang="scss" scoped>
.portal-card {
  background: white;
  border-radius: 8px;
  box-shadow: 2px 2px 32px rgba(0, 0, 0, 0.05);
  padding: 72px 72px 48px 72px;
  min-height: 100%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  @include desktop-up() {
    max-width: 1290px;
  }

  @include desktop-down(){
    padding: 48px;
  }

  @include tablet-down() {
    border-radius: unset;
    padding: 32px;
  }
  @include phone-only() {
    box-shadow: unset;
  }
}
</style>

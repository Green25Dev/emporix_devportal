<template>
  <div class = "toolbar-container">
    <div class = "left-section">
      <TenantSwitcher />
    </div>
    <div class = "right-section">
      <ButtonSecondary theme= "dark" class="button">
        <div class = "flex justify-content-center align-items-center" @click="goToDocumentation">
          <img class = "mr-2" src="/icons/toolbar/documentation.svg">
          <div>{{ $t('toolbar.documentation') }}</div>
        </div>
      </ButtonSecondary>
      <ButtonSecondary theme="dark" class="button ml-2">
        <div class="flex justify-content-center align-items-center" @click="goToDashboard">
          <img class="mr-2" src="/icons/toolbar/management-dashboard.svg">
          <div>{{ $t('toolbar.goToDashboard') }}</div>
        </div>
      </ButtonSecondary>
    </div>
  </div>
</template>
<script>
import TenantSwitcher from '~/components/common/TenantSwitcher'
import ButtonSecondary from '~/components/common/ButtonSecondary'

export default {
  name: 'Toolbar',
  props: {
    step: {
      type: Number,
      default: 0
    }
  },
  components: {
    ButtonSecondary,
    TenantSwitcher
  },
  methods: {
    goToDashboard () {
      window.open(this.$config.MGMT_DASHBOARD_URL, '_newtab')
    },
    goToDocumentation () {
      window.open(this.$config.DOC_PORTAL_URL, '_newtab')
    }
  }
}
</script>

<style lang="scss">
.toolbar-container {
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 70px;
  border-bottom: 1px solid $brand-grey-300;
  display: flex;
  @include tablet-down() {
    display: none;
  }

  .left-section {
    display: flex;
  }

  .right-section {
    display: flex;
    align-items: center;

    .button {
      line-height: 20px;
      height: 40px;
    }
  }
}
</style>

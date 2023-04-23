<template>
  <header class="header">
    <AppLogo class="logo" />
    <HeaderLinks class="links" />
    <div />
    <div class="mobile-menu-icon">
      <HamburgerIcon v-if="!mobileMenuExpanded" @click.native="toggleMobileMenu()" />
      <CrossIcon v-if="mobileMenuExpanded" @click.native="toggleMobileMenu()" />
    </div>
    <div class="mobile-menu-wr">
      <transition name="fade">
        <PortalMobileMenu
          v-show="mobileMenuExpanded"
          @go="hideMobileMenu()"
        />
      </transition>
    </div>
  </header>
</template>

<script>
import AppLogo from '~/components/AppLogo'
import HamburgerIcon from '~/components/icons/HamburgerIcon'
import PortalMobileMenu from '~/components/portal/PortalMobileMenu'
import CrossIcon from '~/components/icons/CrossIcon'
import HeaderLinks from '~/components/common/header/HeaderLinks'

export default {
  name: 'Header',
  components: {
    HeaderLinks,
    CrossIcon,
    AppLogo,
    HamburgerIcon,
    PortalMobileMenu
  },
  data () {
    return {
      mobileMenuExpanded: false
    }
  },
  methods: {
    hideMobileMenu () {
      this.mobileMenuExpanded = false
    },
    toggleMobileMenu () {
      this.mobileMenuExpanded = !this.mobileMenuExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 32px;
  background-color: $brand-navy-800;
  z-index: 30;

  .links {
    align-self: flex-end;
    margin-bottom: 8px;

    @include tablet-down() {
      display: none;
    }
  }

  @include tablet-down() {
    padding: 0 48px;
  }
  @include phone-only() {
    padding: 0 24px;
  }

  .mobile-menu-wr {
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1;
    display: none;
    @include tablet-down() {
      display: block;
    }
  }

  .mobile-menu-icon {
    display: none;
    @include tablet-down() {
      display: block;
    }
  }

  .right-section {
    @include tablet-down() {
      display: none;
    }
  }
}
</style>

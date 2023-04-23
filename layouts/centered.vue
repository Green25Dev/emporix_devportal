<template>
  <div class="app" data-app>
    <div class="w-full header fixed">
      <div class="header-wrapper h-full">
        <div />
        <div class="logo-container">
          <AppLogo class="logo" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-wrapper grid grid-nogutter">
        <div class="main">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      mobileMenuExpanded: false
    }
  },
  methods: {
    setMobileMenuExpanded (value) {
      this.mobileMenuExpanded = value
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin desktopPadding {
  padding-left: 72px;
  padding-right: 72px;
}

.app {
  margin-left: auto;
  margin-right: auto;
  height: 100%;

  .header {
    @include mobilePadding();
    background: white;
    height: 80px;
    flex-grow: 0;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);

    .header-wrapper {
      font-family: 'Roboto', sans-serif;
      grid-template-rows: 1fr;
      display: grid;
      grid-template-columns: 200px 1fr 200px;
      align-items: center;
      .account {
        margin-right: 70px;
        margin-left: auto;
      }
      .get-api-keys {
        background: #3B91DF;
        color: white;
        text-transform: unset;
      }

      .mobile-menu {
        @include mobilePadding();
        background: white;
        width: 100%;
        top: 80px;
        left: 0;
        margin: 0;
        padding-top: 20px;
      }

      .logo-container {
        height: 41px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0;

        .logo {
          display: block;
          width: auto;
          height: 26px;
          .logo-img {
            height: 100%;
          }
        }
      }

    }
  }

  .content {
    overflow-y: auto;
    @include mobilePadding();
    margin-top: 80px;
    @include phone-only() {
      margin-top: 80px;
    }

    .content-wrapper {
      flex-grow: 1;

      .main {
        height: 100%;
        margin: 80px auto;
        @include mobilePadding();
        @include phone-only() {
          width: 100%;
          overflow-y: scroll;
        }
      }

    }

  }
}
</style>

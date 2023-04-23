<template>
  <div v-if="isUserLogged" class="app" data-app>
    <Modal />
    <Header />
    <Toolbar />
    <main class="main">
      <div class="content">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
import Modal from '~/components/common/Modal'
import Header from '~/components/Header'
import Toolbar from '~/components/common/toolbar/Toolbar'

export default {
  components: {
    Toolbar,
    Header,
    Modal
  },
  beforeRouteEnter () {
    if (!this.isUserLogged) {
      this.$router.push('/logout')
    }
  },
  data () {
    return {
      mobileMenuExpanded: false,
      tenantOptions: []
    }
  },
  computed: {
    authData () {
      return this.$store.getters['auth/getAuthData']()
    },
    isUserLogged () {
      return this.$store.getters['auth/isUserLogged']()
    }
  },
  watch: {
    isUserLogged: {
      immediate: true,
      handler (newValue) {
        if (!newValue) {
          this.$router.push('/logout')
        }
      }
    }
  },
  mounted () {
    if (this.authData.login.length > 0 && (this.authData.termsAndCondition === undefined ||
      this.authData.termsAndCondition === false ||
      this.authData.termsAndCondition === 'false'
    )) {
      this.$router.push('/terms-and-condition')
    }
  }
}
</script>

<style lang="scss" scoped>
$shadow: 2px 2px 32px rgba(0, 0, 0, 0.05);

.header {
  width: 100%;
  top: 0;
  left: 0;
}

.main {
  height: calc(100vh - 80px - 70px);
  display: flex;
  width: 100vw;
  background: white;
  overflow-y: auto;
  @include tablet-down() {
    height: calc(100vh - 80px);
  };

  .content {
    width: 100%;
    @include tablet-down() {
      padding: 48px;
    };
    @include phone-only() {
      padding: 0;
    };
  }
}
</style>

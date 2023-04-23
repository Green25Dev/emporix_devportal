<template>
  <div class="pt-6">
    <div class="grid grid-nogutter">
      <div class="col-10">
        {{ $t('applications.example.title', { appName: credentials.appName }) }}
      </div>
      <div class="col-2 cursor-pointer flex align-items-center justify-content-end" @click="copyExample()">
        <CopyIcon />
        <div class="ml-1">
          {{ $t('global.copy') }}
        </div>
      </div>
    </div>

    <CodeEditor
      class="code mt-4 w-full border-round"
      :code-input="code"
    />
  </div>
</template>

<script>
import CodeEditor from '~/components/common/CodeEditor'
import CopyIcon from '~/components/icons/CopyIcon'

export default {
  components: {
    CodeEditor,
    CopyIcon
  },
  props: {
    credentials: {
      type: Object,
      default: () => {
        return {
          clientId: 'clientId',
          clientSecret: 'clientSecret',
          appName: 'appName'
        }
      }
    }
  },
  data () {
    return {
      codeInput: ''
    }
  },
  computed: {
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    },
    session () {
      return Math.random().toString(36).substr(2, 5)
    },
    code () {
      if (this.credentials.appName.toLowerCase().includes('storefront')) {
        return this.storefrontApi()
      } else {
        return this.emporixApiCode()
      }
    }
  },
  watch: {
    credentials (newValue, oldValue) {
      console.log(oldValue)
      console.log(newValue)
    }
  },
  methods: {
    copyExample () {
      navigator.clipboard.writeText(this.code)
      this.$toast.info(this.$t('global.copied'), { icon: 'information-outline' })
    },
    storefrontApi () {
      return `curl --location --request GET 'https://api-dev.emporix.io/customerlogin/auth/anonymous/login?client_id=${this.credentials.clientId}&hybris-tenant=${this.currentTenant.tenant}&hybris-session-id=${this.session}'`
    },
    emporixApiCode () {
      return `curl --location --request POST '${this.$config.EMPORIX_API_URL}oauth/token' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'grant_type=client_credentials' \\
--data-urlencode 'client_id=${this.credentials.clientId}' \\
--data-urlencode 'client_secret=${this.credentials.clientSecret}' \\`
    }
  }
}
</script>

<style lang="scss">
.code {
  width: 70%;
  background: $brand-navy-800;
  word-wrap: break-word;
}
</style>

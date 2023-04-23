export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Emporix | Digital Commerce Platform | Devportal',
    script: [
      {
        src: '/scripts/intercom.js',
        body: true
      }
    ],
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }, {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
      }, {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuetify/dist/vuetify.css',
    'primeflex/primeflex.css',
    '@/assets/scss/colors.scss',
    'vue-prism-editor/dist/prismeditor.min.css'
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/restoreState',
      ssr: false
    },
    {
      src: '@/plugins/adminRestricted',
      ssr: false
    },
    {
      src: '@/plugins/clickOutside',
      ssr: false
    },
    '@/plugins/filters',
    '@/plugins/okta',
    '@/plugins/auth-adapter.api.client',
    '@/plugins/auth-adapter-service.client'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  loading: {
    color: '#2F3270',
    height: '3px',
    continuous: true
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    ['@nuxtjs/fontawesome', {
      suffix: true,
      icons: {
        solid: true
      }
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    '@nuxtjs/gtm'
  ],
  gtm: {
    id: 'GTM-WNS3DHB'
  },
  toast: {
    position: 'top-center',
    duration: 3000,
    iconPack: 'mdi'
  },
  i18n:
    {
      lazy: true,
      silentTranslationWarn: true,
      silentFallbackWarn: true,
      locales: [{
        code: 'en',
        file: 'en-US.js'
      },
      {
        code: 'de',
        file: 'de-DE.js'
      }],
      defaultLocale:
        'en',
      langDir:
        'i18n/'
    },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
    }
  },
  publicRuntimeConfig: {
    OKTA_CLIENT_ID: process.env.BASE_URL,
    BASE_URL: process.env.BASE_URL,
    DEV_PORTAL_LOGIN: process.env.DEV_PORTAL_LOGIN,
    DEV_PORTAL_LOGOUT: process.env.DEV_PORTAL_LOGOUT,
    AUTH_ADAPTER_BASE_URL: process.env.AUTH_ADAPTER_BASE_URL,
    MGMT_DASHBOARD_URL: process.env.MGMT_DASHBOARD_URL,
    MGMT_DASHBOARD_V2_URL: process.env.MGMT_DASHBOARD_V2_URL,
    DOC_PORTAL_URL: process.env.DOC_PORTAL_URL,
    RESET_PASSWORD_URL: process.env.RESET_PASSWORD_URL,
    TENANT_NAME_LENGTH: process.env.TENANT_NAME_LENGTH,
    TENANT_CREATION_URL: process.env.TENANT_CREATION_URL,
    EMPORIX_API_URL: process.env.EMPORIX_API_URL ,
    ICECATDEMO_API_URL: process.env.ICECATDEMO_API_URL,
    GITHUB_PERSONAL_TOKEN: process.env.STOREFRONT_GITHUB_TOKEN,
    GITHUB_USER_NAME: process.env.GITHUB_USER_NAME,
    GITHUB_USER_EMAIL: process.env.GITHUB_USER_EMAIL,
    ICECATDEMO_USER : process.env.ICECATDEMO_USER,
    ICECATDEMO_PWD : process.env.ICECATDEMO_PWD,
  }
  
}
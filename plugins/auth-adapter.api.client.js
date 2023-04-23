import { OktaAuth } from '@okta/okta-auth-js'

export default function ({
  $axios,
  $config,
  store
}, inject) {
  const DEVPORTAL_SCOPES = [
    'openid',
    'email',
    'profile',
    'okta.users.read',
    'okta.apps.read',
    'okta.groups.read',
    'okta.users.read.self',
    'offline_access',
    'okta.schemas.read'
  ]
  const DEVPORTAL_CONFIG = {
    issuer: $config.BASE_URL,
    clientId: $config.OKTA_CLIENT_ID,
    redirectUri: window.location.origin,
    scopes: DEVPORTAL_SCOPES,
    tokenManager: {
      storage: 'cookie'
    }
  }

  const authAdapterApi = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*, application/json'
      }
    }
  })

  authAdapterApi.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      'X-Proxy-Authorization': `Bearer ${store.state.auth.accessToken}`,
      Authorization: `Bearer ${store.state.auth.accessToken}`
    }
    return config
  })

  authAdapterApi.interceptors.response.use(response => response, async (error) => {
    if (error.request.status === 401) {
      console.warn('Tokens expired, Will try to renew Okta session')
      const okta = new OktaAuth(DEVPORTAL_CONFIG)
      try {
        const tokensResposne = await okta.token.getWithoutPrompt({ responseType: ['id_token', 'token'] })
        okta.tokenManager.setTokens(tokensResposne.tokens)
        await store.dispatch('auth/refreshTokens', {
          accessToken: tokensResposne.tokens.accessToken.accessToken,
          idToken: tokensResposne.tokens.idToken.idToken
        })
        return authAdapterApi.request(error.config)
      } catch (error) {
        console.error('Could not renew tokens!')
        window.location = window.origin + '/logout'
      }
    }

    return Promise.reject(error)
  })
  authAdapterApi.setBaseURL($config.AUTH_ADAPTER_BASE_URL || process.env.AUTH_ADAPTER_BASE_URL || 'https://api-dev.emporix.io/auth-adapter/')

  inject('authAdapterApi', () => authAdapterApi)
}

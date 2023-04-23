import { OktaAuth } from '@okta/okta-auth-js'

const DEVPORTAL_SCOPES = [
  'openid',
  'email',
  'profile',
  'okta.users.read',
  'okta.apps.read',
  'okta.groups.read',
  'okta.users.read.self',
  'offline_access',
  'okta.schemas.read',
  'okta.apps.manage',
  'okta.users.manage',
  'okta.groups.manage'
]

function getOktaAuth ($config) {
  return new OktaAuth({
    issuer: $config.BASE_URL,
    clientId: $config.OKTA_CLIENT_ID,
    redirectUri: window.location.origin + '/auth',
    scopes: DEVPORTAL_SCOPES,
    tokenManager: {
      storage: 'cookie'
    }
  })
}

export default ({ app, $config }, inject) => {
  const oktaAuth = getOktaAuth($config)
  inject('okta', () => oktaAuth)
}

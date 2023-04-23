export default async function ({
  store
}) {
  const localStorageAuthState = localStorage.authData
  if (localStorageAuthState) {
    const localStorageAuthStateParsed = JSON.parse(localStorage.authData)
    const tenant = localStorageAuthStateParsed.currentTenant
    await store.dispatch('auth/signIn', localStorageAuthStateParsed)
    await store.dispatch('auth/chooseTenant', tenant)
  }
}

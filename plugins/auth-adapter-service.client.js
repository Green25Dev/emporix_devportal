import { convertAccessTypesToDropdown } from '~/commons/mappers'

export default function ({
  $axios,
  $config,
  store,
  app
}, inject) {
  // Create a custom axios instance
  const axios = app.$authAdapterApi()
  const authAdapterService = {}

  authAdapterService.getAppUsers = async function (appId) {
    const { data } = await axios.get(`dashboard/apps/${appId}/users`)
    return data.map(user => ({
      ...user,
      name: `${user.firstName} ${user.lastName}`
    }))
  }

  authAdapterService.getAssignables = async function (appId) {
    const { data } = await axios.get(`dashboard/apps/${appId}/users/assignable`)
    return data
  }

  authAdapterService.getAccessTypes = async (appId) => {
    const { data } = await axios.get(`dashboard/apps/${appId}/profile`)
    return data.userRole.oneOf.map(convertAccessTypesToDropdown)
  }

  authAdapterService.getApplication = async function (id) {
    const apps = await authAdapterService.getApplications()
    return apps.filter(app => app.id === id)[0]
  }

  authAdapterService.getApplications = async function () {
    const apps = []
    let appsResponse = []
    const { tenant } = store.state.auth.currentTenant
    try {
      appsResponse = await axios.get(`devportal/${tenant}/apps`)
      apps.push(...appsResponse.data.map(app => ({
        ...app,
        name: app.details.label
      })))
    } catch (error) {
      console.error(`Could not load apps for tenant ${tenant}`)
    }
    return apps
  }

  authAdapterService.getApis = async function () {
    let apisResponse = []
    const apis = []
    const { tenant } = store.state.auth.currentTenant
    try {
      apisResponse = await axios.get(`devportal/${tenant}/apis`)
      apis.push(...apisResponse.data.map(api => ({
        ...api,
        clientId: api.credentials[0].clientId,
        credentials: api.credentials[0]
      })))
    } catch (error) {
      console.error(`Could not load apis for tenant ${tenant}`, error)
    }

    return apis
  }

  authAdapterService.getTenants = async function () {
    const { data } = await axios.get('devportal/tenants')
    return data
  }

  authAdapterService.getTenantDetails = async function (tenantName) {
    if (tenantName === undefined) {
      const { tenant } = store.state.auth.currentTenant
      tenantName = tenant
    }
    const { data } = await axios.get(`devportal/${tenantName}/tenants/details`)
    return data
  }

  authAdapterService.updateTenantDetails = async function (tenantDetails) {
    const { tenant } = store.state.auth.currentTenant
    await axios.patch(`devportal/${tenant}/tenants/details`, { companyName: tenantDetails.company.name })
  }

  authAdapterService.getUsers = function () {
    const { tenant } = store.state.auth.currentTenant
    return axios.$get(`devportal/${tenant}/users`, {})
  }

  authAdapterService.addUser = function (user) {
    const { tenant } = store.state.auth.currentTenant
    return axios.$post(`devportal/${tenant}/users`, user)
  }

  authAdapterService.getCurrentUser = function () {
    const { tenant } = store.state.auth.currentTenant
    const { userId } = store.state.auth
    return axios.$get(`devportal/${tenant}/users/${userId}`)
  }

  authAdapterService.updateUser = function (updatedUser) {
    return axios.$put('devportal/users/me', updatedUser)
  }

  authAdapterService.changePassword = function (oldPassword, newPassword) {
    return axios.$post('devportal/users/password/change', {
      oldPassword,
      newPassword
    })
  }

  authAdapterService.changeUserAccessType = function (userId, accessTypeId, appId) {
    return axios.$put(`dashboard/apps/${appId}/users/${userId}/roles/${accessTypeId}`, {}
    )
  }
  authAdapterService.leaveTenant = function (tenant) {
    if (!tenant) {
      tenant = store.state.auth.currentTenant.tenant
    }
    return axios.$delete(`/devportal/users/me/${tenant}`, {}
    )
  }

  authAdapterService.assignUserToApp = function (userId, accessTypeId, appId) {
    return axios.$post(`dashboard/users/${userId}/apps/${appId}/assign`, {
      appProfile: {
        properties: {
          preferredLanguage: 'en',
          department: 'Emporix',
          backofficeUserNumber: userId,
          preferredCurrency: 'EUR',
          preferredSite: 'main',
          userRole: accessTypeId
        }
      }
    })
  }

  authAdapterService.deleteUserFromApp = function (userId, appId) {
    return axios.$delete(`dashboard/users/${userId}/apps/${appId}/remove`)
  }

  authAdapterService.deleteUserFromTenant = function (userId, tenant) {
    return axios.$delete(`devportal/${tenant}/users/${userId}`)
  }

  authAdapterService.renewKeys = function (clientId) {
    const { tenant } = store.state.auth.currentTenant
    return axios.$post(`devportal/${tenant}/apis/keys/${clientId}/renew`)
  }

  authAdapterService.makeTeamMemberAnAdmin = function (userId) {
    const { tenant } = store.state.auth.currentTenant
    return axios.$post(`/devportal/${tenant}/users/${userId}/groups/admin`)
  }

  authAdapterService.makeTeamMemberAnUser = function (userId) {
    const { tenant } = store.state.auth.currentTenant
    return axios.$delete(`/devportal/${tenant}/users/${userId}/groups/admin`)
  }

  authAdapterService.removeFromTenant = function (userId) {
    const { tenant } = store.state.auth.currentTenant
    return axios.$delete(`/devportal/${tenant}/users/${userId}`)
  }

  authAdapterService.getUserDatils = function (userId) {
    const { tenant } = store.state.auth.currentTenant
    return axios.$get(`/devportal/${tenant}/users/${userId}`)
  }

  authAdapterService.getUserApplicationProfile = async function (userId, appId) {
    const appUsers = await authAdapterService.getAppUsers(appId)
    const foundUser = appUsers.filter(user => user.id === userId)
    return foundUser
  }

  authAdapterService.changeUserPassword = function (userId, newPassword) {
    const { tenant } = store.state.auth.currentTenant
    return axios.$post(`/devportal/${tenant}/users/${userId}/lifecycle/override_password`, { password: newPassword })
  }

  inject('authAdapterService', () => authAdapterService)
}

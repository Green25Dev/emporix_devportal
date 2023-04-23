import Vue from 'vue'

export const state = () => ({
  accessToken: '',
  firstName: '',
  lastName: '',
  userId: '',
  login: '',
  locale: 'en',
  idToken: '',
  newsletter: false,
  termsAndCondition: false,
  currentTenant: {
    accessType: 'User',
    tenant: ''
  },
  tenants: []
})

function saveAuthStateToLocalStorage (authData) {
  if (process.browser) {
    localStorage.setItem('authData', JSON.stringify(authData))
  }
}

export const mutations = {
  SIGN_IN (state, authData) {
    Object.assign(state, authData)
    saveAuthStateToLocalStorage(authData)
  },
  CHOOSE_TENANT (state, tenant) {
    const newState = {
      ...state,
      currentTenant: tenant
    }
    Object.assign(state, newState)
    saveAuthStateToLocalStorage(state)
  },
  REFRESH_TOKENS (state, tokens) {
    const newState = {
      ...state,
      accessToken: tokens.accessToken,
      idToken: tokens.idToken
    }
    Object.assign(state, newState)
    saveAuthStateToLocalStorage(state)
  },
  SET_TENANTS (state, tenants) {
    Vue.set(state, 'tenants', tenants)
    saveAuthStateToLocalStorage(state)
  },
  UPDATE_TERMS (state, termsAndCondition) {
    const newState = {
      ...state,
      termsAndCondition
    }
    Object.assign(state, newState)
    saveAuthStateToLocalStorage(state)
  },
  UPDATE_USER (state, user) {
    const newState = {
      ...state,
      ...user
    }
    Object.assign(state, newState)
    saveAuthStateToLocalStorage(state)
  },
  SIGN_OUT (state) {
    Vue.set(state, '', undefined)
    if (process.browser) {
      localStorage.removeItem('authData')
    }
  }
}

export const actions = {
  setTenants ({
    commit,
    state
  }, tenants) {
    commit('SET_TENANTS', tenants)
  },
  updateUser ({
    commit,
    state
  }, userData) {
    commit('UPDATE_USER', userData)
  },
  signIn ({
    commit,
    state
  }, authData) {
    commit('SIGN_IN', authData)
  },
  updateTerms ({
    commit,
    state
  }, termsAndCondition) {
    commit('UPDATE_TERMS', termsAndCondition)
  },
  chooseTenant ({
    commit,
    state
  }, tenant) {
    commit('CHOOSE_TENANT', tenant)
  },
  refreshTokens ({
    commit,
    state
  }, tokens) {
    commit('REFRESH_TOKENS', tokens)
  },
  signOut ({
    commit,
    state
  }, logoutUrl) {
    localStorage.clear()
    if (state.idToken) {
      this.$okta().signOut({
        postLogoutRedirectUri: logoutUrl
      })
      commit('SIGN_OUT')
    } else {
      commit('SIGN_OUT')
      window.location = logoutUrl
    }
  }
}

export const getters = {
  getCurrentUserId: state => () => {
    if (state.userId !== undefined) {
      return state.userId
    }
  },
  getCurrentUser: state => () => {
    if (state.userId !== undefined) {
      return {
        user: {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.login
        }
      }
    }
  },
  getAccessType: state => () => {
    if (state.currentTenant !== undefined) {
      return state.currentTenant.accessType
    }
  },
  getTenant: state => () => {
    if (state.currentTenant !== undefined) {
      return state.currentTenant
    }
  },
  getTenants: (state) => {
    return state.tenants
  },
  getAuthData: state => () => {
    if (state.accessToken !== undefined) {
      return state
    } else {
      if (process.browser) {
        return JSON.parse(localStorage.getItem('authData'))
      }
      return {}
    }
  },
  isUserLogged: state => () => {
    if (process.browser) {
      state = JSON.parse(localStorage.getItem('authData'))
    }
    return state !== undefined && state !== null && state.accessToken !== undefined
  }
}

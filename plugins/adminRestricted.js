import Vue from 'vue'

function restrict (vnode, el, accessTypeToRestrict) {
  const store = vnode.context.$store
  const accessType = store.getters['auth/getAccessType']()
  if (accessType !== accessTypeToRestrict) {
    el.style.display = 'none'
  } else {
    el.style.display = 'unset'
  }
}

Vue.directive('admin-only', {
  inserted: (el, binding, vnode) => {
    restrict(vnode, el, 'Admin')
  },
  updated: (el, binding, vnode) => {
    restrict(vnode, el, 'Admin')
  },
  componentUpdated: (el, binding, vnode) => {
    restrict(vnode, el, 'Admin')
  }
})

Vue.directive('user-only', {
  inserted: (el, binding, vnode) => {
    restrict(vnode, el, 'User')
  },
  updated: (el, binding, vnode) => {
    restrict(vnode, el, 'User')
  },
  componentUpdated: (el, binding, vnode) => {
    restrict(vnode, el, 'User')
  }
})

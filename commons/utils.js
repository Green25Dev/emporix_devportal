export const groupArrayOfObjects = (list, key) => list.reduce(function (rv, x) {
  (rv[x[key]] = rv[x[key]] || []).push(x)
  return rv
}, {})

export const areObjEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const USER_TABS_KEY = 'userTabs'

export const MD_NAME = 'Management Dashboard'

export const NO_ACCESS = 'No Access'

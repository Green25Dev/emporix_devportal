export function openModal (component, props = {}, isClosable = true) {
  return new Promise((resolve, reject) => {
    $nuxt.$emit('openModal', {
      component,
      props,
      isClosable,
      resolve
    })
  })
}

export const convertAccessTypesToDropdown = (accessType) => {
  return ({
    label: accessType.title,
    value: accessType.title,
    id: accessType.const
  })
}

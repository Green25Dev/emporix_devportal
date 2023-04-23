export async function fetchAccessTypes (appId) {
  try {
    this.accessTypes = [...this.accessTypes, ...await this.$authAdapterService().getAccessTypes(appId)]
  } catch (error) {
    console.error('Access types not fetched properly', error)
  }
}

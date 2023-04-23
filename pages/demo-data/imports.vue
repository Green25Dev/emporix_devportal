<template>
    <div class="pb-6 add-product-wrapper padded-content">
        <PortalHeader :title="$t('demo.product.importedJobs')" />
        <PortalContent>
            <ImportJobTable />
        </PortalContent>
    </div>
</template>

<script>
import PortalHeader from '~/components/common/demo/PortalHeader.vue'
import PortalContent from '~/components/common/demo/PortalContent.vue'
import ImportJobTable from '~/components/common/demo/ImportJobTable.vue'

export default {
   
    components: {
        PortalContent,
        PortalHeader,
        ImportJobTable
    },
    layout: 'portal',
   
}
</script>

<style lang="scss" scoped>
    
</style>
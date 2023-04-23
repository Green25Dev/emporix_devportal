<template>
    <div class="pb-6 add-product-wrapper padded-content">
        <PortalHeader :title="$t('demo.import.jobEvents')" />
        <PortalContent>
            <JobEventTable :jobId="jobId"/>
        </PortalContent>
        
    </div>
</template>

<script>
    import PortalHeader from '~/components/common/demo/PortalHeader.vue'
    import PortalContent from '~/components/common/demo/PortalContent.vue'
    import JobEventTable from '~/components/common/demo/JobEventTable.vue'

    export default {
        components:{
            PortalHeader,
            PortalContent,
            JobEventTable
        },
        data (){
            return {
                jobId: ''
            }
        },
        async mounted(){
            this.jobId = this.$route.query.id
        },
        layout: 'portal'
    }
</script>

<style lang="scss" scoped>
    
</style>
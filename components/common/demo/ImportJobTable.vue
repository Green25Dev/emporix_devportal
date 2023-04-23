<template>
    <div class="content-wrapper">
        <div v-if="categoryLoading" class="flex justify-content-center circular-loading">
            <v-progress-circular  
                :size="70"
                :width="7" 
                color="#2F3270" 
                indeterminate  
            />
        </div>
        <div class = "job-event-table">
            <div class="hidden md:block">
                <v-data-table
                    :headers = "headers"
                    :items = "importedJobs"
                    :search  ="search"
                    class = "applications-grid col-12 p-0"
                    :items-per-page = "itemsPerPage"
                    :footer-props = "{
                        showFirstLastPage: true,
                        firstIcon: 'mdi-page-first',
                        lastIcon: 'mdi-page-last',
                        itemsPerPageText: 'Items per page'
                    }"
                    @page-count = "pageCount = $event"
                >
                <template #item.actions = "{ item }">
                    <div class = "actions flex justify-content-end">
                        <NuxtLink :to = "'/demo-data/import/job?id=' + item.job_id">
                            <img src = "/icons/arrow-right-black.svg">
                        </NuxtLink>
                    </div>
                </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>>

<script>
    import { iceCatDemoRequest } from '~/api/icecatDemo'

    export default {
        
        data () {
            return {
                categoryLoading: false,
                search: '',
                page: 1,
                pageCount: 0,
                importedJobs: [],
                itemsPerPage: 10,
                mobileHeaders:[
                    {
                        value: 'job_id'
                    }
                ],
                headers:[
                    {
                        text: this.$t('demo.import.jobId'),
                        value: 'job_id'
                    },
                    {
                        text: this.$t('demo.import.tenantName'),
                        value: 'tenant_name'
                    },
                    {
                        text: this.$t('demo.import.status'),
                        value: 'status'
                    },
                    {
                        text: this.$t('demo.import.createdTime'),
                        value: 'created_time'
                    },
                    {
                        text: "",
                        value: 'actions'
                    }
                ]
            }
        },
        async mounted(){
            await this.loadImportedJobs()
            this.loading = false
        },
        computed:{
            tenant() {
                return  this.$store.getters['auth/getTenant']().tenant
            }

        },

        watch: {
            tenant() {
                this.loadImportedJobs()
            }
        },
       
        methods:{
            async loadImportedJobs (){
                this.categoryLoading = true
                const data = {
                    "tenant_name": this.tenant
                }
                const url = `${this.$config.ICECATDEMO_API_URL}search_jobs_for_tenant`
                const headers = { 
                    "Authorization": "Basic " + btoa(`${this.$config.ICECATDEMO_USER}:${this.$config.ICECATDEMO_PWD}`),
                    "Content-Type": "application/json"
                }
                const res = await iceCatDemoRequest(url , data , headers)
                this.importedJobs = res !== undefined? res['data']['result'] : []
                this.categoryLoading = false
            }
        }
    }
</script>

<style lang="scss" scoped>
.circular-loading {
    position: fixed;
    margin-left: 25%;
    margin-top: 6%;
}
</style>
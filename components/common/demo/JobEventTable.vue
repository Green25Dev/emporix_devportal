<template>
    <div v-if="loading" class="flex justify-content-center p-3">
        <v-progress-circular 
            :size="70"
            :width="7" 
            color="#2F3270" 
            indeterminate />
    </div>
    <div v-else class="import-job-table">
        <div class="hidden md:block">
            <v-data-table
                :headers="headers"
                :items="jobEvents"
                :search="search"
                class="applications-grid col-12 p-0"
                :items-per-page="itemsPerPage"
                :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-page-first',
                    lastIcon: 'mdi-page-last',
                    itemsPerPageText: 'Items per page'
                }"
                @page-count="pageCount = $event"
            >
                <template #item.event_data="{ item }">
                    <div class="event_data">{{ JSON.stringify(value = item.event_data, space = 4) }}</div>
                </template>
            </v-data-table>
        </div>
    </div>
</template>>

<script>
    import { iceCatDemoRequest } from '~/api/icecatDemo/'
    export default {
        props:{
            jobId: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                loading: true,
                search: '',
                currentJobId: '',
                page: 1,
                pageCount: 0,
                jobEvents: [],
                itemsPerPage: 20,
                mobileHeaders:[
                    {
                        value: 'event_type'
                    }
                ],
                headers:[
                    {
                        text: this.$t('demo.import.jobId'),
                        value: 'job_id'
                    },
                    {
                        text: this.$t('demo.import.importJobId'),
                        value: 'import_job_id'
                    },
                    {
                        text: this.$t('demo.import.eventType'),
                        value: 'event_type'
                    },
                    {
                        text: this.$t('demo.import.eventData'),
                        value: 'event_data'
                    },
                    {
                        text: this.$t('demo.import.createdTime'),
                        value: 'created_time'
                    }
                ]
            }
        },
        async mounted(){
            this.currentJobId = this.jobId
            
            await this.loadJobEvents()
            
        },
        watch: {
            jobId: function(newValue, oldValue){
                this.currentJobId = newValue
                this.loadJobEvents()
            }
        },
        methods:{
            async loadJobEvents (){
                this.loading = true
                const data = {
                    "job_id": this.currentJobId
                }
                if(this.currentJobId === undefined || this.currentJobId === "") return

                const url = `${this.$config.ICECATDEMO_API_URL}search_job_events_for_jobID`
                const headers = { 
                    "Authorization": "Basic " + btoa(`${this.$config.ICECATDEMO_USER}:${this.$config.ICECATDEMO_PWD}`),
                    "Content-Type": "application/json"
                }
                const res = await iceCatDemoRequest(url, data , headers)             
                this.jobEvents = (res.data.result !== undefined? res.data.result:[])
                this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>
.event_data {
    text-overflow: ellipsis;
    width: 200px;
    word-wrap: break-word;
    padding: 15px 0;
}
</style>
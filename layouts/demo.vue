<template>
    <div v-if="isUserLogged" class="app" data-app>
        <Modal :droppable="false" className="demoModal"/>
        <Header />
        <Toolbar :step="currentStep" />
        <div v-if="nextLoading" class="flex justify-content-center circular-loading">
                <v-progress-circular  
                    :size="70"
                    :width="7" 
                    color="#2F3270" 
                    indeterminate  />
        </div>
        <main class="main">
            <div class="content">
                <Nuxt />
            </div>
        </main>
        <Nextbar v-on:next-bar-clicked="Next"/>
    </div>
</template>

<script>
import Modal from '~/components/common/Modal'
import Header from '~/components/Header'
import Toolbar from '~/components/common/toolbar/Toolbar'
import Nextbar from '~/components/common/toolbar/Nextbar'
import { openModal } from '~/plugins/modal-service'
import ImportLoadingBox from '~/components/common/demo/ImportLoadingBox'
import ConfirmBox from '~/components/common/ConfirmBox'
import { iceCatDemoRequest } from '~/api/icecatDemo'

const maxTimes = 5
let currentCount = 0

const timeout =  new Promise((resolve)=>setTimeout(() => {
        resolve('ok');
    }, 2000)); 

export default {
    components: {
        Toolbar,
        Header,
        Modal,
        Nextbar
    },
    beforeRouteEnter () {
        if (!this.isUserLogged) {
        this.$router.push('/logout')
        }
    },
    data () {
        return {
            mobileMenuExpanded: false,
            tenantOptions: [], 
            nextLoading : false,
            
        }
    },
    computed: {
        authData() {
            return this.$store.getters['auth/getAuthData']()
        },
        isUserLogged() {
            return this.$store.getters['auth/isUserLogged']()
        },
        currentStep() {
            return this.$store.getters['demo/getStep']()
        },
        rootCategoryId() {
            return this.$store.getters['demo/getRootCategoryId']()
        },
        mode() {
            return this.$store.getters['demo/getMode']()
        }
    },
    watch: {
        isUserLogged: {
            immediate: true,
            handler (newValue) {
                if (!newValue) {
                    this.$router.push('/logout')
                }
            }
        }
    },
    mounted () {
        
        if (this.authData.login.length > 0 && (this.authData.termsAndCondition === undefined ||
            this.authData.termsAndCondition === false ||
            this.authData.termsAndCondition === 'false'
        )) {
            this.$router.push('/terms-and-condition')
        }
    },
    methods:{
        async Next(){
            switch(this.currentStep){
                case 0:
                    this.$store.dispatch('demo/goNext')
                    $nuxt.$router.push({
                        'path': '/demo-data/product/advanced/category'
                    });
                    
                    break
                case 1:
                    if(this.mode === false && this.rootCategoryId === -1){
                        const alert = this.$i18n.t('demo.product.basicModeAlert')
                        this.$toast.error(alert)
                    }else{
                        this.$store.dispatch('demo/goNext')
                        $nuxt.$router.push({
                            'path': '/demo-data/product/advanced/config_imports'
                        });
                    }
                    
                    break
                case 2:
                    // Call import API
                    this.nextLoading = true
                    const paylodData = this.$store.getters['demo/getProductPayload']()
                    const categoryList = this.$store.getters['demo/getCategoryList']()
                    const supplierList = this.$store.getters['demo/getSupplierList']()
                    let generatePrices = []
                    const applications = await this.$authAdapterService().getApis()
                    const secret = applications[0].credentials.clientSecret
                    const clientId = applications[0].credentials.clientId
                    const tenant = this.$store.getters['auth/getTenant']().tenant
                 
                    const categoryIds = categoryList.map((row) => {
                        generatePrices.push({
                            from: Number(paylodData.priceFrom),
                            to: Number(paylodData.priceTo),
                        })
                        return row.category_id
                    })
                    
                    const supplierIds = supplierList.map((row) => {
                    
                        return row.supplier_id
                    })
                    const data = {
                        "categoryIds": categoryIds,
                        "supplierIds": supplierIds,
                        "secret": secret,
                        "client_id": clientId,
                        "tenant": tenant,
                        "env": "stage",
                        "hook_url": "",
                        "languages": [
                            "1"
                        ],
                        "max_images": paylodData.imageQuantity,
                        "low_stock_max": paylodData.stockLow,
                        "medium_stock_max": paylodData.stockMedium,
                        "high_stock_max": paylodData.stockHigh,
                        "generatePrices": generatePrices,
                        "max_products": paylodData.maxProduct,
                    }
                    
                    this.nextLoading = false
                    const confirmation = await openModal(ConfirmBox, {
                        header: 'Importing...',
                        text: `Are you sure you want to import ${paylodData.maxProduct} products with ${categoryIds.length} categories and ${supplierIds.length} suppliers on ${tenant} tenant?`
                    })

                    if (confirmation) {
                        this.$store.dispatch('demo/updateEventStatus', {"event_status": "", "event_data":""})
                        const importUrl = this.$config.ICECATDEMO_API_URL
                        const headers = { 
                            "Authorization": "Basic " + btoa(`${this.$config.ICECATDEMO_USER}:${this.$config.ICECATDEMO_PWD}`),
                            "Content-Type": "application/json"
                        }
                        await iceCatDemoRequest(importUrl, data , headers)
                        currentCount = 0;
                        this.watchImportStatus()
                        const importLoading = await openModal(ImportLoadingBox, {
                            header: '',
                            text: ``
                        });
                    }
                    break
                default: break
            }
        },

        async watchImportStatus() {
            const jobApiURL = `${this.$config.ICECATDEMO_API_URL}search_jobs_for_tenant`

            const tenant = this.$store.getters['auth/getTenant']().tenant
            await timeout;
            const data = {
                "tenant_name": tenant
            }
            const headers = { 
                    "Authorization": "Basic " + btoa(`${this.$config.ICECATDEMO_USER}:${this.$config.ICECATDEMO_PWD}`),
                    "Content-Type": "application/json"
            }
            const response = await iceCatDemoRequest(jobApiURL , data , headers)
            const resultResponse = response['data']['result']
            let inProgressJob = {}
            let row = {}
            if(resultResponse){
                 row = resultResponse[0]    
                if(row['status'] === 'IN_PROGRESS'){
                    inProgressJob = row
                } 
            }

            if(Object.keys(inProgressJob).length > 0){
                const jobEventApi =  `${this.$config.ICECATDEMO_API_URL}search_job_events_for_jobID`
                const payload = {
                    "job_id": inProgressJob['job_id']
                }
                while(true){
                    const response = await iceCatDemoRequest(jobEventApi, payload , headers)
                    const jobEventStatus = response['data']['result']
                    if(jobEventStatus !== undefined){
                        jobEventStatus = (jobEventStatus.length > 0) ? jobEventStatus[0]: {}
                        if(Object.keys(jobEventStatus).length !== 0) {
                        this.$store.dispatch('demo/updateEventStatus', {
                            'event_type': jobEventStatus['event_type'],
                            'event_data': jobEventStatus['event_data']
                        })
                        
                        if(jobEventStatus['event_type'] === "COMPLETED" ) break
                        }
                    }
                    await timeout;
                }

            }
            else if(currentCount < maxTimes) {
                currentCount += 1
                setTimeout(this.watchImportStatus, 500)
            }else {

                return
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$shadow: 2px 2px 32px rgba(0, 0, 0, 0.05);

.header {
  width: 100%;
  top: 0;
  left: 0;
}
.demoModal {
  background: #4f4f4fc7 !important;
}
.circular-loading {
        position: fixed;
        margin-left: 50%;
        margin-top: 6%;
    }
.main {
  height: calc(100vh - 80px - 70px - 88px);
  display: flex;
  width: 100vw;
  background: white;
  overflow-y: auto;
  @include tablet-down() {
    height: calc(100vh - 80px - 88px);
  };

  .content {
    width: 100%;
    @include tablet-down() {
      padding: 48px;
    };
    @include phone-only() {
      padding: 0;
    };
  }
  
}
</style>

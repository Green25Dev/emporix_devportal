<template>
    <div class = 'demo-toolbar'>
        <div class = 'toolbar-caption'>
            <p class = 'product-cotent-caption'>{{ $t('demo.product.productContent') }}</p>
        </div>
        <div class = 'mode'>
            <div class = 'mode-switch'>
                <ToggleButton id = "mode" v-model = "mode"/>
                <span class='mode-label'>{{ $t('demo.product.advancedMode')}}</span>
            </div>
            <div class = 'demo-tenant-switch'>
                <ToggleButton id = "demo" v-model = "demo"/>
                <span class = 'mode-label'>{{ $t('demo.product.demoTenant')}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import ToggleButton from '~/components/common/ToggleButton.vue'
    import { Octokit } from "@octokit/rest";
    import { Base64 } from 'js-base64'

    export default {
        components:{
            ToggleButton
        },
        data (){
            return {
                mode: false,
                demo: false
            }
        },
        methods: {
            async saveTenantCliendIdToEnv() {
                // Get Storefront API
                const applications = await this.$authAdapterService().getApis()
                const clientId = applications[1].credentials.clientId
                const tenant = this.$store.getters['auth/getTenant']().tenant
                
                // Save tenant's name and client Id to Github env using Github API.
                const githubPersonalToken = this.$config.GITHUB_PERSONAL_TOKEN
                const octokit = new Octokit({ auth: githubPersonalToken}) 
                const res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}',{
                    owner: 'emporix',
                    repo: 'b2b-reference-storefront',
                    path: 'src/tenant.json',
                    branch: 'main'
                })
            
                let tenantList = {}
                try {
                    tenantList = res.data ? JSON.parse(Base64.decode(res.data.content)): {}
                } catch (e){

                }
                const sha = res.data ? res.data.sha: ''
               
                if(!(tenant in tenantList)){
                    tenantList[tenant] = {'tenant': tenant, 'storefront_client_id': clientId}
                    const contentEncoded =  Base64.encode(JSON.stringify(tenantList, null, '\t'))
                    const {data} = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                        owner: 'emporix',
                        repo: 'b2b-reference-storefront',
                        path: 'src/tenant.json',
                        branch: 'main',
                        message: 'insert new tenant information',
                        committer: {
                            name: this.$config.GITHUB_USER_NAME,
                            email: this.$config.GITHUB_USER_EMAIL
                        },
                        content: contentEncoded,
                        sha: sha
                    });
                }
              

            }
        },
        async mounted() {
            this.mode = this.$store.getters['demo/getMode']()
            this.demo = this.$store.getters['demo/getDemo']()
        },
        watch: {
            mode (mode){
                this.$store.dispatch("demo/updateMode", mode)   
                if(mode === true){
                    this.$store.dispatch('demo/setStep', 0)
                }
                else{
                    this.$store.dispatch('demo/setStep', 2)
                }
                
            },
            demo (demo){
                this.$store.dispatch("demo/updateDemo", demo)
                if(demo)
                    this.saveTenantCliendIdToEnv()
            }
        }
    }
</script>

<style lang="scss" scoped>
.demo-toolbar {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    padding:0px;
    @include phone-only(){
        display: block;
        margin-bottom: 10px;
    }
}
.toolbar-caption {
    width: calc(100% - 168px);
    @include phone-only(){
        width: 100%
    }
}
.mode {
    padding: 8px;
    width: 168px;
}
.mode-label {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    margin-left: 8px;
}
.product-cotent-caption {
    font-size: 20px;
    padding-top:8px;
    font-weight: 700;
    line-height: 24px;
    color: $brand-grey-600
}
.product-result {
    padding-top: 16px;
    padding-bottom: 8px;
    color:#99ACBC;
    font-size: 14px;
    line-height: 17px;
    font-weight: 700;
}
</style>
<template>
    <div class="pb-6 add-product-wrapper padded-content">
        <div class="title-container">
            <h2 class="catalog-caption">
                <span class="tenant">{{tenant}}:&nbsp;</span>
                {{ $t('demo.product.catalogCaption') }}
            </h2>
        </div>
        <div class="content-wrapper">
            <div v-if="categoryLoading" class="flex justify-content-center circular-loading">
                <v-progress-circular  
                    :size="70"
                    :width="7" 
                    color="#2F3270" 
                    indeterminate  />
            </div>
            <div class="content">
                <div class="category">
                    <TextInput
                        v-model="category"
                        class="category-name-input"
                        :label="$t('demo.product.category.label')"
                        :novalidate="true"
                        :big="true"
                        @enterKeyUp = "getItemsWithCategory"
                    />
                    <div class="items-result">
                        {{ $t('demo.product.totalNumberOfSearchedCategories')}} &nbsp; ({{ searchedCategoryCount}})
                    </div>
                    <ItemsList :list=searchedCategoryList  prefix="category" mode = "search"/>
                    <div class="items-result">
                        {{ $t('demo.product.totalNumberOfCategories')}} &nbsp; ({{ categoryCount}})
                    </div>
                    <ItemsList :list=categoryList  prefix="category" mode = "import" />  
                </div>
                <div class="supplier">
                    <TextInput
                        v-model="supplier"
                        class="supplier-name-input"
                        :label="$t('demo.product.supplier.label')"
                        :novalidate="true"
                        :big="true"
                        @enterKeyUp = "getItemsWithSupplier"
                    />
                    <div class="items-result">
                        {{ $t('demo.product.totalNumberOfSearchedCategories')}} &nbsp; ({{ searchedSupplierCount}})
                    </div>
                    <ItemsList :list=searchedSupplierList  prefix="supplier" mode = "search"/>
                    <div class="items-result">
                        {{ $t('demo.product.totalNumberOfSuppliers')}} &nbsp; ({{ supplierCount}})
                    </div>
                    <ItemsList :list=supplierList  prefix = "supplier" mode = 'import'/>
                    
                </div>
                
            </div>
            <div class = 'totalNumber'>
                {{  $t('demo.product.numberOfMatchingProducts')  }} 
                <span v-if="numberMatchingProductsLoading">
                    <v-progress-circular  indeterminate  />
                </span>
                <span v-else>
                    {{totalProducts}}
                </span>
                
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from '~/components/common/TextInput'
import ItemsList from '~/components/common/ItemsList'
import { iceCatDemoRequest } from '~/api/icecatDemo/'

export default {
    components: {
        TextInput,
        ItemsList
    },
    layout: 'demo',
    async mounted () {
        this.$store.dispatch('demo/setStep', 1)
    },
    watch : {
        supplierList() {
            this.getNumberProduct()
        },
        categoryList() {
            this.getNumberProduct()
        }
    },
    methods: {
        async getItemsWithCategory () {  
            const searchRegionApi = `${this.$config.ICECATDEMO_API_URL}search_supplier_category_index`
            this.categoryLoading = true
            const data = {
                "search_region": "category",
                "search_string": this.category
            }
            const headers = { 
                "Authorization": "Basic " + btoa(`${this.$config.ICECATDEMO_USER}:${this.$config.ICECATDEMO_PWD}`),
                "Content-Type": "application/json"
            }
            const response = await iceCatDemoRequest(searchRegionApi , data , headers)
            let result = response['data']['result']
            this.categoryLoading = false
            if(result === undefined) result= []
            this.$store.dispatch('demo/putSearchedCategoryList', result)

        },
        async getItemsWithSupplier () {
            this.categoryLoading = true
            const searchRegionApi = `${this.$config.ICECATDEMO_API_URL}search_supplier_category_index`
            const data = {
                "search_region": "supplier",
                "search_string": this.supplier
            }
            const headers = { 
                "Authorization": "Basic " + btoa(`${this.$config.ICECATDEMO_USER}:${this.$config.ICECATDEMO_PWD}`),
                "Content-Type": "application/json"
            }
            const response = await iceCatDemoRequest(searchRegionApi , data , headers)
            let res = response['data']['result']
            this.categoryLoading = false
            if(res === undefined) res= []
            this.$store.dispatch('demo/putSearchedSupplierList', res)
        },

        async getNumberProduct() {
            let categoryIdList = []
            let supplierIdList = []
            
            this.categoryList.map((category) => {
                categoryIdList.push(category['category_id'])
            })

            this.supplierList.map((supplier) => [
                supplierIdList.push(supplier['supplier_id'])
            ])

            const getNumberProductsApi = `${this.$config.ICECATDEMO_API_URL}search_Catalog_index`

            if (categoryIdList.length === 0 && supplierIdList.length === 0 ){
                this.$store.dispatch('demo/setTotalMatchingProducts', 0)
            }
            else{
                this.numberMatchingProductsLoading = true
                const data = {
                    'categoryIds' : categoryIdList,
                    'supplierIds' : supplierIdList
                }
                const headers = { 
                    "Authorization": "Basic " + btoa(`${this.$config.ICECATDEMO_USER}:${this.$config.ICECATDEMO_PWD}`),
                    "Content-Type": "application/json"
                }
                const response = await iceCatDemoRequest(getNumberProductsApi , data , headers)
                const count = response['data']['count']
                this.$store.dispatch('demo/setTotalMatchingProducts', count)
                this.numberMatchingProductsLoading = false

            }
            
        }

    },
    computed:{
        tenant() {
            return this.$store.getters['auth/getTenant']().tenant
        },
        supplierList() {
            return this.$store.getters['demo/getSupplierList']()
        },
        searchedSupplierList() {
            return this.$store.getters['demo/getSearchedSupplierList']()
        },
        searchedSupplierCount() {
            return this.searchedSupplierList.length
        },
        categoryList() {
            return this.$store.getters['demo/getCategoryList']()
        },
        searchedCategoryList() {
            return this.$store.getters['demo/getSearchedCategoryList']()
        },
        searchedCategoryCount() {
            return this.searchedCategoryList.length
        },
        categoryCount() {
            return this.categoryList.length
        },
        supplierCount() {
            return this.supplierList.length
        },
        totalProducts() {
            return this.$store.getters['demo/getTotalMatchedProducts']()
        }

    },
    data() {
        return {
            category: "",
            supplier: "",
            categoryLoading: false,
            numberMatchingProductsLoading : false,
            
        }
    }
}

</script>

<style lang="scss" scoped>
.catalog-caption {
    font-size: 24px;
    line-height: 29px;
    font-weight: 700;
    color: $brand-navy-900;
}
.tenant {
    color:#128AFB
}
.add-product-wrapper {
    padding-top: 72px;
}
.content-wrapper {
    padding: 0px 80px 0px 80px;
    margin: auto;
    max-width: 1024px;
}
.content {
    display: flex;
    gap: 40px;
    justify-content: center;
    margin: auto;
    @include tablet-down() {
        display: grid;
    }
}
.category, .supplier {
    width: 320px
}
.category {
    border-right: 1px solid #D9D9D9;
    padding-right:10px;
}
.items-result {
    margin-top: 16px;
    padding: 8px 0px 8px 0px;
    color: #99ACBC;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
}
.category-name-input input, .supplier-name-input input {
    padding: 8px 0px 8px 16px;
}
.totalNumber {
    height: 40px;
    padding: 50px;
}
.circular-loading {
    position: fixed;
    margin-left: 25%;
    margin-top: 6%;
}
</style>
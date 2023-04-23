<template>
    <div class = "pb-6 add-product-wrapper padded-content">
        <div class = "title-container">
            <h2 class = "catalog-caption">
                <span class = "tenant">{{tenant}}:&nbsp;</span>
                {{ $t('demo.product.configureImport') }}
            </h2>
        </div>
        <div class = "content-wrapper">
            <div class = "content">
                <div class = "cateogory-supplier-list">
                    <p class = "list_caption">{{ $t('demo.product.selectedItems')}}</p>
                    <p class = "items-result">
                        {{ $t('demo.product.numberOfMatchingProducts')}} &nbsp; {{totalProducts}}
                    </p>

                    <div class = "category">
                        <p class = "label">{{ $t('demo.product.category.label')}}</p>
                        <ItemsList :list = categoryList  access = "view" prefix = "category"/>
                    </div>

                    <div class = "supplier">
                        <p class = "label">{{ $t('demo.product.supplier.label')}}</p>
                        <ItemsList :list = supplierList  access = "view" prefix = "supplier"/>
                    </div>
                </div>
                <FilterContent />
            </div>
        </div>
    </div>
</template>

<script>
import TextInput from '~/components/common/TextInput'
import ItemsList from '~/components/common/ItemsList'
import FilterContent from '~/components/common/demo/FilterContent.vue'

export default {
    components: {
        TextInput,
        ItemsList,
        FilterContent
    },
    layout: 'demo',
    async mounted () {
        this.$store.dispatch('demo/setStep', 2)
    },
    computed: {
        tenant (){
            return this.$store.getters['auth/getTenant']().tenant
        },
        supplierList (){
            return this.$store.getters['demo/getSupplierList']()
        },
        categoryList (){
            return this.$store.getters['demo/getCategoryList']()
        },
        totalProducts() {
            return this.$store.getters['demo/getTotalMatchedProducts']()
        }
    },
    data() {
        return {
            quantity: '1'
        }
    }
}

</script>

<style lang="scss" scoped>
.filter-item {
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
}
.cateogory-supplier-list {
    @include demo-media(){
        display: none
    }
}
.quantity-item {
    padding-bottom: 24px;
    width: 100%;
    border-bottom: 2px solid #D9D9D9;
    margin-bottom: 24px;
    margin-left: auto;
}

.high_value { 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 142px;
    height: 62px;
}
.stock_name {
    width: 53px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 8px 0px;
    gap: 8px;
    width: 53px;
}
.low_value {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 8px 10px;
    gap: 10px;

    width: 40px;
    height: 62px;
}
.stock_range {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px 0px 0px 8px;
    gap: 24px;

    width: 292px;
    height: 62px;
}
.stock-level-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 40px;

    width: 385px;
    height: 62px;
}
.right {
    float:right;
}
.break-line {
    width: 100%;
    height: 2px;
    background: #D9D9D9;
}
.my-24 {
    margin: 24px 0px 24px 0px;
}
.quantity-input-wrapper {
    width: 142px;
    margin-left: auto;
}
.list_caption {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    padding: 8px, 0px, 8px, 0px;
    margin-bottom: 8px;
}
.filter-items {
    width: calc(100% - 320px);
    @include demo-media(){
        width: 80%;
        margin: auto
    }
}
.items-result {
    margin-top: 16px;
    padding: 8px 0px 8px 0px;
    color: #99ACBC;
    font-size: 14px;
    font-weight: 700;
    line-height: 17px;
}
.label {
    font-style: normal;
    margin-top: 32px;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    color: #99ACBC;
}


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
    @include tablet-down(){
        padding: 0px 10px 0px 10px;
    }
}
.content {
    display: flex;
    gap: 40px;
    margin: auto;
    @include tablet-down() {
        display: grid;
    }
}
.category, .supplier {
    width: 320px;  
}
.category {
    border-right: 1px solid #D9D9D9;
    padding-right:10px;
}

.category-name-input input, .supplier-name-input input {
    padding: 8px 0px 8px 16px;
}
</style>
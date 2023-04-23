<template>
    <div class="pb-6 add-product-wrapper padded-content">
        <PortalHeader :title="$t('demo.product.catalogCaption')" />
        <PortalContent>
            <DemoToolbar />
            <div class="categories">
                <CategoryGroup v-for="(categories, index) in chunkCategoryGroup" :key = "index">
                    <CategoryRow v-for="(subCategories, subIndex) in categories" :key = "index + '_' + subIndex">
                        <Title v-for="category in subCategories" class="title-wrapper" v-model="activeCategoryId" :class="activeCategoryId === category.catId ?'active':''" :id="category.catId" :active="activeCategoryId" :name="category.name" :imgName="category.imgName" :key="category.name"></Title>
                    </CategoryRow>
                </CategoryGroup>
            </div>
        </PortalContent>
        
    </div>
</template>

<script>
import Title from '~/components/common/Title.vue'
import PortalHeader from '~/components/common/demo/PortalHeader.vue'
import PortalContent from '~/components/common/demo/PortalContent.vue'
import DemoToolbar from '~/components/common/demo/DemoToolbar.vue'
import { categoryOptions } from '~/commons/categoryOptions'
import Vue from 'vue';

const CategoryRow = Vue.component('category-row', {
    template: `<div class="category-row">
        <slot></slot>
    </div>`
});

const CategoryGroup = Vue.component('category-group', {
  props: [],
  template: `<div class="category-group">
    <slot></slot>
  </div>`
});

import { iceCatDemoRequest } from '~/api/icecatDemo/'

export default {
    components: {
        Title,
        PortalHeader,
        PortalContent,
        DemoToolbar,
        CategoryGroup,
        CategoryRow
    },
    layout: 'demo',
    async mounted() {
        this.$store.dispatch('demo/setStep', 2)
        this.$store.dispatch('demo/updateRootCategory', -1)
        this.$store.dispatch('demo/putCategoryList', [])
        this.$store.dispatch('demo/putSupplierList', [])
        this.$store.dispatch('demo/setTotalMatchingProducts', 0)
        this.$store.dispatch('demo/putSearchedSupplierList', [])
        this.$store.dispatch('demo/putSearchedCategoryList', [])
    },
    data() {
        return {
            mode: false,
            demo: false,
            activeCategoryId: -1,
            categoryOptions
            
        }
    },
    computed:{
        chunkCategoryGroup() {
            let chunkedCategory = [], subChunkedCategory, categories, i, j, k, l
            for(i = 0; i < this.categoryOptions.rootCategories.length; i += this.categoryOptions.chunkSize){
                const subCategory = this.categoryOptions.rootCategories.slice(i, i + this.categoryOptions.chunkSize)
                subChunkedCategory = []
            
                for(j = 0; j < this.categoryOptions.subChunkSize && j < subCategory.length; j++){
                    categories = [] 
                    for(k = 0; ; k++){
                        l = j + k * this.categoryOptions.subChunkSize
                        if(l >= subCategory.length) break;
                        categories.push(subCategory[l])
                    }
                    subChunkedCategory.push(categories)
                }
                chunkedCategory.push(subChunkedCategory)
            }
            return chunkedCategory
        },
    },
    watch:{
        async activeCategoryId (){
            this.$store.dispatch('demo/updateRootCategory', this.activeCategoryId)
            const selectedCategory = categoryOptions.rootCategories.filter(object => object.catId === this.activeCategoryId)
            const category = [
                {
                    'category_id' : this.activeCategoryId,
                    'category_name' : selectedCategory[0].name
                }
            ]
            this.$store.dispatch('demo/putCategoryList', category)

            const getNumberProductsApi = `${this.$config.ICECATDEMO_API_URL}search_Catalog_index`

            const data = {
                'categoryIds' : [this.activeCategoryId],
                'supplierIds' : []
            }
            const headers = { 
                "Authorization": "Basic " + btoa(`${this.$config.ICECATDEMO_USER}:${this.$config.ICECATDEMO_PWD}`),
                "Content-Type": "application/json"
            }
            const res = await iceCatDemoRequest(getNumberProductsApi , data , headers)
            const count = res['data']['count']
            this.$store.dispatch('demo/setTotalMatchingProducts', count)

        },
    }
}

</script>

<style lang="scss" scoped>
.title-wrapper {
    margin-top: 0px;
    margin-bottom: 0px;
    &.active{
        background: white;
        border: 1px solid $brand-grey-400
    }
}
.add-product-wrapper {
    padding-top: 72px;
}

.categories {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
    @include demo-media(){
        display: flex;
        float: left;
        flex-wrap: wrap;
    }
    @include tablet-down(){
        display: block;
        float: center;
    }
}
.category-group {
    background: #F0F4F8;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px;
    gap: 8px;
    @include desktop-down(){
        display: block !important;
    }
}
.category-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 16px;
}
</style>
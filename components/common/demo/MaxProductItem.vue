<template>
    <div class = "max-product-item">
        <TextInput
            v-model = "maxProduct"
            class = "max-product-input"
            :label = "$t('demo.product.maxProduct')"
            :novalidate = "true"
            :big = "true"
        />
    </div>
</template>

<script>
    import TextInput from '~/components/common/TextInput.vue'

    export default {
        
        components: {
            TextInput
        },
        async mounted() {
            this.maxProduct = this.$store.getters['demo/getMaxProduct']()
        },
        data() {
            return {
                maxProduct: '1000'
            }
        },
        watch: {
            maxProduct (newValue){
                this.$store.dispatch('demo/updateMaxProduct', newValue)
            }
        }
    }
</script>

<style lang="scss" scoped>
.max-product-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 0px 0px 8px;
    gap: 8px;
    width: 100%;
    height: 65px;
}
.max-product-input {
    padding: 0px;
    gap: 8px;
    width: 150px !important;
    height: 65px;
}
</style>
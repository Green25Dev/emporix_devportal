<template>
    <div class="price-range-wrapper">
        <div class="title">
            {{$t('demo.product.priceRange')}}
        </div>
        <div class="price-range">
            <TextInput
                v-model="priceFrom"
                class="price-item-input"
                :label="$t('demo.product.from')"
                :novalidate="true"
                :big="true"
            />
            <TextInput
                v-model="priceTo"
                class="price-item-input"
                :label="$t('demo.product.to')"
                :novalidate="true"
                :big="true"
            />

        </div>
    </div>
</template>

<script>
    import TextInput from '~/components/common/TextInput.vue'

    export default{
        props: {

        },
        components:{
            TextInput
        },
        async mounted() {
            this.priceFrom = this.$store.getters['demo/getPriceFrom']()
            this.priceTo = this.$store.getters['demo/getPriceTo']()
        },
        data (){
            return {
                priceFrom: '1',
                priceTo: '100'
            }
        },
        watch: {
            priceFrom (newValue){
                this.$store.dispatch('demo/updatePriceFrom', newValue)
            },
            priceTo (newValue){
                this.$store.dispatch('demo/updatePriceTo', newValue)
            }
        }
    }
</script>

<style lang="scss" scoped>
.price-range-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 0px;
    gap: 24px;
    width: 100%;
    height: 78px;
}
.title {
    width: 84px;
    height: 20px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    margin:auto;
    color: #99ACBC;
    font-size: 14px;
    line-height: 20px;
}
.price-range {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 6px;
    width: calc(100% - 108px);
    height: 62px;
}
</style>

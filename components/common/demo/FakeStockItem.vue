<template>
    <div class = "fake-stock-item">
        <div class = "stock-item-name">
            {{stockLevel}}
        </div>
        <div class = "stock-item-range">
            <div class = "stock-low-value">
                {{lowStock}}
            </div>
            <TextInput
                v-model = "value"
                class = "stock-item-input"
                :label = "$t('demo.product.specifyRange')"
                :novalidate = "true"
                :big = "true"
            />
        </div>
    </div>
</template>

<script>
    import TextInput from '~/components/common/TextInput.vue'
    
    export default {
        components: {
            TextInput
        },
        props: {
            stockLevel: {
                type : String,
                deafult : ''
            }
        },
        data (){
            return {
                value : '1'
            }
        },
        async mounted (){
            switch(this.stockLevel){
                case 'Low':
                    this.value = this.$store.getters['demo/getStockLow']()
                    break
                case 'Medium':
                    this.value = this.$store.getters['demo/getStockMedium']()
                    break
                case 'High':
                    this.value = this.$store.getters['demo/getStockHigh']()
                    break
                default:
                    break
            }
        },
        computed: {
            lowStock () {
                switch(this.$props.stockLevel){
                    case 'Low':
                        return '1'
                    case 'Medium':
                        return (parseInt(this.$store.getters['demo/getStockLow']()) + 1).toString();
                    case 'High':
                        return (parseInt(this.$store.getters['demo/getStockMedium']()) + 1).toString()
                    default: 
                        return '1'
                }
            }
        },
        watch: {
            value (newValue){
                 switch(this.$props.stockLevel){
                    case 'Low':
                        this.$store.dispatch('demo/updateStockLow', newValue)
                        break
                    case 'Medium':
                        this.$store.dispatch('demo/updateStockMedium', newValue)
                        break
                    case 'High':
                        this.$store.dispatch('demo/updateStockHigh', newValue)
                        break
                    default: 
                        return '1'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.fake-stock-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 40px;
    width: 100%;
    height: 62px;
}
.stock-item-name {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 8px 0px;
    gap: 8px;
    width: 53px;
    height: 62px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
}
.stock-item-range {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0px 0px 0px 8px;
    gap: 24px;
    width: calc(100% - 53px) !important;
    height: 62px;
}
.stock-low-value {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 8px 10px;
    gap: 10px;
    width: 40px;
    height: 62px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
}
.stock-item-input {
    padding: 0px;
    gap: 8px;
    width: 150px !important;
    height: 62px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
}
.stock-item-input .input-label {
    font-family: 'Lato' !important;
    font-style: normal !important;
    font-weight: 700 !important;
    font-size: 13px !important;
    line-height: 14px !important;
}
.stock-item-input input {
    text-align: right !important;
}
</style>
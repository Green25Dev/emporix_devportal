<template>
    <div class = "image-quantity">
        <TextInput
            v-model = "quantity"
            class = "quantity-input"
            :label = "$t('demo.product.quantity')"
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
            this.quantity = this.$store.getters['demo/getImageQuantity']()
        },
        data() {
            return {
                quantity: '1'
            }
        },
        watch: {
            quantity (newValue){
                this.$store.dispatch('demo/updateImageQuantity', newValue)
            }
        }
    }
</script>

<style lang="scss" scoped>
.image-quantity {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 0px 0px 8px;
    gap: 8px;
    width: 100%;
    height: 65px;
}
.quantity-input {
    padding: 0px;
    gap: 8px;
    width: 150px !important;
    height: 65px;
}
</style>
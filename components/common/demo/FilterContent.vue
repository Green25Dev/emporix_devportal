<template>
    <div class = "wrapper">
        <div class = "filter-content">
            <PayloadItem payloadName = "Images">
                <ImageQuantityItem />
            </PayloadItem>
            <DivideItem />
            <PayloadItem payloadName = "Add Fake Stock Level">
                <div class = "stock-item-group">
                   <FakeStockItem stockLevel = "Low"/>
                   <FakeStockItem stockLevel = "Medium"/>
                   <FakeStockItem stockLevel = "High"/>
                </div>
            </PayloadItem>
            <DivideItem />
            <PayloadItem payloadName = 'Fake Pricing'>
                <PriceRangeItem />
            </PayloadItem>
            <DivideItem />
            <PayloadItem payloadName = 'Max Product'>
                <MaxProductItem />
            </PayloadItem>
        </div>
    </div>
</template>

<script>
    import PayloadItem from '~/components/common/demo/PayloadItem.vue'
    import DivideItem from '~/components/common/demo/DivideItem.vue'
    import TextInput from '~/components/common/TextInput'
    import ImageQuantityItem from '~/components/common/demo/ImageQuantityItem.vue'
    import FakeStockItem from '~/components/common/demo/FakeStockItem.vue'
    import PriceRangeItem from '~/components/common/demo/PriceRangeItem.vue'
    import MaxProductItem from '~/components/common/demo/MaxProductItem.vue'
    export default {
        props:{
            quantity:{
                type: String,
                default: '1'
            }
        },
        components: {
            PayloadItem,
            DivideItem,
            ImageQuantityItem,
            FakeStockItem,
            PriceRangeItem,
            MaxProductItem,
            TextInput
        },
       
    }
</script>

<style lang="scss" scoped>
.wrapper {
    width: calc(100% - 320px);
    @include demo-media(){
        width: 80%;
    }
}
.filter-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 16px;
    gap: 24px;
    
}
.stock-item-group {
    padding: 0px 8px 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 8px;
}
</style>
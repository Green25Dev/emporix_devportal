<template>
    <div class="filter-actions">
        <ButtonTertiary >
            {{ $t('demo.product.cancel')}}
        </ButtonTertiary>
        <ButtonPrimary >
            {{ $t('demo.product.applySettings')}}
        </ButtonPrimary>
    </div>
    
</template>

<script>
    import ButtonTertiary from '~/components/common/ButtonTertiary.vue'
    import ButtonPrimary from '~/components/common/ButtonPrimary.vue'
    
    export default {
        components: {
            ButtonTertiary,
            ButtonPrimary
        }
    }
</script>

<style lang="scss" scoped>
.filter-actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 8px;
    width: 100%;
    height: 56px;
}
</style>

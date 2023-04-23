<template>
    <div class = "next-bar-wrapper">
        <div class = "next-bar">
            <div @click="clicked"> 
                <ButtonPrimary label = "NEXT" :arrow="false"/>
            </div>
            <div> 
                <NuxtLink :to = "'/'">
                    <ButtonTertiary >
                        {{ $t('demo.product.cancel')}}
                    </ButtonTertiary>
                </NuxtLink>
                
            </div>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '~/components/common/ButtonPrimary.vue'
import ButtonTertiary from '~/components/common/ButtonTertiary.vue'
export default {
    name: 'next-bar',
    components: {
        ButtonPrimary,
        ButtonTertiary
    },
    methods: {
        clicked () {
            this.$emit('next-bar-clicked')
        }
    }
}
</script>

<style lang="scss" scoped>
.next-bar-wrapper {
    height: 88px;
    border-top: 1px solid #000000;
    padding-top: 24px;
    padding-bottom: 24px;
    width: 100%;
    @include desktop-down(){
        padding-right: 12px;
    }
}
.next-bar {
    max-width: 1024px;
    text-align: right;
    margin: auto;
}
.next-bar button {
    float: right;
    margin: 0 10px;
}
</style>

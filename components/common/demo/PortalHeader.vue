<template>
    <div class="title-container">
        <h2 class="catalog-caption">{{ title}}</h2> 
    </div>
</template>

<script>
    export default {
        props:{
            title: String,
            default: ""
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
</style>

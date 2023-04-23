<template>
    <div class = "payload-item">
        <div class = "payload-item-name">{{payloadName}}</div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            payloadName: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
.payload-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
}
.payload-item-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    gap: 8px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
}
</style>

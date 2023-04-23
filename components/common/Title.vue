<template>
    <div class = 'title' @click = "titleClick">
        <img :src = "'/categories/' + imgName" alt = 'title image' class = 'title-image' />
        <p class = 'title-caption'> {{name}} </p>
    </div>
</template>

<script>
export default {
    props: {
        imgName: {
            type: String, 
            default: ''
        },
        value: {
            type: Number, 
            required: true
        },
        name:{
            type: String,
            default: ''
        },
        id:{
            type: Number,
            default: -1
        },
        
    },
    
    methods: {
        titleClick() {
            this.$emit('input', this.$props.id);
        }
    }
}
</script>
<style lang="scss" scoped>
.title {
    padding: 4px;
    width: 162px;
    height: 101px;
    text-align: center;
    &:hover{
        background: white
    }
}
.title-image {
    width: 60px;
}
.title-caption {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
}
</style>
<template>
    <div class = "items-list-wrapper">
        <ListItem  v-for = "item in list" 
            :access = "access" 
            class = "title-wrapper" 
            :prefix = "prefix" 
            :mode = "mode"
            :name = "item[prefix+'_name']"
            :title = "item[prefix+'_name'] + ' (' + item[prefix+'_id'] + ')'" 
            :itemId = "item[prefix+'_id'].toString()" 
            :key="item[prefix+'_id']" >
        </ListItem>
    </div>
</template>

<script>
import ListItem from '~/components/common/ListItem.vue'

export default {
    components: {
        ListItem
    },
    props: {
        list:{
            type: Array,
            default: () => [{ id: 0, title: 'No Tasks Provided' }]
        },
        prefix:{
            type: String,
            default: ''
        },
        mode: {
            type: String,
            default : ''
        },
        access:{
            type: String,
            default: 'edit'
        }
    }
}
</script>

<style lang="scss" scoped>
.items-list-wrapper {
    margin-top:10px;
    max-height: 250px;
    padding-right:10px;
    overflow-y: auto;
    width: 100%;
    display: flex;
    gap: 2px;
    flex-direction: column;
    align-items: flex-start;
}
</style>
<template>
    <div class = "list-item-wrapper">
        <span class = "title" @click="addItemToList()" >{{title}}</span>
        <div v-if="mode === 'import'" class = "remove-btn"  @click = "(access=='edit') ? removeItem() : {}">
            <svg v-if = "access === 'edit'" width = "22" height = "22" viewBox="0 0 22 22" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                <path d ="M2 2L20 20M20 2L2 20" stroke = "#7B8B99" stroke-width="3"/>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                <path d = "M9.5 16.5L20 6" stroke="#0C971F" stroke-width="2"/>
                <path d = "M4 11L10.2076 17.2076" stroke="#10C929" stroke-width="2"/>
            </svg>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String, 
            default: ''
        },
        prefix: {
            type: String, 
            default: ''
        },
        name: {
            type: String,
            default : ''
        },
        mode: {
            type: String,
            default : ''
        },
        access: {
            type: String,
            default: 'edit'
        },
        itemId: {
            type: String,
            default: ''
        }
    },
    methods:{
        removeItem() {
            if(this.$props.prefix === 'category'){
                this.$store.dispatch('demo/removeCategory', this.$props.itemId)
            }
            else {
                this.$store.dispatch('demo/removeSupplier', this.$props.itemId)
            }
                
        },
        addItemToList() {
            
            const idValue = this.$props.itemId
          
            const nameValue = this.$props.name

           
            if(this.$props.prefix === 'category') {
                const item = {
                    'category_id' : idValue,
                    'category_name' : nameValue
                }
                this.$store.dispatch('demo/addCategoryListWithItem', item )
            }
            else {
                const item = {
                    'supplier_id' : idValue,
                    'supplier_name' : nameValue
                }
                this.$store.dispatch('demo/addSupplierListWithItem', item)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list-item-wrapper {
    padding: 10px 16px 10px 16px;
    display: flex;
    height: 50px;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: row;
    background: #F0F4F8;
    border-radius: 2px;
}
.list-item-wrapper .title {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    width: calc(100% - 20px)
}
.remove-btn {
    width: 20px;
    height: 20px
}
</style>
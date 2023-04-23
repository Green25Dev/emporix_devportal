let initStage = {
    step: 1,
    rootCategory: -1,
    mode: false,
    demo: false,
    searchedCategoryList: [],
    categoryList: [],
    searchedSupplierList : [],
    totalMatchedProduct: 0,
    supplierList: [],
    imageQuantity: 1,
    stockLow: 20,
    stockMedium: 50,
    stockHigh: 100,
    stockMax: 100,
    priceTo: 250,
    priceFrom: 100,
    eventStatus: {},
    maxProduct: 1000

}

const setLocalStorageDemo = (v) => {
    localStorage.setItem('demoStorage', JSON.stringify(v))
}

export const state = () => (initStage)

export const mutations = {
    NEXT (state) {
        const newState = {
            ...state,
            step: state.step + 1
            }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_STEP (state, step) {
        const newState = {
            ...state,
            step: step
            }
        Object.assign(state, newState)
    },
    SET_ROOT_CATEGORY (state, category_id) {
        const newState = {
            ...state,
            rootCategory: category_id
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_TOTAL_MATCHED_PRODUCTS(state, number) {
        const newState = {
            ...state,
            totalMatchedProduct: number
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_SEARCHED_CATEGORY_LIST(state, list){
        const newState = {
            ...state,
            searchedCategoryList: list
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_CATEGORY_LIST (state, list){
        const newState = {
            ...state,
            categoryList: list
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    ADD_CATEGORY_LIST_ITEM (state, item){
        let newCategoryList
        const category = state.categoryList.find((category) => {
            return category.category_id === item.category_id
        })
        if(category === undefined){
            newCategoryList = [...state.categoryList, item]
        }
        else{
             newCategoryList = state.categoryList
        }
        const newState = {
            ...state,
            categoryList: newCategoryList
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_SEARCHED_SUPPLIER_LIST(state, list){
        const newState = {
            ...state,
            searchedSupplierList: list
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_SUPPLIER_LIST (state, list){
        const newState = {
            ...state,
            supplierList: list
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    ADD_SUPPLIER_LIST_ITEM (state, item){
        let newSupplierList
        const supplier = state.supplierList.find((supplier) => {
            return supplier.supplier_id === item.supplier_id
        })
        if(supplier === undefined){
            newSupplierList = [...state.supplierList, item]
        }
        else{
            newSupplierList = state.supplierList
        }
        const newState = {
            ...state,
            supplierList: newSupplierList
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    REMOVE_CATEGORY (state, id){
        const newCategoryList = state.categoryList.filter((r) => {
            if(id !== r.category_id) return r
        })
        const newState = {
            ...state,
            categoryList: newCategoryList
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    REMOVE_SUPPLIER (state, id){
        const newSupplierList = state.supplierList.filter((r) => {
            if(id !== r.supplier_id) return r
        })
        const newState = {
            ...state,
            supplierList: newSupplierList
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_MODE (state, mode){
        const newState = {
            ...state,
            mode: mode
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_DEMO (state, demo){
        const newState = {
            ...state,
            demo: demo
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_IMAGE_QUANTITY (state, quantity){
        const newState = {
            ...state,
            imageQuantity: parseInt(quantity)
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_STOCK_LOW (state, value){
        const newState = {
            ...state,
            stockLow: parseInt(value)
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_STOCK_MEDIUM (state, value){
        const newState = {
            ...state,
            stockMedium: parseInt(value)
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_STOCK_HIGH (state, value){
        const newState = {
            ...state,
            stockHigh: parseInt(value)
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_STOCK_MAX (state, value){
        const newState = {
            ...state,
            stockMax: parseInt(value)
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_PRICE_FROM (state, value){
        const newState = {
            ...state,
            priceFrom: parseFloat(value)
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_PRICE_TO (state, value){
        const newState = {
            ...state,
            priceTo: parseFloat(value)
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_EVENT_STATUS (state, status){
        const newState = {
            ...state,
            eventStatus: status
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    },
    SET_MAX_PRODUCT (state, maxProduct){
        const newState = {
            ...state,
            maxProduct: maxProduct
        }
        Object.assign(state, newState)
        setLocalStorageDemo(newState)
    }
    
}

export const actions = {
    goNext ({
        commit,
        state
    }) {
        commit('NEXT')
    },
    setStep ({
        commit,
        state
    }, step) {
        commit('SET_STEP', step)
    },
    updateRootCategory ({
        commit,
        state
    }, rootCategoryId) {
        commit('SET_ROOT_CATEGORY', rootCategoryId)
    },
    putSearchedCategoryList({
        commit, state
    }, list){
        commit('SET_SEARCHED_CATEGORY_LIST', list)
    },
    addCategoryListWithItem ({
        commit,
        state
    }, item) {
        commit('ADD_CATEGORY_LIST_ITEM', item)
    },
    putCategoryList ({
        commit,
        state
    }, list) {
        commit('SET_CATEGORY_LIST', list)
    },
    putSearchedSupplierList({
        commit, state
    }, list){
        commit('SET_SEARCHED_SUPPLIER_LIST', list)
    },
    addSupplierListWithItem ({
        commit,
        state
    }, item) {
        commit('ADD_SUPPLIER_LIST_ITEM', item)
    },
    setTotalMatchingProducts({
        commit,
        state
    }, number){
        commit('SET_TOTAL_MATCHED_PRODUCTS', number)
    },
    putSupplierList ({
        commit,
        state
    }, list) {
        commit('SET_SUPPLIER_LIST', list)
    },
    removeCategory ({
        commit,
        state
    }, id) {
        commit('REMOVE_CATEGORY', id)
    },
    removeSupplier ({
        commit,
        state
    }, id) {
        commit('REMOVE_SUPPLIER', id)
    },
    updateMode ({
        commit,
        state
    }, mode) {
        commit('SET_MODE', mode)
    },
    updateDemo ({
        commit,
        state
    }, demo) {
        commit('SET_DEMO', demo)
    },
    updateImageQuantity ({
        commit,
        state
    }, quantity) {
        commit('SET_IMAGE_QUANTITY', quantity)
    },
    updateStockLow ({
        commit,
        state
    }, value) {
        commit('SET_STOCK_LOW', value)
    },
    updateStockMedium ({
        commit,
        state
    }, value) {
        commit('SET_STOCK_MEDIUM', value)
    },
    updateStockHigh ({
        commit,
        state
    }, value) {
        commit('SET_STOCK_HIGH', value)
    },
    updateStockMax ({
        commit,
        state
    }, value) {
        commit('SET_STOCK_MAX', value)
    },
    updatePriceFrom ({
        commit,
        state
    }, value) {
        commit('SET_PRICE_FROM', value)
    },
    updatePriceTo ({
        commit,
        state
    }, value) {
        commit('SET_PRICE_TO', value)
    },
    updateEventStatus ({
        commit,
        state
    }, status) {
        commit('SET_EVENT_STATUS', status)
    },
    updateMaxProduct ({
        commit,
        state
    }, maxProduct) {
        commit('SET_MAX_PRODUCT', maxProduct)
    }
}

export const getters = {
    getRootCategoryId: state => () => {
      if (state.rootCategory !== undefined) {
        return state.rootCategory
      }
    },
    getTotalMatchedProducts: state => () =>{
        if (state.totalMatchedProduct !== undefined) {
            return state.totalMatchedProduct
          }
    },
    getStep: state => () => {
      if (state.step !== undefined) {
        return state.step
      }
    },
    getSearchedCategoryList: state => () => {
        if (state.searchedCategoryList !== undefined) {
            return state.searchedCategoryList
        }
    },
    getSearchedSupplierList: state => () => {
        if (state.searchedSupplierList !== undefined) {
            return state.searchedSupplierList
        }
    },
    getCategoryList: state => () => {
        if (state.categoryList !== undefined) {
            return state.categoryList
        }
    },
    getSupplierList: state => () => {
        if (state.supplierList !== undefined) {
            return state.supplierList
        }
    },
    getDemo: state => () => {
        if (state.demo !== undefined) {
            return state.demo
        }
    },
    getMode: state => () => {
        if (state.mode !== undefined) {
            return state.mode
        }
    },
    getProductPayload: state => () => {
        
        const data = Object.assign({} , 
                { imageQuantity : state.imageQuantity.toString() } ,
                { stockLow : state.stockLow.toString() } ,
                { stockMedium : state.stockMedium.toString() } ,
                { stockHigh : state.stockHigh.toString() } ,
                { priceFrom : state.priceFrom.toString() } ,
                { priceTo : state.priceTo.toString() } ,
                { maxProduct : state.maxProduct.toString() } ,
            )
        return data
    },
    getImageQuantity: state => () => {
        if(state.imageQuantity !== undefined) return state.imageQuantity.toString()
    },
    getStockLow: state => () => {
        if(state.stockLow !== undefined) return state.stockLow.toString()
    },
    getStockMedium: state => () => {
        if(state.stockMedium !== undefined) return state.stockMedium.toString()
    },
    getStockHigh: state => () => {
        if(state.stockHigh !== undefined) return state.stockHigh.toString()
    },
    getStockMax: state => () => {
        if(state.stockMax !== undefined) return state.stockMax.toString()
    },
    getPriceFrom: state => () => {
        if(state.priceFrom !== undefined) return state.priceFrom.toString()
    },
    getPriceTo: state => () => {
        if(state.priceTo !== undefined) return state.priceTo.toString()
    },
    getEventStatus: state => () => {
        if(state.eventStatus !== undefined) return state.eventStatus
    },
    getMaxProduct: state => () => {
        if(state.maxProduct !== undefined) return state.maxProduct.toString()
    }
  }
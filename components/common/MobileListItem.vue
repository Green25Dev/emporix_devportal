<template>
  <div class="mobile-list-item p-2 w-full">
    <div class="grid grid-nogutter flex-column">
      <div @click="toggleExpand()">
        <slot name="content" />
      </div>
      <transition name="slide-fade">
        <div v-show="expand">
          <slot name="item-actions" />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MobileListItem',
  data () {
    return {
      expand: false
    }
  },
  methods: {
    toggleExpand () {
      this.expand = !this.expand
    }
  }
}
</script>

<style lang="scss" scoped>

.mobile-list-item {
  border-bottom: 1px solid $searchLightGray;
}

</style>

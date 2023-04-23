<template>
  <transition name="fade">
    <div
      v-if="modal.component"
      :class="className"
      class="modal-wrapper"
      @click="droppable ? modal.closeModal(false): {}"
    >
      <div class="modal-container" @click.stop>
        <component
          :is="modal.component"
          :close-modal="modal.closeModal"
          v-bind="modal.props"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    droppable: {
      type: Boolean,
      default: true
    },
    className:{
      type: String,
      default: ""
    }
  },
  data () {
    return {
      modal: {}
    }
  },
  created () {
    $nuxt.$on('openModal', ({
      component,
      props,
      isClosable,
      resolve
    }) => {
      this.modal = {
        component,
        props,
        isClosable,
        closeModal: (value) => {
          this.modal = {}
          resolve(value)
        }
      }
    })
  },
  beforeDestroy () {
    this.$nuxt.$off('openModal')
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10000000000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.modal-container {
  background-color: white;
  box-shadow: 2px 2px 32px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 48px;
  min-width: 400px;

  @include phone-only() {
    width: 100%;
    height: 100%;
  }
}
</style>

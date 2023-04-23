<template>
  <div class="tenant-card mt-4" :class="{'selected': selected === true}" @mouseenter="showEdit()" @mouseleave="hideEdit()">
    <img src="/tenant-image.svg">
    <HorizontalLine :color="'#192940'" />
    <div v-if="tenant.tenant" class="name">
      {{ tenant.tenant }}
    </div>
    <div v-else class="greytext">
      {{ greytext }}
    </div>
    <transition name="fade">
      <div v-if="editVisible && tenant.tenant" class="edit">
        <img src="/icons/pencil-edit.svg">
      </div>
    </transition>
  </div>
</template>

<script>
import HorizontalLine from '~/components/common/HorizontalLine'

export default {
  name: 'TenantCard',
  components: { HorizontalLine },
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    tenant: {
      type: Object,
      default: () => ({})
    },
    greytext: {
      type: String,
      default: 'TENANT'
    }
  },
  data () {
    return {
      editVisible: false
    }
  },
  methods: {
    showEdit () {
      this.editVisible = true
    },
    hideEdit () {
      this.editVisible = false
    }
  }
}
</script>

<style lang="scss">
.tenant-card {
  cursor: pointer;
  position: relative;
  max-width: 264px;
  min-width: 264px;
  height: 296px;
  background: #FFFFFF;
  border: 2px solid $brand-navy-800;
  border-radius: 2px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &.selected {
    border-color: #128AFB;
  }

  img {
    max-width: 100px;
    height: auto;
  }

  .name {
    margin-bottom: 20px;
    font-weight: 900;
    font-size: 18px;
    text-transform: uppercase;
  }

  .greytext {
    margin-bottom: 20px;
    font-weight: 900;
    font-size: 18px;
    text-transform: uppercase;
    color: $brand-grey-600;
  }

  .edit {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    background: $brand-blue-500;
    background: linear-gradient(to bottom right, #fff 0%, #fff 50%, $brand-blue-500 50%, $brand-blue-500 100%);

    img {
      position: absolute;
      right: 5px;
      bottom: 5px;
    }
  }

}
</style>

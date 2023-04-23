<template>
  <div>
    <CreationflowHeader />
    <main class="main">
      <div class="main-container">
        <img
          v-for="number in [1, 2, 3, 4]"
          :key="number"
          alt="background image"
          :src="require(`/static/bg-center-${number}.svg`)"
          :class="`bg-image-${number}`"
        >
        <div class="content-wr">
          <div class="content">
            <Nuxt />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  props: {
    embedded: Boolean
  },
  data () {
    return {
      mobileMenuExpanded: false
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  justify-content: center;
  align-items: flex-start;

  .main-container {
    position: relative;
    width: 100%;
    min-height: 100%;
    padding: 56px 20px;
    display: flex;
    align-items: center;
    @include tablet-down {
      [class^="bg-image"] {
        display: none;
      }
    }

    .bg-image-1 {
      position: absolute;
      left: 0;
      top: 100px;
    }

    .bg-image-2 {
      position: absolute;
      right: 0;
      top: 122px;
    }

    .bg-image-3 {
      position: absolute;
      right: 6px;
      bottom: 0;
    }

    .bg-image-4 {
      position: absolute;
      left: 138px;
      bottom: 88px;
    }

    @include phone-only {
      align-items: flex-start;
      padding: 24px;
    }
  }
}

.content-wr {
  display: flex;
  width: 100%;
  max-width: 1168px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  .content {
    width: 80%;
    @include phone-only {
      width: 100%;
    }
  }
}
</style>

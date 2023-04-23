<template>
  <div>
    <CreationflowHeader />
    <main class="main">
      <div class="main-container">
        <div class="content-wr">
          <img
            v-for="number in [1, 2, 3, 4]"
            :key="number"
            alt="background image"
            :src="require(`/static/bg-center-${number}.svg`)"
            :class="`bg-image-${number}`"
          >
          <div class="content">
            <Nuxt />
          </div>
          <CreationflowWhileWaiting />
          <CreationflowFooter />
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
  justify-content: center;
  flex: 1;
  align-items: flex-start;

  .main-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    @include phone-only {
      align-items: flex-start;
      padding: 24px;
    }
  }
}

.content-wr {
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: 0;
  height: 100%;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
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
    left: 20px;
    bottom: 88px;
  }

  .content {
    padding: 56px 0;
    width: 80%;
    flex: 1;
    @include phone-only {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="guides">
    <NuxtLink v-for="(card, index) in cards" :key="index" :to="card.to" class="guides-card">
      <div class="card-img-wr">
        <img :src="'/'+card.imageName" alt="title image" class="card-img">
      </div>
      <div class="card-text-wr">
        <div class="headline-5 card-title">
          {{ $t(card.title) }}
        </div>
        <p class="paragraph-1">
          {{ $t(card.desc) }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>

export default {
  name: 'HeaderDropSections',
  props: {
    cards: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.guides {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
}

.guides-card {
  display: flex;
  flex-shrink: 0;
  max-width: 408px;
  padding: 16px;
  text-decoration: none;
  border-radius: 2px;

  &:hover {
    transition: all .25s ease-in-out;
    background-color: #fff;
    box-shadow: 0 32px 40px -15px rgb(0 0 0 / 20%);
  }

  .paragraph-1 {
    color: $brand-grey-400;
  }

  .card-text-wr {
    margin-left: 16px;

    .card-title {
      display: block;
      text-decoration: none;
      color: $brand-navy-1000;
      margin-bottom: 8px;
      transition: color 200ms;
    }
  }

  .card-img-wr {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    text-align: right;

    .card-img {
      max-height: 100%;
    }
  }
}
</style>

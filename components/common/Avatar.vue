<template>
  <v-avatar tile color="#009FE3" :class="shape">
    <span>{{ initials }}</span>
  </v-avatar>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    fistName: {
      type: String,
      default: 'A'
    },
    lastName: {
      type: String,
      default: 'B'
    },
    shape: {
      type: String,
      default: 'rectangle'
    }
  },
  computed: {
    initials () {
      return `${this.fistName.trim()[0]}${this.lastName.trim()[0]}`
    }
  }
}
</script>

<style lang="scss" scoped>
.rectangle {
  border-radius: 4px;
}
.circle {
  border-radius: 50%;
}
</style>

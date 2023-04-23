<template>
  <NuxtLink :to="link" class="add-user">
    <CircleCross class="add-user-icon" />
    <div class="label">
      {{ label }}
    </div>
  </NuxtLink>
</template>

<script>
import CircleCross from '~/components/icons/CircleCross'

export default {
  components: { CircleCross },
  props: {
    label: {
      type: String,
      default: 'Add an user'
    },
    link: {
      type: String,
      default: '/'
    }
  }
}
</script>
<style lang="scss" scoped>
.add-user {
  display: flex;
  align-items: center;
  color: black;
  font-size: 16px;
  font-weight: bold;
  width: fit-content;
  text-decoration: none;

  .add-user-icon {
    transition: fill 200ms;
  }

  &:hover {
    .add-user-icon {
      fill: black;
    }
  }

  .label {
    margin-left: 16px;
  }
}

</style>

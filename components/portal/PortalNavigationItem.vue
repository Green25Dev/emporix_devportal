<template>
  <NuxtLink :to="to" class="portal-navigation-item">
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  name: 'PortalNavigationItem',
  props: {
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.portal-navigation-item {
  width: 100%;
  background: white;
  border-radius: 4px 0 0 4px;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: Lato, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 25px;
  transition: background-color .2s ease-in-out;

  label {
    padding-left: 22px;
    cursor: pointer;
    color: $purple;
  }

  svg {
    height: 17px;
    width: 17px;
    stroke: $purple;

    path,rect {
      stroke: $purple;
    }
  }

  &:hover {
    label {
      color: $lightBlue;
    }

    svg {
      stroke: $lightBlue;

      path,rect  {
        stroke: $lightBlue;
      }
    }
  }

  &.nuxt-link-exact-active {
    label {
      color: white;
    }
    background: $lightBlue;
    color: white;

    svg {
      stroke: white;

      path,rect {
        stroke: white;
      }
    }
  }
}
</style>

<template>
  <nav>
    <ul class="nav" @mouseleave="closeDropMenu()">
      <li v-for="(item, index) in navigation" :key="index" class="nav-item">
        <NuxtLink
          class="nav-label"
          :to="item.to"
          @mouseenter.native="item.enter(index)"
        >
          {{ $t(item.label) }}
          <DropdownArrowIcon v-show="item.droppable" />
        </NuxtLink>
        <transition name="drop">
          <div v-show="isOpen && openedIndex === index">
            <span class="triangle" />
            <HeaderDrop :opened-option="openedOption" class="drop-menu" />
          </div>
        </transition>
      </li>
      <transition name="overlay">
        <div v-if="isOpen" class="overlay" @mouseenter="closeDropMenu()" />
      </transition>
    </ul>
  </nav>
</template>

<script>
import { menuOptions } from '~/commons/menuOptions'
import DropdownArrowIcon from '~/components/icons/DropdownArrowIcon'
import HeaderDrop from '~/components/common/header/HeaderDrop'

export default {
  name: 'HeaderLinks',
  components: {
    DropdownArrowIcon,
    HeaderDrop
  },
  data () {
    return {
      menuOptions,
      isOpen: false,
      openedOption: null,
      openedIndex: null,
      navigation: null,
      skipFirst: true
    }
  },
  watch: {
    '$route' () {
      this.closeDropMenu()
    }
  },
  mounted () {
    setTimeout(() => {
      this.skipFirst = false
    }, 100)

    this.navigation = [
      {
        to: '/',
        label: 'links.overview',
        droppable: false,
        enter: () => { this.closeDropMenu() }
      },
      {
        to: '/users',
        label: 'links.users',
        droppable: true,
        enter: index => this.openDropMenu(menuOptions.USERS, index)
      },
      {
        to: '/api-keys',
        label: 'links.apiKeys',
        droppable: true,
        enter: index => this.openDropMenu(menuOptions.API_KEYS, index)
      },
      {
        to: '/account-settings?tab=personal-settings',
        label: 'links.myAccount',
        droppable: true,
        enter: index => this.openDropMenu(menuOptions.MY_ACCOUNT, index)
      }
    ]
  },
  methods: {
    openDropMenu (option, index) {
      if (this.skipFirst) {
        return
      }
      this.isOpen = true
      this.openedIndex = index
      this.openedOption = option
    },
    closeDropMenu () {
      this.isOpen = false
      this.openedIndex = null
    }
  }

}
</script>

<style lang="scss" scoped>
.nav {
  position: relative;
  display: flex;
  transition: all .25s;
}

.nav-item {
  margin-right: 32px;
  list-style-type: none;
  display: flex;
  position: relative;
  height: 42px;

  &:last-of-type {
    margin: 0;
  }

  .nav-label {
    color: $brand-grey-300;
    text-decoration: none;
    font-size: 16px;
    transition: all .25s;

    &:hover {
      color: white;
    }
  }

  .triangle {
    content: '';
    z-index: 32;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 12px 0 13px;
    border-color: $brand-navy-800 transparent transparent transparent;
  }

  .drop-menu {
    z-index: 31;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

.overlay {
  width: 100vw;
  height: calc(100vh - #{$headerHeight});
  position: fixed;
  background-color: #080e16;
  opacity: .5;
  top: $headerHeight;
  left: 0;
  z-index: 1;
}

.drop-enter-active, .drop-leave-active {
  position: absolute;
  top: 100%;
  left: 50%;
}

.drop-enter, .drop-leave-to {
  transform: translate(-50%, 8px);
  opacity: 0;
}

.overlay-enter-active, .overlay-leave-active {
  transition: opacity .25s;
}

.overlay-enter, .overlay-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
.nav-label {
  svg {
    margin-left: 5px;
  }

  &:hover, &:active {
    color: $brand-blue-500;

    svg path {
      stroke: $brand-blue-500;
    }
  }
}
</style>

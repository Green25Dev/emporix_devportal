<template>
  <div class="drop-container" :class="{'w-full' : fullWidth }">
    <div class="drop-title">
      <div>
        {{ $t(getTitle()) }}
      </div>
      <div v-if="(openedOption === menuOptions.MY_ACCOUNT) && (userData !== undefined)" class="user-info">
        <p> {{ userData.user.firstName }} {{ userData.user.lastName }} </p>
        <p> {{ userData.user.email }} </p>
      </div>
    </div>
    <HeaderDropSections v-show="openedOption === menuOptions.USERS" :cards="usersCards" />
    <HeaderDropSections v-show="openedOption === menuOptions.API_KEYS" :cards="apiKeysCards" />
    <HeaderDropSections v-show="openedOption === menuOptions.MY_ACCOUNT" :cards="myAccountCards" />
  </div>
</template>

<script>
import { menuOptions } from '~/commons/menuOptions'
import HeaderDropSections from '~/components/common/header/HeaderDropSections'
import { usersCards } from '~/commons/usersCards'
import { apiKeysCards } from '~/commons/apiKeysCards'
import { myAccountCards } from '~/commons/myAccountCards'

export default {
  name: 'HeaderDrop',
  components: { HeaderDropSections },
  props: {
    openedOption: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menuOptions,
      usersCards,
      apiKeysCards,
      myAccountCards
    }
  },
  computed: {
    userData () {
      return this.$store.getters['auth/getCurrentUser']()
    }
  },
  methods: {
    getTitle () {
      switch (this.openedOption) {
        case menuOptions.API_KEYS:
          return 'links.apiKeys'
        case menuOptions.MY_ACCOUNT:
          return 'links.myAccount'
        case menuOptions.USERS:
          return 'links.users'
        case menuOptions.OVERVIEW:
          return 'links.overview'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.drop-container {
  background-color: $brand-grey-100;
  padding: 32px 16px;
  box-shadow: 0 32px 40px -15px rgb(0 0 0 / 20%);
  border-radius: 2px;
  min-width: 440px;

  .drop-title {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 14px;
    line-height: 24px;
    text-transform: uppercase;
    color: $brand-grey-400;
    padding-bottom: 16px;
    margin: 0 16px 24px;
    border-bottom: 1px solid $brand-grey-400;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    align-items: self-end;
    text-transform: initial;
    font-size: 12px;
    line-height: 14px;
  }
}
</style>

<template>
  <div>
    <div v-if="error.statusCode === 404">
      <h1>
        {{ $t('layout.error.noPage') }}
      </h1>
      <span class="sorry-text">
        {{ $t('layout.error.sorry') }}
      </span>
    </div>

    <h1 v-else>
      {{ $t('layout.error.error') }}
    </h1>

    <h3 class="go-here">
      {{ $t('layout.error.altLink') }}
    </h3>
    <ul class="links-list">
      <li>
        <a href="/">
          {{ $t('layout.error.portal') }}
        </a>
      </li>

      <li>
        <a href="https://developer.emporix.io">
          {{ $t('layout.error.docs') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: 'centered',
  props: ['error'] // you can set a custom layout for the error page
}
</script>

<style lang="scss">

.sorry-text {
  margin-top: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 26px;
}

.go-here {
  margin-top: 132px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
}

.links-list {
  list-style: none;
  li {
    color: $gray;
    margin-top: 16px;
  }
}
</style>

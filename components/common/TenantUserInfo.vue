<template>
  <div class="tenant-user-info">
    <div class="info">
      <div class="tenant-info">
        {{ tenant }}
      </div>
      <div class="user-info">
        {{ username }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TenantUserInfo',
  props: {
    username: {
      type: String,
      default: ''
    },
    tenant: {
      type: String,
      default: ''
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.tenant-user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 35%;

  .info {
    display: flex;
    flex-direction: column;

    .tenant-info {
      font-family: Lato, sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      color: #000000;
    }

    .user-info {
      color: $gray;
      font-family: Lato, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
    }
  }

  .arrow {
    justify-self: flex-end;
  }

  .avatar {
    border-radius: 4px;
  }
}

</style>

<template>
  <div class="confirm-box">
    <div class="box-header">
      {{ header }}
    </div>
    <p class="box-text">
      {{ text }}
    </p>
    <div class="box-actions">
      <ButtonPrimary
        :label="confirmButtonText"
        :arrow="false"
        class="action-confirm"
        @click.native="closeModal(true)"
      />
      <ButtonModalCancel @click.native="closeModal(false)" class="action-cancel">
        {{ cancelButtonText }}
      </ButtonModalCancel>
    </div>
  </div>
</template>

<script>
import ButtonPrimary from '~/components/common/ButtonPrimary'
import ButtonModalCancel from '~/components/common/ButtonModalCancel'

export default {
  name: 'ConfirmBox',
  components: {
    ButtonModalCancel,
    ButtonPrimary
  },
  props: {
    header: {
      required: true,
      type: String
    },
    text: {
      required: true,
      type: String
    },
    confirmButtonText: {
      required: false,
      type: String,
      default () {
        return this.$t('buttons.confirm')
      }
    },
    confirmButtonTheme: {
      required: false,
      type: String
    },
    cancelButtonText: {
      required: false,
      type: String,
      default () {
        return this.$t('buttons.cancel')
      }
    },
    closeModal: {
      required: true,
      type: Function
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-box {
  width: 540px;
  min-height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .box-header {
    font-size: 24px;
    font-weight: bold;
  }

  .box-text {
    margin-top: 24px;
    font-size: 16px;
    line-height: 24px;
  }

  .box-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
    width: 100%;

    .action-confirm {
      margin-bottom: 32px;
      width: 100%;
    }
    .action-cancel {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="import-loading-box">
    <div class="box-loading">
      <CircleLoading v-if="import_event_status!=='COMPLETED' && import_event_status!=='STOCK_IMPORT_COMPLETE'" />
      <p v-else-if="import_event_status==='COMPLETED' || import_event_status==='STOCK_IMPORT_COMPLETE'">
        COMPLETED
      </p>
      <p v-else>
        FAILED
      </p>
    </div>
    <p class="box-text">
      Importing data into tenant ...this might take some time
    </p>
    <p class="import-event-status">
      {{import_event_status}}
    </p>
    <p class="import-event-data">
      {{import_event_data}}
    </p>

    <!-- See import status page -->
    <div class="box-actions">
      
        <NuxtLink :to = "'/demo-data/imports'" >
          <ButtonPrimary
            :label="confirmButtonText"
            :arrow="false"
            class="action-confirm"
          />
        </NuxtLink>

      
  
                  
    </div>
  </div>
</template>

<script>
import ButtonPrimary from '~/components/common/ButtonPrimary'
import ButtonModalCancel from '~/components/common/ButtonModalCancel'
import CircleLoading from '~/components/common/demo/CircleLoading'

export default {
  name: 'ImportLoadingBox',
  components: {
    ButtonModalCancel,
    ButtonPrimary,
    CircleLoading
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
        return this.$t('demo.product.seeImportStatusPage')
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
  },
  computed:{
    import_event_status(){
      return this.$store.getters['demo/getEventStatus']().event_type
    },
    import_event_data() {
      return this.$store.getters['demo/getEventStatus']().event_data
    }

  }
}
</script>

<style lang="scss" scoped>
.import-loading-box {
  width: 540px;
  min-height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  .box-loading {
    width: 100%;
    font-size: 24px;
    font-weight: bold;
    color: green
  }
  .import-event-status {
    margin-top: 10px;
    font-style: 'normal';
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* or 83% */
    text-align: center;
    /* Black */
    color: #000000;
  }
  .import-event-data {
    overflow-y: auto;
    height: 100px;
    margin-top: 10px;
    font-style: 'normal';
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* or 83% */
    text-align: center;
    /* Black */
    color: #000000;
  }
  .box-text {
    margin-top: 24px;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 20px;
    /* or 83% */
    text-align: center;
    /* Black */
    color: #000000;
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

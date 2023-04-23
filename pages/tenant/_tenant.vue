<template>
  <div>
    <div class="padded-content">
      <div class="title-container">
        <h1>{{ $t('tenantSettings.title') }} <span class="title-name-highlight"> {{ details.name }}</span></h1>
      </div>
      <v-progress-circular v-if="!initDetails || loading" indeterminate />
      <div v-else class="grid col-sm-12 col-md-8">
        <div class="grid col-4 font-bold">
          <label> {{ $t('editUser.section.details') }}</label>
        </div>
        <div class="grid col-sm-12 col-md-8">
          <TextInput
            label="Tenant name"
            disabled
            :value="details.name"
            class="pt-0 pl-0 col-12 mb-3"
          />
          <TextInput
            v-model="details.company"
            label="Company name"
            class="pl-0 col-12"
          />
        </div>
      </div>
    </div>
    <ActionToolbar class="toolbar-actions">
      <div class="buttons">
        <ButtonSecondary
          theme="dark"
          :disabled="!detailsChanged || loading"
          @click.native="discardDetailsChanges"
        >
          {{ $t('global.discard') }}
        </ButtonSecondary>
        <ButtonSave
          class="save-btn"
          :disabled="!detailsChanged || loading"
          @click.native="saveTenant"
        >
          {{ $t('global.save') }}
        </ButtonSave>
      </div>
    </ActionToolbar>
  </div>
</template>

<script>

import ActionToolbar from '~/components/common/ActionToolbar'
import ButtonSecondary from '~/components/common/ButtonSecondary'
import TextInput from '~/components/common/TextInput'
import ButtonSave from '~/components/common/ButtonSave'
import { areObjEqual, cloneObj } from '~/commons/utils'

export default {
  components: {
    ButtonSave,
    TextInput,
    ButtonSecondary,
    ActionToolbar
  },
  layout: 'portal',
  data () {
    return {
      loading: true,
      tenantDataChanged: false,
      initDetails: null,
      details: {
        name: '',
        company: ''
      },
      detailsChanged: false
    }
  },
  computed: {
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  watch: {
    async currentTenant (newValue, oldValue) {
      if (newValue.tenant !== oldValue.tenant) {
        this.details.name = this.currentTenant.tenant
        await this.loadDetails()
      }
    },
    'details.company': {
      handler () {
        this.detailsChanged = !areObjEqual(this.details, this.initDetails)
      },
      deep: true
    }
  },
  mounted () {
    this.details.name = this.currentTenant.tenant
    this.loadDetails()
  },
  methods: {
    async loadDetails () {
      this.loading = true
      const tenantData = await this.$authAdapterService().getTenantDetails(this.details.name)
      this.details.company = tenantData.company.name
      this.initDetails = cloneObj(this.details)
      this.detailsChanged = false
      this.loading = false
    },
    discardDetailsChanges () {
      this.detailsChanged = false
      this.details = cloneObj(this.initDetails)
    }
  }
}
</script>

<style lang="scss" scoped>
.tenant-name {
  text-transform: uppercase;
}

.edit-form {
  label {
    word-break: break-word;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    font-weight: bold;
    padding-top: 12px;
  }
}

.toolbar-actions {
  position: fixed;
  bottom: 0;
  left: 0;

  .buttons {
    display: flex;
    justify-content: flex-end;
    padding-right: 160px;
    @include desktop-down() {
      padding-right: 24px;
    }

    .save-btn {
      margin-left: 16px;
    }
  }
}
</style>

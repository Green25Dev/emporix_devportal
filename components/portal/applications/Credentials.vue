<template>
  <div class="credentials">
    <div class="credentials-resource client-id">
      <div class="label-1 md:hidden font-bold label-gray">
        {{ $t('applications.credentials.clientId') }}
      </div>
      <div class="flex justify-content-around">
        <div class="credentials-strings">
          {{ clientId }}
        </div>
        <div class="credentials-actions flex justify-content-end align-items-center cursor-pointer">
          <CopyIcon @click.native="copyClientId()" />
          <div v-if="clientIdCopied" class="copied-notification">
            {{ $t('global.copied') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CopyIcon from '~/components/icons/CopyIcon'
import { openModal } from '~/plugins/modal-service'
import ConfirmBox from '~/components/common/ConfirmBox'

export default {
  components: {
    CopyIcon
  },
  props: {
    clientId: {
      type: String,
      defaultValue: '123'
    },
    clientSecret: {
      type: String,
      defaultValue: '123'
    }
  },
  data () {
    return {
      loading: false,
      clientIdCopied: false,
      showSecret: false
    }
  },
  computed: {
    accessType () {
      return this.$store.getters['auth/getAccessType']()
    }
  },
  methods: {
    copyClientId () {
      navigator.clipboard.writeText(this.clientId)
      this.$toast.info(this.$t('global.copied'), { icon: 'information-outline' })
    },
    copyClientSecret () {
      navigator.clipboard.writeText(this.clientSecret)
      this.$toast.info(this.$t('global.copied'), { icon: 'information-outline' })
    },
    toggleShowSecret () {
      this.showSecret = !this.showSecret
    },
    async renewKeys () {
      const confirmation = await openModal(ConfirmBox, {
        header: this.$t('modal.renew'),
        text: this.$t('modal.sure')
      })
      if (confirmation) {
        this.loading = true
        try {
          await this.$authAdapterService().renewKeys(this.clientId)
          this.$emit('renewed')
          this.$toast.success(this.$t('applications.renewed'), { icon: 'check' })
          this.loading = false
        } catch (error) {
          this.$toast.error(this.$t('applications.renewedErr'), { icon: 'alert-outline' })
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.credentials {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Lato, sans-serif;
  font-style: normal;
  @include phone-only() {
    flex-direction: column;
  }

  .credentials-resource {
    margin-bottom: 16px;
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  small {
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: $gray;
  }

  .copied-notification {
    position: relative;
    font-size: 10px;
    color: $gray;
    font-weight: normal;
    vertical-align: center;
    margin-bottom: 8px;
    margin-left: 8px;
  }

  .credentials-actions {
    svg {
      margin-left: 4px;
    }
  }

  .credentials-strings {
    font-style: normal;
    font-weight: normal;
    line-height: 32px;
    margin-right: 8px;
  }

}
</style>

<template>
  <div class="credentials">
    <div class="credentials-resource client-secret">
      <div class="label-1 md:hidden font-bold label-gray">
        {{ $t('applications.credentials.clientSecret') }}
      </div>
      <div class="flex justify-content-between md:justify-content-around">
        <div v-if="showSecret" class="credentials-strings">
          {{ clientSecret }}
        </div>
        <div v-if="!showSecret" class="credentials-strings">
          &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
        </div>
        <div class="credentials-actions flex align-items-center cursor-pointer justify-content-end">
          <CopyIcon @click.native="copyClientSecret()" />
          <RotateIcon v-if="accessType === 'Admin' && !loading" @click.native="renewKeys()" />
          <ShowIcon v-if="!showSecret" @click.native="toggleShowSecret()" />
          <HideIcon v-else @click.native="toggleShowSecret()" />
          <v-progress-circular v-if="loading" indeterminate size="18" color="#009FE3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CopyIcon from '~/components/icons/CopyIcon'
import ShowIcon from '~/components/icons/ShowIcon'
import HideIcon from '~/components/icons/HideIcon'
import RotateIcon from '~/components/icons/RotateIcon'
import { openModal } from '~/plugins/modal-service'
import ConfirmBox from '~/components/common/ConfirmBox'

export default {
  components: {
    RotateIcon,
    HideIcon,
    ShowIcon,
    CopyIcon
  },
  props: {
    clientSecret: {
      type: String,
      defaultValue: '123'
    },
    clientId: {
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
    margin-left: 16px;
    gap: 16px;
  }

  .credentials-strings {
    font-style: normal;
    font-weight: normal;
    line-height: 32px;
    margin-right: 8px;
    min-width: 155px;
  }

  .client-id {

  }

  .client-secret {

  }
}
</style>

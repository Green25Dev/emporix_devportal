<template>
  <div class="choose-name-container flex flex-column justify-content-center">
    <h1 class="">
      {{ $t('termsAndCondition.title') }}
    </h1>
    <span class="description">{{ $t('termsAndCondition.description') }} <a
      href="https://developer.emporix.io/legal/terms-of-use"
    >Developer Terms Of Use</a></span>
    <v-checkbox
      v-model="termsAndConditions"
      :label="$t('termsAndCondition.checkbox.label')"
    />
    <Button
      :disabled="!termsAndConditions"
      :label="$t('termsAndCondition.button.label')"
      @click.native="sendTermsAndConditions()"
    />
  </div>
</template>

<script>

import Button from '~/components/common/Button'

export default {
  components: {
    Button
  },
  layout: 'centered',
  data () {
    return {
      termsAndConditions: false
    }
  },
  computed: {
    currentTenant () {
      return this.$store.getters['auth/getTenant']()
    }
  },
  methods: {
    async refetchTenantsAndSelectOne () {
      try {
        const tenants = await this.$authAdapterService().getTenants()
        this.tenants = tenants
        this.tenantOptions = tenants.map(({ tenant }) => ({
          label: tenant,
          value: tenant
        }))
        await this.$store.dispatch('auth/chooseTenant', tenants[0])
      } catch (error) {
        this.$toast.error('Sorry, applications were not fetched properly', { icon: 'alert-outline' })
      }
    },
    async sendTermsAndConditions () {
      if (this.currentTenant === undefined) {
        await this.refetchTenantsAndSelectOne()
      }
      try {
        const {
          user,
          newsletter
        } = await this.$authAdapterService().getCurrentUser()
        await this.$authAdapterService().updateUser({
          firstName: user.firstName,
          lastName: user.lastName,
          termsAndCondition: this.termsAndConditions,
          newsletter
        })
        this.$store.dispatch('auth/updateTerms', this.termsAndConditions)
        window.location = '/'
      } catch (error) {
        this.$toast.error('Sorry, could not update terms and conditions!', { icon: 'alert-outline' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.choose-name-container {
  font-family: Lato, sans-serif;
  font-style: normal;
  width: 400px;
  margin-top: 112px;

  h1 {
    color: black;
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
  }

  .description {
    margin-top: 32px;
    font-size: 14px;
    line-height: 20px;
    text-align: justify;
  }

  .tenant-name-input {
    margin-top: 32px;
    margin-bottom: 16px;
  }

  .error-message {
    color: $error;
  }
}

</style>

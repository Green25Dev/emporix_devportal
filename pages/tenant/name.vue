<template>
  <div class="choose-name-container flex flex-column justify-content-center">
    <h1 class="flex justify-content-center">
      <span>{{ $t('tenant.chooseName.header.1') }}&nbsp;</span>
      <span class="text-highlight"> {{ $t('tenant.chooseName.header.2') }}</span>
    </h1>
    <div class="flex justify-content-center mb-5">
      <TenantCard
        :key="tenant"
        :greytext="tenant"
      />
    </div>

    <h5 class="flex align-items-center">
      <span>{{ $t('tenant.chooseName.name.label') }}</span>
      <InputTooltip class="name-tooltip">
        <TenantNameTooltip />
      </InputTooltip>
    </h5>

    <TextInput
      v-model="tenant"
      class="tenant-name-input"
      autofocus
      :errors="errors"
      :blue="true"
    />
    <TenantNameValidator
      :tenant-name="tenant"
      class="tenant-name-validator"
      @valid="checkTenantNameValidity"
    />

    <TextInput
      v-model="companyName"
      class="company-name-input"
      :label="$t('tenant.chooseName.company.label')"
      :novalidate="true"
      :big="true"
    />

    <Dropdown
      ref="lancur-dropdown"
      class="lancur-dropdown"
      :toplabel="$t('tenant.chooseName.language.label')"
      :no-avatar="true"
      :light-border="true"
      :options="languageOptions"
      :value="selectedLanguage"
      @select="setLanguage"
    >
      <template #tooltip>
        <TenantLanguageTooltip />
      </template>
    </Dropdown>

    <Dropdown
      ref="lancur-dropdown"
      class="lancur-dropdown"
      :toplabel="$t('tenant.chooseName.currency.label')"
      :no-avatar="true"
      :light-border="true"
      :options="currencyOptions"
      :value="selectedCurrency"
      @select="setCurrency"
    >
      <template #tooltip>
        <TenantCurrencyTooltip />
      </template>
    </Dropdown>

    <ButtonPrimary
      :disabled="!(isValidTenant && isValidName)"
      :label="$t('tenant.chooseName.button.label')"
      :arrow="false"
      class="submit-btn"
      @click.native="createTenant()"
    />
  </div>
</template>

<script>
import TextInput from '~/components/common/TextInput'
import Dropdown from '~/components/common/Dropdown'
import ButtonPrimary from '~/components/common/ButtonPrimary'
import TenantCard from '~/components/common/TenantCard'
import TenantNameValidator from '~/components/TenantNameValidator'
import InputTooltip from '~/components/common/InputTooltip'
import TenantNameTooltip from '~/pages/tenant/tooltips/TenantNameTooltip'
import TenantLanguageTooltip from '~/pages/tenant/tooltips/TenantLanguageTooltip'
import TenantCurrencyTooltip from '~/pages/tenant/tooltips/TenantCurrencyTooltip'

export default {
  components: {
    TenantCurrencyTooltip,
    TenantLanguageTooltip,
    TenantNameTooltip,
    ButtonPrimary,
    TextInput,
    Dropdown,
    TenantCard,
    TenantNameValidator,
    InputTooltip
  },
  layout: 'tenant',
  data () {
    return {
      tenant: '',
      companyName: '',
      isValidTenant: false,
      isValidName: false,
      errors: [],
      languageOptions: [
        {
          label: 'English',
          value: 'en'
        },
        {
          label: 'Deutsch',
          value: 'de'
        }
      ],
      selectedLanguage: 'en',
      currencyOptions: [
        {
          label: '€ - EUR',
          value: 'EUR'
        },
        {
          label: '$ - USD',
          value: 'USD'
        },
        {
          label: '£ - GBP',
          value: 'GBP'
        },
        {
          label: 'kr - NOK',
          value: 'NOK'
        }
      ],
      selectedCurrency: 'EUR'
    }
  },
  computed: {
    authData () {
      return this.$store.getters['auth/getAuthData']()
    }
  },
  watch: {
    companyName (newValue) {
      this.isValidName = newValue.length >= 3
    }
  },
  methods: {
    addError (error) {
      this.errors.push(error)
    },
    clearErrors () {
      this.errors = []
    },
    setLanguage (lang) {
      this.selectedLanguage = lang.value
    },
    setCurrency (curr) {
      this.selectedCurrency = curr.value
    },
    checkTenantNameValidity (event) {
      this.isValidTenant = event
    },
    async createTenant () {
      const {
        firstName,
        lastName,
        login
      } = this.authData

      try {
        const {
          data
        } = await this.$axios.post(this.$config.TENANT_CREATION_URL, {
          firstname: firstName,
          lastname: lastName,
          tenant: this.tenant,
          company: this.companyName,
          email: login,
          defaultLanguage: this.selectedLanguage,
          defaultCurrency: this.selectedCurrency
        }, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.authData).accessToken}`,
            'X-Proxy-Authorization': `Bearer ${JSON.parse(localStorage.authData).accessToken}`
          }
        })
        const { executionId } = data
        localStorage.executionId = executionId
        window.location = '/tenant/waiting'
      } catch ({ response }) {
        const { data } = response
        if (data.length === 0) {
          this.addError({ msg: 'Tenant data invalid' })
        }
        if (data._embedded && data._embedded.errors && data._embedded.errors.length > 0) {
          let message = 'Error while creating tenant: '

          data._embedded.errors.forEach((error) => {
            message = `${message} ${error.message}`
          })
          this.$toast.error(`${message}`, { icon: 'alert-outline' })
        } else {
          this.$toast.error(`${data.message}`, { icon: 'alert-outline' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.choose-name-container {
  width: 400px;
  margin: 0 auto;
  font-family: Lato, sans-serif;
  font-style: normal;

  .text-highlight {
    color: $brand-blue-500;
  }

  .name-tooltip {
    margin-left: 8px;
  }

  h1 {
    color: black;
    font-family: Lato, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    text-align: left;
    margin-bottom: 40px;
  }

  h5 {
    height: 22px;
  }

  .tenant-name-input {
    margin: 32px 0;
  }

  .company-name-input {
    margin-top: 32px;
    margin-bottom: 16px;
  }

  .dropdowns-container {
    display: flex;
    flex-direction: column;
  }

  .lancur-dropdown {
    margin-bottom: 16px;
    width: 100%;
  }

  .submit-btn {
    margin-top: 16px;
  }

  .error-message {
    color: $error;
  }
}

</style>

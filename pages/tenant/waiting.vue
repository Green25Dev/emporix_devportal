<template>
  <div class="waiting-container">
    <div class="title">
      <span>{{ $t('tenant.waiting.title.1') }}</span>
      <span class="text-highlight">{{ $t('tenant.waiting.title.2') }}</span>
      <span>{{ $t('tenant.waiting.title.3') }}</span>
    </div>
    <div class="subtitle">
      {{ $t('tenant.waiting.subtitle.main') }}
    </div>
    <div class="brackets">
      {{ $t('tenant.waiting.subtitle.brackets') }}
    </div>
    <div class="progress-wr">
      <div class="progress-circle-wr">
        <v-progress-circular
          class="progress-bar"
          :size="230"
          :width="8"
          :color="'#41D234'"
          :value="overallProgress"
        >
          <div class="progress-value">
            {{ overallProgress }} %
          </div>
        </v-progress-circular>
      </div>
      <div class="progress-steps-wr">
        <div v-if="stepDetails.length > 0" class="progress-steps">
          <div v-for="stepDetail in stepDetails" :key="stepDetail.stepCtx" class="progress-step">
            <TenantCreationStep
              :name="stepDetails.filter(step => step.stepCtx === stepDetail.stepCtx)[0].name "
              :internal-steps="groupedSteps[stepDetail.stepCtx]"
            />
          </div>
        </div>
        <div v-else class="step-loader">
          <v-progress-circular indeterminate />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { groupArrayOfObjects } from '~/commons/utils'
import TenantCreationStep from '~/components/TenantCreationStep'

export default {
  components: { TenantCreationStep },
  layout: 'waiting',
  data () {
    return {
      ready: false,
      stepDetails: [],
      allInternalSteps: [],
      groupedSteps: []
    }
  },
  computed: {
    overallProgress () {
      if (this.stepDetails.length > 0) {
        const succeededSteps = this.allInternalSteps.filter(step => step.executionState === 'SUCCEEDED').length
        return parseInt((succeededSteps / this.allInternalSteps.length) * 100)
      } else {
        return 0
      }
    }
  },
  mounted () {
    this.pollInterval = setInterval(async () => {
      const { data } = await this.checkJobStatus()

      const {
        stepDetails,
        steps
      } = data

      const grouped = groupArrayOfObjects(steps, 'stepCtx')
      this.groupedSteps = grouped
      this.stepDetails = stepDetails
      this.allInternalSteps = steps

      if (data.executionState === 'SUCCEEDED') {
        clearInterval(this.pollInterval)
        window.location = '/'
      } else if (data.executionState === 'FAILED') {
        this.$toast.error('Tenant creation failed')
        await this.$router.push('/tenant/name')
        clearInterval(this.pollInterval)
      }
    }, 5000)
  },
  methods: {
    checkJobStatus () {
      return this.$axios.get(`${this.$config.EMPORIX_API_URL}automation/devportal/jobs/${localStorage.executionId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.authData).accessToken}`,
          'X-Proxy-Authorization': `Bearer ${JSON.parse(localStorage.authData).accessToken}`
        }
      })
    },
    addError (error) {
      this.errors.push(error)
    },
    clearErrors () {
      this.errors = []
    }
  }
}
</script>

<style lang="scss" scoped>
.waiting-container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;

  .text-highlight {
    color: $brand-blue-500;
  }

  .title {
    color: black;
    font-family: Lato, sans-serif;
    font-weight: bold;
    font-size: 48px;
    width: 600px;
    line-height: 58px;
    text-align: center;
    margin-bottom: 64px;
    @include tablet-down() {
      margin-bottom: 32px;
    }
  }
  .subtitle {
    font-size: 32px;
    font-weight: 700;
    line-height: 38px;
    text-align: center;
    color: $brand-grey-400
  }

  .brackets {
    margin-top: 24px;
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    text-align: center;
    color: black;
  }

  .progress-wr {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 64px;
    @include tablet-down() {
      flex-direction: column;
      margin-top: 32px;
    }

    .progress-circle-wr {
      align-self: flex-start;
      width: 400px;
      text-align: right;
      padding-right: 32px;
      @include tablet-down() {
        width: auto;
        align-self: unset;
        padding: 0;
      }

      .progress-value{
        color: black;
        font-size: 40px;
        line-height: 48px;
        display: flex;
        align-items: center;
        text-align: center;
      }
    }

    .progress-steps-wr {
      width: 400px;
      padding-left: 32px;
      @include tablet-down() {
        width: auto;
        padding: 32px 0 0;
      }

      .progress-steps {
        display: flex;
        flex-direction: column;

        .progress-step {
          margin-bottom: 24px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }

      .step-loader {
        margin-left: 100px;
        @include tablet-down() {
          margin-left: 0;
        }
      }
    }
  }
}
</style>

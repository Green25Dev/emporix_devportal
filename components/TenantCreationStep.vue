<template>
  <div class="flex">
    <div v-if="succeed">
      <CheckmarkIcon
        width="24"
        height="24"
        :color="'#009FE3'"
      />
    </div>
    <div v-if="failed">
      <TimesIcon
        width="24"
        height="24"
        :color="'red'"
      />
    </div>
    <v-progress-circular v-if="!succeed && !failed" indeterminate :size="24" :width="2" :color="'#009FE3'" />
    <div class="step-name" :class="{'running': !succeed && !failed}">
      {{ name }}
    </div>
  </div>
</template>

<script>
import CheckmarkIcon from '~/components/icons/CheckmarkIcon'
import TimesIcon from '~/components/icons/TimesIcon'

export default {
  name: 'TenantCreationStep',
  components: {
    TimesIcon,
    CheckmarkIcon
  },
  props: {
    internalSteps: {
      type: Array,
      default: () => {
        return []
      }
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      status: 'WAITING'
    }
  },
  computed: {
    succeed () {
      return this.internalSteps.every(step => step.executionState === 'SUCCEEDED')
    },
    failed () {
      return this.internalSteps.find(step => step.executionState === 'FAILED') !== undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.step-name {
  font-size: 24px;
  line-height: 28px;
  color: $brand-grey-400;
  margin-left: 16px;
  &.running {
    color: $brand-grey-300
  }
}
</style>

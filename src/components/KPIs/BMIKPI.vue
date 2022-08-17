<template>
  <KPI>
    <template v-slot:left-icon>
      <v-icon> mdi-gauge </v-icon>
    </template>
    <template v-slot:name> BMI </template>
    <template v-slot:value> {{ formatBMI }} </template>
  </KPI>
</template>

<script>
import KPI from './KPI.vue'

export default {
  name: 'AgeKPI',

  props: {
    BMI: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    KPI,
  },

  computed: {
    formatBMI() {
      if (this.disabled) {
        return '-'
      }
      return this.BMI === 0 ? this.BMI : this.BMI.toFixed(2)
    },
  },
}
</script>

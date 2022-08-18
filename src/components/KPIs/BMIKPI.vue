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
    },
  },

  components: {
    KPI,
  },

  computed: {
    formatBMI() {
      return this.BMI === undefined ? '-' : this.BMI.toFixed(2)
    },
  },
}
</script>

<template>
  <KPI>
    <template v-slot:left-icon>
      <v-icon> mdi-karate </v-icon>
    </template>
    <template v-slot:name> Z Score </template>
    <template v-slot:value> {{ formatZScore }} </template>
  </KPI>
</template>

<script>
import KPI from './KPI.vue'

export default {
  name: 'AgeKPI',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    zScore: {
      type: [String, Number],
      default: '',
    },
  },

  components: {
    KPI,
  },

  computed: {
    formatZScore() {
      if (this.disabled) {
        return '-'
      }
      return this.zScore === 0 ? this.zScore : this.zScore.toFixed(2)
    },
  },
}
</script>

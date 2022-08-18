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
    zScore: {
      type: Number,
    },
  },

  components: {
    KPI,
  },

  computed: {
    formatZScore() {
      return this.zScore === undefined ? '-' : this.zScore.toFixed(2)
    },
  },
}
</script>

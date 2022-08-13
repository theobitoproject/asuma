<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="6">
        <KPI>
          <template v-slot:left-icon>
            <v-icon> mdi-human-male-height </v-icon>
          </template>
          <template v-slot:name> Age [meses] </template>
          <template v-slot:value> {{ formatAge }} </template>
        </KPI>
      </v-col>
      <v-col cols="6">
        <KPI>
          <template v-slot:left-icon>
            <v-icon> mdi-gauge </v-icon>
          </template>
          <template v-slot:name> BMI </template>
          <template v-slot:value> {{ formatBMI }} </template>
        </KPI>
      </v-col>
      <v-col cols="6">
        <KPI>
          <template v-slot:left-icon>
            <v-icon> mdi-karate </v-icon>
          </template>
          <template v-slot:name> Z Score </template>
          <template v-slot:action>
            <v-btn v-if="dataIsValid" class="primary" x-small>
              <v-icon dark small> mdi-chart-line </v-icon>
            </v-btn>
          </template>
          <template v-slot:value> {{ formatZScore }} </template>
        </KPI>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { standards } from '../api/zscore/constants'
import KPI from './KPI.vue'

export default {
  name: 'ZScore',

  props: {
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 0,
    },
    BMI: {
      type: Number,
      default: 0,
    },
    zScores: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  components: {
    KPI,
  },

  standards,

  computed: {
    dataIsValid() {
      return Object.entries(this.zScoreForStandard).length !== 0
    },

    formatAge() {
      return this.dataIsValid ? this.age : '-'
    },

    formatBMI() {
      if (!this.dataIsValid) {
        return '-'
      }
      return this.BMI === 0 ? this.BMI : this.BMI.toFixed(4)
    },

    formatZScore() {
      if (!this.dataIsValid) {
        return '-'
      }
      return this.zScoreForStandard.value === 0
        ? this.zScoreForStandard.value
        : this.zScoreForStandard.value.toFixed(2)
    },

    zScoreForStandard() {
      if (!this.standardName || !this.zScores[this.standardName]) {
        return {}
      }
      return this.zScores[this.standardName]
    },
  },

  data() {
    return {
      standardName: '',
    }
  },

  created() {
    this.standardName = this.$options.standards[3].value
  },
}
</script>

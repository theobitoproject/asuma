<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-chip color="primary chip" :ripple="false">
          <v-icon left> mdi-human-male-height </v-icon>
          Age: {{ formatAge }} {{ yearLabel }}
        </v-chip>
      </v-col>
      <v-col cols="4">
        <v-chip color="primary chip" :ripple="false">
          <v-icon left> mdi-gauge </v-icon>
          BMI: {{ formatBMI }}
        </v-chip>
      </v-col>
      <v-col cols="4">
        <v-chip color="primary chip" :ripple="false">
          <v-icon left> mdi-karate </v-icon>
          Z Score: {{ formatZScore }}
        </v-chip>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { standards } from './constants'

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

    yearLabel() {
      if (!this.dataIsValid) {
        return ''
      }
      return this.age === 1 ? 'año' : 'años'
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

<style lang="scss" scoped>
.chip {
  width: 100%;
}
</style>

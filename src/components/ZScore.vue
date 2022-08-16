<template>
  <div>
    <v-row class="ma-0">
      <v-col cols="6">
        <KPI>
          <template v-slot:left-icon>
            <v-icon> mdi-human-male-height </v-icon>
          </template>
          <template v-slot:name> Age [months] </template>
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
    </v-row>
    <v-row justify="center" class="ma-0">
      <v-col cols="12">
        <StandardSelect v-model="standard" :disabled="!dataIsValid" />
      </v-col>
      <v-col cols="6">
        <KPI>
          <template v-slot:left-icon>
            <v-icon> mdi-karate </v-icon>
          </template>
          <template v-slot:name> Z Score </template>
          <template v-slot:action>
            <div class="mt-n1">
              <v-btn
                v-if="dataIsValid"
                class="primary"
                x-small
                @click="displayZScoreCharts = true"
              >
                <v-icon dark small> mdi-chart-line </v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:value> {{ formatZScore }} </template>
        </KPI>
      </v-col>
    </v-row>
    <v-row justify="center" class="ma-0">
      <v-dialog
        v-model="displayZScoreCharts"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card tile>
          <ZScoreCharts
            v-model="standard"
            :gender="gender"
            :zScore="zScoreForStandard"
            @close="hideZScoreCharts"
          />
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { standards } from '../api/zscore/constants'
import KPI from './KPI.vue'
import StandardSelect from './StandardSelect.vue'
import ZScoreCharts from './ZScoreCharts.vue'

export default {
  name: 'ZScore',

  props: {
    gender: {
      type: String,
      default: '',
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
    StandardSelect,
    ZScoreCharts,
  },

  computed: {
    dataIsValid() {
      return (
        !!this.gender && Object.entries(this.zScoreForStandard).length !== 0
      )
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
      if (!this.standard || !this.zScores[this.standard]) {
        return {}
      }

      return this.zScores[this.standard]
    },
  },

  data() {
    return {
      displayZScoreCharts: false,
      standard: standards[3].value,
    }
  },

  methods: {
    hideZScoreCharts() {
      this.displayZScoreCharts = false
    },
  },
}
</script>

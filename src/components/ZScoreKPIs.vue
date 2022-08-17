<template>
  <v-container>
    <v-row justify="center" class="ma-0">
      <v-col cols="6" md="5">
        <KPI>
          <template v-slot:left-icon>
            <v-icon> mdi-human-male-height </v-icon>
          </template>
          <template v-slot:name> Age </template>
          <template v-slot:value> {{ formatAge }} </template>
        </KPI>
      </v-col>
      <v-col cols="6" md="5">
        <KPI>
          <template v-slot:left-icon>
            <v-icon> mdi-gauge </v-icon>
          </template>
          <template v-slot:name> BMI </template>
          <template v-slot:value> {{ formatBMI }} </template>
        </KPI>
      </v-col>
      <v-col cols="12" md="10">
        <slot name="standardSelect" />
      </v-col>
      <v-col cols="7" sm="9" md="5">
        <KPI>
          <template v-slot:left-icon>
            <v-icon> mdi-karate </v-icon>
          </template>
          <template v-slot:name> Z Score </template>
          <template v-slot:action>
            <div class="mt-n1 d-flex d-sm-none">
              <v-btn
                class="primary"
                x-small
                :disabled="disabled"
                @click="$emit('displayZScoreCharts')"
              >
                <v-icon dark small> mdi-chart-line </v-icon>
              </v-btn>
            </div>
          </template>
          <template v-slot:value> {{ formatZScore }} </template>
        </KPI>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KPI from './KPI.vue'

export default {
  name: 'ZScore',

  props: {
    age: {
      type: Number,
      default: 0,
    },
    BMI: {
      type: Number,
      default: 0,
    },
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
    formatAge() {
      return this.disabled ? '-' : this.age
    },

    formatBMI() {
      if (this.disabled) {
        return '-'
      }
      return this.BMI === 0 ? this.BMI : this.BMI.toFixed(2)
    },

    formatZScore() {
      if (this.disabled) {
        return '-'
      }
      return this.zScore === 0 ? this.zScore : this.zScore.toFixed(2)
    },
  },
}
</script>

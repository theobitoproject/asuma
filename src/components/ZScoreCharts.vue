<template>
  <div class="pa-4">
    <v-row justify="space-between">
      <v-col cols="8">
        <div class="standard-select">
          <StandardSelect v-model="localStandard" />
        </div>
      </v-col>
      <v-col cols="4">
        <div class="d-flex justify-end">
          <v-btn rounded @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <div>
      <ChartComp
        canvasId="z-score-chart"
        :datasets="datasets"
        :labels="labels"
        ref="zScoreChart"
      />
    </div>
  </div>
</template>

<script>
import { getDataSets } from '../api/zscore/getDataSets'
import ChartComp from './ChartComp.vue'
import StandardSelect from './StandardSelect.vue'

export default {
  name: 'ZScoreCharts',

  model: {
    prop: 'standard',
  },

  props: {
    gender: {
      type: String,
      required: true,
    },
    standard: {
      type: String,
      required: true,
    },
    zScore: {
      type: Object,
      required: true,
    },
  },

  components: {
    ChartComp,
    StandardSelect,
  },

  computed: {
    localStandard: {
      get() {
        return this.standard
      },
      set(newStandard) {
        this.$emit('input', newStandard)
      },
    },
  },

  watch: {
    async standard() {
      await this.render()
    },
  },

  data() {
    return {
      datasets: [],
      labels: [],
    }
  },

  methods: {
    async render() {
      const { labels, datasets } = await getDataSets(
        this.standard,
        this.gender,
        this.zScore
      )
      this.datasets = datasets
      this.labels = labels

      await this.$nextTick()

      this.$refs.zScoreChart.render()
    },
  },

  async mounted() {
    await this.render()
  },
}
</script>

<style lang="scss" scoped>
.standard-select {
  max-width: 15rem;
}
</style>

<template>
  <div class="pa-4">
    <div v-if="displayHandlers">
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
    </div>
    <div :class="{ 'chart-container': !forMobile }">
      <ChartComp
        :canvasId="canvasId"
        :datasets="datasets"
        :labels="labels"
        :options="options"
        :plugins="$options.plugins"
        ref="zScoreChart"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { addZScoreDataset, getDataSets } from './getDataSets'
import { getOptions } from './options'
import { plugins } from './plugins'
import { getRandomString } from '../../utils/strings'
import ChartComp from '../ChartComp.vue'
import StandardSelect from '../StandardSelect.vue'

export default {
  name: 'ZScoreCharts',

  model: {
    prop: 'standard',
  },

  props: {
    age: {
      type: Number,
    },
    BMI: {
      type: Number,
    },
    child: {
      type: Object,
      required: true,
    },
    displayHandlers: {
      type: Boolean,
      default: true,
    },
    forMobile: {
      type: Boolean,
      default: false,
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

  plugins,

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
      canvasId: `z-score-charts-${getRandomString(10)}`,
      datasets: [],
      labels: [],
      options: {},
    }
  },

  methods: {
    ...mapMutations('ErrorModule', [
      'setDisplayError',
      'setGenericErrorMessage',
    ]),
    ...mapMutations('LoadingModule', ['setLoading']),

    async render() {
      try {
        this.setLoading(true)

        const { labels, datasets } = await getDataSets(
          this.standard,
          this.child.gender,
          this.zScore
        )
        addZScoreDataset(
          datasets,
          this.standard,
          this.child,
          this.age,
          this.BMI
        )

        this.datasets = datasets
        this.labels = labels

        const breakpoint = this.$vuetify.breakpoint.name
        let aspectRatio = 1.3
        if (breakpoint === 'xs') {
          aspectRatio = 0.5
        } else if (breakpoint === 'sm') {
          aspectRatio = 1.3
        }

        this.options = getOptions(this.standard, aspectRatio)

        await this.$nextTick()

        this.$refs.zScoreChart.render()
      } catch (err) {
        console.error(err)
        this.setGenericErrorMessage()
        this.setDisplayError(true)
      } finally {
        this.setLoading(false)
      }
    },
  },

  async mounted() {
    await this.render()
  },
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

.chart-container {
  margin: 0 auto;
  width: 800px;
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  .chart-container {
    width: 100%;
  }
}

.standard-select {
  max-width: 15rem;
}
</style>

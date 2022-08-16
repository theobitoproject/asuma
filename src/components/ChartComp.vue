<template>
  <canvas :id="canvasId"></canvas>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'ChartComp',

  props: {
    canvasId: {
      type: String,
      required: true,
    },
    datasets: {
      type: Array,
      default() {
        return []
      },
    },
    labels: {
      type: Array,
      default() {
        return []
      },
    },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
    plugins: {
      type: Array,
      default() {
        return []
      },
    },
    type: {
      type: String,
      default: 'line',
    },
  },

  data() {
    return {
      chartHandler: null,
      loading: false,
    }
  },

  methods: {
    clear() {
      if (this.chartHandler) {
        this.chartHandler.destroy()
      }
    },

    getConfig() {
      return {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          ...this.options,
          animation: {
            onComplete: () => {
              this.loading = false
            },
          },
        },
        plugins: this.plugins,
      }
    },

    render() {
      if (this.loading) {
        return
      }

      this.loading = true

      this.clear()

      this.chartHandler = new Chart(
        document.getElementById(this.canvasId),
        this.getConfig()
      )
    },
  },
}
</script>

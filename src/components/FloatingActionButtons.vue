<template>
  <div class="floating-container">
    <v-btn color="primary" fab dark @click="$emit('getZScore')">
      <v-icon>mdi-clipboard-search-outline</v-icon>
    </v-btn>

    <v-btn class="mt-4" color="green" fab dark @click="displayCharts">
      <v-icon>mdi-chart-line</v-icon>
    </v-btn>

    <v-btn class="mt-4" fab @click="$emit('reset')">
      <v-icon>mdi-delete</v-icon>
    </v-btn>

    <SnackBar
      color="red lighten-1"
      :show="displayRequiredMessage"
      :timeout="4000"
      @close="displayRequiredMessage = false"
    >
      <template v-slot:content> Compute Z Score first </template>
    </SnackBar>
  </div>
</template>

<script>
import SnackBar from './SnackBar.vue'

export default {
  name: 'FloatingActionButtons',

  props: {
    disableDisplayCharts: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    SnackBar,
  },

  data() {
    return {
      displayRequiredMessage: false,
    }
  },

  methods: {
    displayCharts() {
      if (this.disableDisplayCharts) {
        this.displayRequiredMessage = true
        return
      }
      this.$emit('displayCharts')
    },
  },
}
</script>

<style lang="scss" scoped>
.floating-container {
  bottom: 48px;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 16px;
  z-index: 100;
}
</style>

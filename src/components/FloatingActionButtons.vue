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
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'FloatingActionButtons',

  props: {
    disableDisplayCharts: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      displayRequiredMessage: false,
    }
  },

  methods: {
    ...mapMutations('ErrorModule', ['setDisplayError', 'setErrorMessage']),

    displayCharts() {
      if (this.disableDisplayCharts) {
        this.setErrorMessage('Compute Z Score first')
        this.setDisplayError(true)
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

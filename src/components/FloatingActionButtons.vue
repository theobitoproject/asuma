<template>
  <div class="floating-container">
    <v-btn color="primary" fab dark @click="$emit('getZScore')">
      <v-icon>mdi-clipboard-search-outline</v-icon>
    </v-btn>

    <v-btn class="mt-4" color="green" fab dark @click="$emit('displayCharts')">
      <v-icon>mdi-chart-line</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'FloatingActionButtons',
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

<template>
  <v-card elevation="2">
    <v-card-text>
      <slot name="left-icon" />
      <slot name="name" />
      <br />
      <v-card-subtitle class="font-weight-bold primary--text text-h5 value">
        <slot name="value" />
      </v-card-subtitle>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'KPI',
}
</script>

<style lang="scss" scoped>
.value {
  text-align: center;
}
</style>

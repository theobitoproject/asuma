<template>
  <v-card elevation="2">
    <v-card-text>
      <slot name="left-icon" />
      <span>
        <slot name="name" />
      </span>
      <span class="float-right">
        <slot name="action" />
      </span>
      <br />
      <v-card-subtitle
        class="font-weight-bold primary--text text-h6 value pa-1"
      >
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

<template>
  <KPI>
    <template v-slot:left-icon>
      <v-icon> mdi-human-male-height </v-icon>
    </template>
    <template v-slot:name> Age [months] </template>
    <template v-slot:value> {{ formatAge }} </template>
  </KPI>
</template>

<script>
import KPI from './KPI.vue'

export default {
  name: 'AgeKPI',

  props: {
    age: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    KPI,
  },

  computed: {
    formatAge() {
      return this.disabled ? '-' : this.age
    },
  },
}
</script>

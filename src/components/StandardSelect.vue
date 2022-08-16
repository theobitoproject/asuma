<template>
  <v-select
    v-model="localStandard"
    :items="$options.standards"
    label="Standard"
    dense
    :disabled="disabled"
  ></v-select>
</template>

<script>
import { standards } from '../api/zscore/constants'

export default {
  name: 'StandardSelect',

  model: {
    prop: 'standard',
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    standard: {
      type: String,
      default: '',
    },
  },

  standards,

  computed: {
    localStandard: {
      get() {
        if (!this.standard) {
          return ''
        }
        return this.$options.standards.find((st) => st.value === this.standard)
      },
      set(newStandard) {
        this.$emit('input', newStandard)
      },
    },
  },
}
</script>

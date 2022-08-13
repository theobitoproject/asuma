<template>
  <div class="pa-4">
    <v-row>
      <v-col cols="9">
        <StandardSelect v-model="localStandard" />
      </v-col>
      <v-col cols="2">
        <v-btn rounded @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StandardSelect from './StandardSelect.vue'

export default {
  name: 'ZScoreCharts',

  model: {
    prop: 'standard',
  },

  props: {
    standard: {
      type: String,
      default: '',
    },
  },

  components: {
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
}
</script>

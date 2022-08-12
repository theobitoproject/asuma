<template>
  <v-dialog ref="dialog" v-model="displayPicker" persistent width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="localDate"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="$attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="localDate"
      scrollable
      @change="displayPicker = false"
    ></v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: 'DatePicker',

  model: {
    prop: 'date',
  },

  props: {
    date: {
      type: [Date, String],
      default: null,
    },

    label: {
      type: String,
      required: true,
    },
  },

  computed: {
    localDate: {
      get() {
        return this.date
      },
      set(newDate) {
        this.$emit('input', newDate)
      },
    },
  },

  data() {
    return {
      displayPicker: false,
    }
  },
}
</script>

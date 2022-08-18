<template>
  <v-snackbar v-model="localShow" :timeout="timeout">
    <slot name="content" />

    <template v-slot:action="{ attrs }">
      <v-btn :color="color" text v-bind="attrs" @click="$emit('close')">
        <slot name="closeLabel">Close</slot>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',

  props: {
    color: {
      type: String,
      default: undefined,
    },
    show: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
  },

  computed: {
    localShow: {
      get() {
        return this.show
      },
      set() {
        this.$emit('close')
      },
    },
  },
}
</script>

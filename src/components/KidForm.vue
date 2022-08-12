<template>
  <v-form v-model="dataIsValid">
    <v-container>
      <v-row>
        <v-col cols="6">
          <DatePicker
            v-model="localKid.dateOfBirth"
            label="Birthdate"
            required
            :rules="commonRules"
          />
        </v-col>
        <v-col cols="6">
          <DatePicker
            v-model="localKid.dateOfVisit"
            label="Date of visit"
            required
            :rules="commonRules"
          />
        </v-col>

        <v-col cols="6">
          <v-radio-group
            v-model="localKid.gender"
            required
            :rules="commonRules"
          >
            <template v-slot:label> Gender </template>
            <v-radio label="Boy" value="boy"></v-radio>
            <v-radio label="Girl" value="girl"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="6">
          <v-radio-group
            v-model="localKid.measuredType"
            required
            :rules="commonRules"
          >
            <template v-slot:label> Measured Type </template>
            <v-radio label="Recumbent" value="recumbent"></v-radio>
            <v-radio label="Standing" value="standing"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="localKid.height"
            label="Height"
            type="number"
            required
            :rules="sizeRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="localKid.weight"
            label="Weight"
            type="number"
            required
            :rules="sizeRules"
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="mt-8 d-flex justify-center">
        <v-btn class="center" @click="$emit('submit')" :disabled="!dataIsValid">
          <slot name="submitLabel" />
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import DatePicker from './DatePicker'

export default {
  name: 'KidForm',

  components: {
    DatePicker,
  },

  model: {
    prop: 'kid',
  },

  props: {
    kid: {
      type: Object,
      default() {
        return
      },
    },
  },

  computed: {
    localKid: {
      get() {
        return this.kid
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },
  },

  data() {
    const commonRules = [(v) => !!v || 'Required']

    return {
      dataIsValid: false,
      commonRules,
      sizeRules: [
        ...commonRules,
        (v) => v > 0 || 'Name must be greater than 0',
      ],
    }
  },
}
</script>

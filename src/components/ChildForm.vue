<template>
  <v-form v-model="dataIsValid" ref="childForm">
    <v-container>
      <v-row>
        <v-col cols="6">
          <DatePicker
            v-model="localChild.dateOfBirth"
            label="Birthdate"
            hint="[YYYY-MM-DD]"
            persistent-hint
            required
            :rules="commonRules"
          />
        </v-col>
        <v-col cols="6">
          <DatePicker
            v-model="localChild.dateOfVisit"
            label="Date of visit"
            hint="[YYYY-MM-DD]"
            persistent-hint
            required
            :rules="commonRules"
          />
        </v-col>

        <v-col cols="6">
          <v-radio-group
            v-model="localChild.gender"
            required
            :rules="commonRules"
            class="mt-0 pt-0"
          >
            <template v-slot:label> Gender </template>
            <v-radio label="Boy" value="boy"></v-radio>
            <v-radio label="Girl" value="girl"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="6">
          <v-radio-group
            v-model="localChild.measuredType"
            required
            :rules="commonRules"
            class="mt-0 pt-0"
          >
            <template v-slot:label> Measured Type </template>
            <v-radio label="Recumbent" value="recumbent"></v-radio>
            <v-radio label="Standing" value="standing"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="6">
          <v-text-field
            v-model="localChild.height"
            label="Length / Height [cm]"
            type="number"
            required
            :rules="sizeRules"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="localChild.weight"
            label="Weight [kg]"
            type="number"
            required
            :rules="sizeRules"
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="mt-8 d-none d-sm-flex justify-center">
        <v-btn class="center mr-1" @click="reset">
          <slot name="resetLabel">reset</slot>
        </v-btn>
        <v-btn
          class="primary center ml-1"
          @click="$emit('submit')"
          :disabled="!dataIsValid"
        >
          <slot name="submitLabel">Submit</slot>
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>

<script>
import DatePicker from './DatePicker'

export default {
  name: 'ChildForm',

  components: {
    DatePicker,
  },

  model: {
    prop: 'child',
  },

  props: {
    child: {
      type: Object,
      default() {
        return
      },
    },
  },

  computed: {
    localChild: {
      get() {
        return this.child
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

  methods: {
    async reset() {
      this.$refs.childForm.reset()

      await this.$nextTick()

      this.$emit('resetted')
    },
  },
}
</script>

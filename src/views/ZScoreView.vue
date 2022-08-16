<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <ChildForm
          v-model="child"
          @submit="getZScore"
          @resetted="handleFormReset"
        >
          <template v-slot:submitLabel> Get Z Score </template>
        </ChildForm>
      </v-col>
      <v-col cols="12" sm="6">
        <ZScoreKPIs
          :gender="child.gender"
          :age="zScoreData.age"
          :BMI="zScoreData.BMI"
          :zScore="zScoreForStandard.value"
          :disabled="!dataIsValid"
          @displayZScoreCharts="displayZScoreCharts = true"
        >
          <template v-slot:standardSelect>
            <StandardSelect v-model="standard" :disabled="!dataIsValid" />
          </template>
        </ZScoreKPIs>
      </v-col>
      <v-col cols="12" class="d-none d-sm-block"> hold for charts </v-col>
      <v-dialog
        v-model="displayZScoreCharts"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card tile>
          <ZScoreCharts
            v-if="displayZScoreCharts"
            v-model="standard"
            :gender="child.gender"
            :zScore="zScoreForStandard"
            @close="displayZScoreCharts = false"
          />
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { getZScore } from '../api/zscore/getZScore'
import { mapMutations } from 'vuex'
import { standards } from '../api/zscore/constants'
import ChildForm from '../components/ChildForm'
import StandardSelect from '../components/StandardSelect.vue'
import ZScoreCharts from '../components/ZScoreCharts.vue'
import ZScoreKPIs from '../components/ZScoreKPIs'

export default {
  name: 'ZScoreView',

  components: {
    ChildForm,
    StandardSelect,
    ZScoreCharts,
    ZScoreKPIs,
  },

  computed: {
    dataIsValid() {
      return (
        !!this.child.gender &&
        Object.entries(this.zScoreForStandard).length !== 0
      )
    },

    zScoreForStandard() {
      if (!this.standard || !this.zScoreData.zScores) {
        return {}
      }

      if (!this.zScoreData.zScores[this.standard]) {
        return {}
      }

      return this.zScoreData.zScores[this.standard]
    },
  },

  data() {
    return {
      child: {
        dateOfBirth: '2019-09-20',
        dateOfVisit: '2021-07-07',
        gender: 'boy',
        measuredType: 'recumbent',
        height: '79.5',
        weight: '8.7',
      },
      displayZScoreCharts: false,
      standard: standards[3].value,
      zScoreData: {},
    }
  },

  methods: {
    ...mapMutations('LoadingModule', ['setLoading']),

    async getZScore() {
      try {
        this.setLoading(true)
        this.zScoreData = await getZScore(this.child)
      } catch (err) {
        console.error(err)
      } finally {
        this.setLoading(false)
      }
    },

    handleFormReset() {
      this.zScoreData = {}
    },
  },
}
</script>

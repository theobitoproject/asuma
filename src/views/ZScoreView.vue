<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <ChildForm
          v-model="child"
          ref="childForm"
          @submit="getZScore"
          @resetted="reset"
        >
          <template v-slot:submitLabel> Get Z Score </template>
        </ChildForm>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <div class="mt-sm-4">
          <v-container>
            <v-row justify="center" justify-md="start">
              <v-col cols="12" md="5" lg="4">
                <StandardSelect v-model="standard" :disabled="!dataIsValid" />
              </v-col>
              <v-col cols="7" class="d-none d-md-block d-lg-none"> </v-col>
              <v-col cols="6" md="4" lg="3">
                <AgeKPI :age="zScoreData.age" :disabled="!dataIsValid" />
              </v-col>
              <v-col cols="6" md="4" lg="2">
                <BMIKPI :BMI="zScoreData.BMI" :disabled="!dataIsValid" />
              </v-col>
              <v-col cols="7" md="4" lg="3">
                <ZScoreKPI
                  :zScore="zScoreForStandard.value"
                  :disabled="!dataIsValid"
                />
              </v-col>
              <v-col cols="12" class="d-none d-md-block">
                <ZScoreCharts
                  v-if="dataIsValid"
                  v-model="standard"
                  :gender="child.gender"
                  :zScore="zScoreForStandard"
                  :displayHandlers="false"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
      <v-col cols="12" class="d-none d-sm-block d-md-none">
        <ZScoreCharts
          v-if="dataIsValid"
          v-model="standard"
          :gender="child.gender"
          :zScore="zScoreForStandard"
          :displayHandlers="false"
        />
      </v-col>
    </v-row>
    <div class="d-block d-sm-none">
      <FloatingActionButtons
        :disableDisplayCharts="!dataIsValid"
        @getZScore="getZScore"
        @displayCharts="displayCharts"
        @reset="$refs.childForm.reset()"
      />
    </div>
    <v-dialog
      v-model="displayChartsOnDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <ZScoreCharts
          v-if="displayChartsOnDialog"
          v-model="standard"
          :forMobile="true"
          :gender="child.gender"
          :zScore="zScoreForStandard"
          @close="displayChartsOnDialog = false"
        />
      </v-card>
    </v-dialog>

    <SnackBar
      color="red lighten-1"
      :show="displayErrorMessage"
      :timeout="4000"
      @close="displayErrorMessage = false"
    >
      <template v-slot:content> We're sorry. Something failed! </template>
    </SnackBar>
  </v-container>
</template>

<script>
import { getZScore } from '../api/zscore/getZScore'
import { mapMutations } from 'vuex'
import { standards } from '../api/zscore/constants'
import { fetchObject, storeObject } from '../utils/local-storage'
import AgeKPI from '../components/KPIs/AgeKPI.vue'
import BMIKPI from '../components/KPIs/BMIKPI.vue'
import ChildForm from '../components/ChildForm'
import FloatingActionButtons from '../components/FloatingActionButtons.vue'
import SnackBar from '../components/SnackBar.vue'
import StandardSelect from '../components/StandardSelect.vue'
import ZScoreCharts from '../components/ZScoreCharts.vue'
import ZScoreKPI from '../components/KPIs/ZScoreKPI.vue'

const initialChildData = {
  dateOfBirth: '2019-09-20',
  dateOfVisit: '2021-07-07',
  gender: 'boy',
  measuredType: 'recumbent',
  height: '79.5',
  weight: '8.7',
}

const CHILD_DATA_STORE_KEY = 'child_data'

export default {
  name: 'ZScoreView',

  components: {
    AgeKPI,
    BMIKPI,
    ChildForm,
    FloatingActionButtons,
    SnackBar,
    StandardSelect,
    ZScoreCharts,
    ZScoreKPI,
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

  watch: {
    child: {
      handler() {
        this.saveChildInLocal()
      },
      deep: true,
    },
  },

  data() {
    const storedChildData = fetchObject(CHILD_DATA_STORE_KEY)
    const child = storedChildData === null ? initialChildData : storedChildData

    return {
      child,
      displayChartsOnDialog: false,
      displayErrorMessage: false,
      standard: standards[3].value,
      zScoreData: {},
    }
  },

  methods: {
    ...mapMutations('LoadingModule', ['setLoading']),

    displayCharts() {
      if (this.$vuetify.breakpoint.name === 'xs') {
        this.displayChartsOnDialog = true
      }
    },

    async getZScore() {
      try {
        this.setLoading(true)
        this.zScoreData = await getZScore(this.child)
      } catch (err) {
        console.error(err)
        this.displayErrorMessage = true
      } finally {
        this.setLoading(false)
      }
    },

    reset() {
      this.zScoreData = {}
    },

    saveChildInLocal() {
      storeObject(CHILD_DATA_STORE_KEY, this.child)
    },
  },
}
</script>

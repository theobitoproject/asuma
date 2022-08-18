<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <ChildForm v-model="child" ref="childForm" @submit="getZScore">
          <template v-slot:submitLabel> Calculate </template>
        </ChildForm>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <div class="mt-sm-4">
          <v-container>
            <v-row justify="center" justify-md="start">
              <v-col cols="12" md="5" lg="4">
                <StandardSelect v-model="standard" />
              </v-col>
              <v-col cols="7" class="d-none d-md-block d-lg-none"> </v-col>
              <v-col cols="6" md="4" lg="3">
                <AgeKPI :age="zScoreData.age" />
              </v-col>
              <v-col cols="6" md="4" lg="2">
                <BMIKPI :BMI="zScoreData.BMI" />
              </v-col>
              <v-col cols="7" md="4" lg="3">
                <ZScoreKPI :zScore="zScoreForStandard.value" />
              </v-col>
              <v-col cols="12" class="d-none d-md-block">
                <ZScoreCharts
                  v-model="standard"
                  :age="zScoreData.age"
                  :BMI="zScoreData.BMI"
                  :child="child"
                  :zScore="zScoreForStandard"
                  :displayHandlers="false"
                  ref="zScoreCharts1"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
      <v-col cols="12" class="d-none d-sm-block d-md-none">
        <ZScoreCharts
          v-model="standard"
          :age="zScoreData.age"
          :BMI="zScoreData.BMI"
          :child="child"
          :zScore="zScoreForStandard"
          :displayHandlers="false"
          ref="zScoreCharts2"
        />
      </v-col>
    </v-row>
    <div class="d-block d-sm-none">
      <FloatingActionButtons
        @getZScore="getZScore"
        @displayCharts="displayCharts"
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
          :age="zScoreData.age"
          :BMI="zScoreData.BMI"
          :child="child"
          :zScore="zScoreForStandard"
          @close="displayChartsOnDialog = false"
        />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getZScore } from '../api/zscore'
import { mapMutations } from 'vuex'
import { standards } from '../domain/standard'
import { fetchObject, storeObject } from '../utils/localStorage'
import AgeKPI from '../components/KPIs/AgeKPI.vue'
import BMIKPI from '../components/KPIs/BMIKPI.vue'
import ChildForm from '../components/ChildForm'
import FloatingActionButtons from '../components/FloatingActionButtons.vue'
import StandardSelect from '../components/StandardSelect.vue'
import ZScoreCharts from '../components/ZScoreCharts/ZScoreCharts.vue'
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
      standard: standards[3].value,
      zScoreData: {},
    }
  },

  methods: {
    ...mapMutations('ErrorModule', [
      'setDisplayError',
      'setGenericErrorMessage',
    ]),
    ...mapMutations('LoadingModule', ['setLoading']),

    displayCharts() {
      if (this.isMobile()) {
        this.displayChartsOnDialog = true
      }
    },

    isMobile() {
      return this.$vuetify.breakpoint.name === 'xs'
    },

    async getZScore() {
      try {
        this.setLoading(true)
        this.zScoreData = await getZScore(this.child)
        if (!this.isMobile()) {
          await this.$nextTick()
          await this.updateCharts()
        }
      } catch (err) {
        console.error(err)
        this.setGenericErrorMessage()
        this.setDisplayError(true)
      } finally {
        this.setLoading(false)
      }
    },

    async updateCharts() {
      // TODO: how to handle these two chart components?
      // setting 1 and 2 is hacky and brittle
      await this.$refs.zScoreCharts1.render()
      await this.$refs.zScoreCharts2.render()
    },

    saveChildInLocal() {
      storeObject(CHILD_DATA_STORE_KEY, this.child)
    },
  },
}
</script>

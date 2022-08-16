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
        <ZScore
          :gender="child.gender"
          :age="zScoreData.age"
          :BMI="zScoreData.BMI"
          :zScores="zScoreData.zScores"
        />
      </v-col>
      <v-col cols="12" class="d-none d-sm-block"> hold for charts </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { getZScore } from '../api/zscore/getZScore'
import ChildForm from '../components/ChildForm'
import ZScore from '../components/ZScore'

export default {
  name: 'ZScoreView',

  components: {
    ChildForm,
    ZScore,
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

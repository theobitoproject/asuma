<template>
  <div>
    <ChildForm v-model="child" @submit="getZScore" @resetted="handleFormReset">
      <template v-slot:submitLabel> Get Z Score </template>
    </ChildForm>
    <div class="mt-4">
      <ZScore
        :gender="child.gender"
        :age="zScoreData.age"
        :BMI="zScoreData.BMI"
        :zScores="zScoreData.zScores"
      />
    </div>
  </div>
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

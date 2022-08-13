<template>
  <div>
    <ChildForm v-model="child" @submit="getZScore">
      <template v-slot:submitLabel> Get Z Score </template>
    </ChildForm>
    <ZScore
      :gender="child.gender"
      :age="zScoreData.age"
      :BMI="zScoreData.BMI"
      :zScores="zScoreData.zScores"
    />
  </div>
</template>

<script>
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
    async getZScore() {
      this.zScoreData = await getZScore(this.child)
    },
  },
}
</script>

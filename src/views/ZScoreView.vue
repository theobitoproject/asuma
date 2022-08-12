<template>
  <div>
    <KidForm v-model="kid" @submit="getZScore">
      <template v-slot:submitLabel> Get Z Score </template>
    </KidForm>
    <ZScore
      :gender="kid.gender"
      :age="zScoreData.age"
      :BMI="zScoreData.BMI"
      :zScores="zScoreData.zScores"
    />
  </div>
</template>

<script>
import KidForm from '../components/KidForm'
import ZScore from '../components/ZScore'

export default {
  name: 'ZScoreView',

  components: {
    KidForm,
    ZScore,
  },

  data() {
    return {
      kid: {
        dateOfBirth: '',
        dateOfVisit: '',
        gender: 'boy',
        measuredType: 'recumbent',
        height: '',
        weight: '',
      },
      zScoreData: {},
    }
  },

  methods: {
    getZScore() {
      alert('getting z score')
    },
  },
}
</script>

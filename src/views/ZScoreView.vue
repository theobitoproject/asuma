<template>
  <div>
    <KidForm v-model="kid" @submit="getZScore">
      <template v-slot:submitLabel> Get Z Score </template>
    </KidForm>
  </div>
</template>

<script>
import KidForm from '../components/KidForm'

export default {
  name: 'ZScoreView',

  components: {
    KidForm,
  },

  data() {
    return {
      kid: {
        dateOfBirth: '',
        dateOfVisit: '',
        gender: '',
        measuredType: '',
        height: '',
        weight: '',
      },
    }
  },

  methods: {
    getZScore() {
      alert('getting z score')
    },
  },
}
</script>

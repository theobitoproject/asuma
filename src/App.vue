<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-avatar size="50px" color="white">
        <img src="./assets/logo.svg" alt="logo" />
      </v-avatar>

      <div class="d-flex align-center ml-4">
        <div class="text-h4">Chiki</div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-overlay :value="loading" z-index="300">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState('LoadingModule', ['loading']),
  },
}
</script>

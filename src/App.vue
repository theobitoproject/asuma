<template>
  <v-app>
    <v-app-bar app color="primary" dark fixed>
      <v-container>
        <v-row>
          <v-avatar size="45px" color="white">
            <img src="./assets/logo.svg" alt="logo" />
          </v-avatar>

          <div class="d-flex align-center ml-4">
            <div class="text-h4">Chiki</div>
          </div>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer padless>
      <v-card class="flex primary lighten-1" flat tile>
        <v-card-text class="py-2 white--text text-center">
          Created and maintain by
          <a class="white--text" :href="$options.contactUrl" target="_blank"
            ><strong>The Obito Project</strong></a
          >
          <v-icon right color="white"> mdi-arm-flex </v-icon>
        </v-card-text>
      </v-card>
    </v-footer>

    <SnackBar
      color="red lighten-1"
      :show="displayError"
      :timeout="timeout"
      @close="closeSnackBar"
    >
      <template v-slot:content> {{ message }} </template>
    </SnackBar>

    <v-overlay :value="loading" z-index="300">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { ENVARS, getEnvar } from './utils/enver'
import SnackBar from './components/SnackBar.vue'

const contactUrl = getEnvar(ENVARS.CONTACT_URL)

export default {
  name: 'App',

  contactUrl,

  components: {
    SnackBar,
  },

  computed: {
    ...mapState('ErrorModule', ['displayError', 'message', 'timeout']),
    ...mapState('LoadingModule', ['loading']),
  },

  methods: {
    ...mapMutations('ErrorModule', ['setDisplayError']),

    closeSnackBar() {
      this.setDisplayError(false)
    },
  },
}
</script>

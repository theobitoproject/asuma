export default {
  namespaced: true,

  state: {
    displayError: false,
    message: '',
    timeout: 4000,
  },

  mutations: {
    setDisplayError(state, displayError) {
      state.displayError = displayError
    },

    setErrorMessage(state, message) {
      state.message = message
    },

    setGenericErrorMessage(state) {
      state.message = "We're sorry. Something failed!"
    },
  },
}

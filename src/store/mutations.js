const mutations = {
  setRegistration (state, payload) {
    console.log(payload)
    state.registration = payload
    console.log(state.registration)
  }
}

export default mutations

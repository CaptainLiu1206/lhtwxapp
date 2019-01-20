const mutations = {
  setRegistration (state, payload) {
    state.registration = payload
  },
  setCurrentCity (state, city) {
    state.currentCity = city
  },
  setUser (state, user) {
    state.user = {...state.user, ...user}
  },
  setCityListAndCategories (state, {area, categories}) {
    state.cityList = area
    state.categories = categories
  }
}

export default mutations

const getters = {
  registration (state) {
    return state.registration
  },
  currentCity (state) {
    return state.currentCity
  },
  isAuthorization (state) {
    return state.user.isAuthorization
  },
  cityList (state) {
    return state.cityList
  },
  categories (state) {
    console.log(state.categories)
    return state.categories
  }
}

export default getters

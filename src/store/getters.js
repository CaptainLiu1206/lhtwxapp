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
    return state.categories
  },
  userInfo (state) {
    // console.log(state)
    return state.user
  }
}

export default getters

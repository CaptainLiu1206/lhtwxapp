const getters = {
  registration (state) {
    return state.registration
  },
  userInfo (state) {
    // console.log(state)
    return state.user
  },
  isAuthorization (state) {
    return state.user.isAuthorization
  },
  currentCity (state) {
    return {id: state.currentCityId, name: state.currentCityName}
  },
  cityList (state) {
    return state.cityList
  },
  categories (state) {
    return state.categories
  },
  currentCategoryId (state) {
    return state.currentCategoryId
  }
}

export default getters

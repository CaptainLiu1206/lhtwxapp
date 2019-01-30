const getters = {
  registrationInfo (state) {
    return state.registration
  },
  registrations (state) {
    return state.registrations
  },
  userInfo (state) {
    return state.user
  },
  indexData (state) {
    return state.indexData
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
  currentCategory (state) {
    return state.currentCategory
  },
  isIphoneX (state) {
    return state.isIphoneX
  },
  userBanners (state) {
    return state.userBanners
  }
}

export default getters

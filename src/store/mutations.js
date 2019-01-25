const mutations = {
  setRegistration (state, payload) {
    state.registration = payload
  },
  setCurrentCity (state, city) {
    state.currentCityId = city.id
    state.currentCityName = city.name
  },
  setUser (state, user) {
    state.user = {...state.user, ...user}
  },
  setCityListAndCategories (state, {cityList, categories}) {
    state.cityList = cityList
    state.categories = categories
  },
  setCurrentCategoryId (state, id) {
    state.currentCategoryId = id
  },
  setIsIphoneX (state, flag) {
    state.isIphoneX = flag
  },
  setUserBanners (state, banners) {
    state.userBanners = banners
  }
}

export default mutations

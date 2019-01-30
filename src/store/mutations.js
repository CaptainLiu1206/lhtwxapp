const mutations = {
  setRegistration (state, payload) {
    state.registration = payload
  },
  setRegistrations (state, payload) {
    state.registrations = payload
  },
  setCurrentCity (state, city) {
    state.currentCityId = city.id
    state.currentCityName = city.name
  },
  setUser (state, user) {
    state.user = {...state.user, ...user}

    state.registrations.push({
      realname: user.realname,
      phone: user.phone,
      email: user.email,
      companyName: user.companyName,
      position: user.companyPosition,
      remark: ''
    })
  },
  setCityListAndCategories (state, {cityList, categories, indexData}) {
    state.cityList = cityList
    state.categories = categories
    state.indexData = indexData
    state.currentCategory = categories[0]
  },
  setCurrentCategory (state, category) {
    state.currentCategory = category
  },
  setIsIphoneX (state, flag) {
    state.isIphoneX = flag
  },
  setUserBanners (state, banners) {
    state.userBanners = banners
  }
}

export default mutations

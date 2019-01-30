const state = {
  registration: {
    realname: '',
    phone: '',
    email: '',
    companyName: '',
    position: '',
    remark: ''
  },
  registrations: [],
  user: {
    id: '',
    isAuthorization: true,
    isLogin: false,
    openid: '',
    unionid: '',
    session_key: '',
    nickname: '',
    realname: '',
    userimage: '',
    province: '',
    city: '',
    address: '',
    companyName: '',
    companyPosition: '',
    email: '',
    gender: '',
    phone: '',
    country: ''
  },
  userBanners: [],
  categories: [],
  currentCategory: {},
  cityList: [],
  currentCityId: 0,
  currentCityName: '全球',
  isIphoneX: false,
  indexData: {
    sponsors: [],
    banners: [],
    advertisement: {},
    categories: [],
    newest: [],
    activities: []
  }
}

export default state

const state = {
  registration: {
    realname: '',
    phone: '',
    email: '',
    companyName: '',
    position: '',
    remark: ''
  },
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
  currentCategoryId: 0,
  cityList: [],
  currentCityId: 0,
  currentCityName: '全国',
  isIphoneX: false
}

export default state

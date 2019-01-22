const state = {
  registration: {
    name: '',
    mobile: '',
    email: '',
    company: '',
    job: '',
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
  categories: [],
  currentCategoryId: 0,
  cityList: [],
  currentCityId: 0,
  currentCityName: '全国'
}

export default state

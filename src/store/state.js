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
  cityList: [],
  categories: [],
  currentCity: '全国',
  setCurrentCategoryId: ''
}

export default state

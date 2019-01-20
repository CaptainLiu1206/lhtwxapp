import Fly from 'flyio/dist/npm/wx'

let fly = new Fly // eslint-disable-line

fly.config.baseURL = process.env.baseURL

// 添加请求拦截器
fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  wx.showLoading({ title: '拼命加载中...' })
  request.headers['X-Tag'] = 'flyio'
  // 打印出请求体
  // 终止请求
  // var err=new Error('xxx')
  // err.request=request
  // return Promise.reject(new Error(''))
  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    wx.hideLoading()
    return response.data
  },
  (err) => {
    wx.hideLoading()
    console.log(err)
    // 发生网络错误后会走到这里
    // return Promise.resolve('ssss')
  }
)

export default fly

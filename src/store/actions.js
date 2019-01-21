import fly from 'assets/js/http'
import { formatTime } from 'utils'

function errToast (msg) {
  wx.showToast({ title: msg, icon: 'none' })
}

function handlerActivityTime (time) {
  let {year, month, day, hour, minute, second} = formatTime(time)
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

function handleIndexActivityList (list) {
  let _list = list.reduce((arr, item) => {
    const { id, cost, headimg, startTime, title } = item
    let { year, month, day } = formatTime(startTime)
    arr.push({
      id: id,
      title,
      price: cost,
      imgUrl: headimg,
      startTime: `${year}-${month}-${day}`
    })
    return arr
  }, [])
  return _list
}

const actions = {
  login ({commit}) {
    wx.login({
      success (res) {
        if (res.code) {
          fly.post('/login', {'js_code': res.code}).then(resp => {
            console.log(resp)
            if (resp.code === 200) {
              const { user, session_key, openid, unionid } = resp.data // eslint-disable-line
              if (unionid && user && user.nickname && user.userimage) {
                commit('setUser', {...user, isLogin: true, isAuthorization: true})
              } else {
                commit('setUser', {session_key, openid, isLogin: true, isAuthorization: false})
              }
            } else {
              errToast(resp.msg || '登录失败')
            }
          }).catch(err => {
            console.log(err)
            errToast('登录失败')
          })
        } else {
          console.log('登录失败！' + res.errMsg)
          errToast('登录失败')
        }
      }
    })
  },
  updLoginInfo ({commit}, payload) {
    return new Promise((resolve, reject) => {
      fly.post('/updUserInfo', payload).then(res => {
        console.log(res)
        if (res.code === 200) {
          const { user } = res.data
          commit('setUser', {...user, isAuthorization: true})
          resolve(true)
        } else {
          commit('setUser', {isAuthorization: false})
          resolve(false)
        }
      }).catch(err => {
        commit('setUser', {isAuthorization: false})
        reject(err)
      })
    })
  },
  fetchIndexInfo ({commit}) {
    return new Promise((resolve, reject) => {
      fly.post('/index').then(res => {
        if (res.code === 200) {
          let {newest, selected, classify, banner, area} = res.data
          commit('setCityListAndCategories', {cityList: area, categories: [{id: 0, name: '全部'}, ...classify]})
          const resp = {
            banners: banner,
            categories: classify.splice(0, 7),
            newest: handleIndexActivityList(newest.list),
            activities: handleIndexActivityList(selected.list)
          }
          resolve(resp)
        } else {
          errToast(res.msg || '获取首页信息失败')
        }
      }).catch(err => {
        errToast(err.msg || '获取首页信息失败')
        reject(err)
      })
    })
  },
  fetchActivities ({commit}, params = {}) {
    return new Promise((resolve, reject) => {
      fly.get('/activity/searchActivity', params).then(res => {
        if (res.code === 200) {
          let activities = res.data.reduce((arr, {id, title, headimg, cost, areaname, startTime, endTime}) => {
            arr.push({
              id,
              title,
              thumb: headimg,
              price: cost,
              address: areaname,
              time: `${handlerActivityTime(startTime)} - ${handlerActivityTime(endTime)}`
            })
            return arr
          }, [])
          resolve([...activities, ...activities])
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetchActivityDetail (params) {
    fly.get('/activity/getActivityDetail', {params}).then(res => {
      console.log(res)
    })
  },
  fetchMyActivities ({commit, state}) {
    return new Promise((resolve, reject) => {
      fly.get('/user/getUserActivity', {unionid: state.user.unionid}).then(res => {
        if (res.code === 200) {
          console.log(res)
          resolve(res)
        } else {
          errToast(res.msg || '获取我的活动列表失败')
        }
      }).catch(err => {
        errToast(err.msg || '获取我的活动列表失败')
        reject(err)
      })
    })
  },
  fetchMyattentions ({commit, state}) {
    return new Promise((resolve, reject) => {
      fly.get('/user/getUserConcenred', {unionid: state.user.unionid}).then(res => {
        if (res.code === 200) {
          const list = res.data.reduce((arr, {id, companyImgurl, companyName, compayProfile}) => {
            arr.push({
              id,
              title: companyName,
              thumb: companyImgurl,
              desc: compayProfile,
              address: '北京东城区'
            })
            return arr
          }, [])
          resolve(list)
        } else {
          errToast(res.msg || '获取我的关注列表失败')
        }
      }).catch(err => {
        errToast(err.msg || '获取我的关注列表失败')
        reject(err)
      })
    })
  },
  fetchMyCollections ({commit, state}) {
    return new Promise((resolve, reject) => {
      fly.get('/user/getUserCollection', {unionid: state.user.unionid}).then(res => {
        if (res.code === 200) {
          console.log(res)
          const list = res.data.reduce((arr, {id, title, headimg, address, startTime, endTime}) => {
            arr.push({
              id,
              title,
              address,
              thumb: headimg,
              time: `${handlerActivityTime(startTime)} - ${handlerActivityTime(endTime)}`
            })
            return arr
          }, [])
          resolve(list)
        } else {
          errToast(res.msg || '获取我的收藏列表失败')
        }
      }).catch(err => {
        errToast(err.msg || '获取我的收藏列表失败')
        reject(err)
      })
    })
  }
}

export default actions

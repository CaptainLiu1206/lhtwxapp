import fly from 'assets/js/http'
import { formatTime } from 'utils'

function errToast (msg) {
  wx.showToast({ title: msg, icon: 'none' })
}

function handlerActivityTime (time) {
  let {year, month, day, hour, minute, second} = formatTime(time)
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}

const actions = {
  login ({commit}) {
    wx.login({
      success (res) {
        if (res.code) {
          fly.post('/login', {'js_code': res.code}).then(resp => {
            console.log(resp)
            if (resp.code === 200) {
              const { user } = resp.data
              if (user.nickname && user.userimage) {
                commit('setUser', {...user, isLogin: true, isAuthorization: true})
              } else {
                commit('setUser', {...user, isLogin: true, isAuthorization: false})
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
  updUserInfo (payload) {
    return new Promise((resolve, reject) => {
      fly.post('/updUserInfo', payload).then(res => {
        console.log(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  fetchIndexInfo ({commit}) {
    return new Promise((resolve, reject) => {
      fly.post('/index').then(res => {
        if (res.code === 200) {
          commit('setCityListAndCategories', {cityList: res.data.area, categories: [{id: 0, name: '全部'}, ...res.data.classify]})
          resolve(res.data)
        }
      }).catch(err => {
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
  fetchMyActivities (params) {
    fly.get('/user/getUserActivity', {params}).then(res => {
      console.log(res)
    })
  },
  fetchMyattentions (params) {
    fly.get('/user/getUserConcenred', {params}).then(res => {
      console.log(res)
    })
  },
  fetchMyCollections (params) {
    fly.get('/user/getUserCollection', {params}).then(res => {
      console.log(res)
    })
  }
}

export default actions

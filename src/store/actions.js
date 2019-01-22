import fly from 'assets/js/http'
import { formatTime } from 'utils'

function errToast (msg) {
  wx.showToast({ title: msg, icon: 'none' })
}

function handlerActivityListTime (time) {
  let {year, month, day} = formatTime(time)
  return `${year}/${month}/${day}`
}

function handlerActivityDetailTime (time) {
  let {year, month, day, hour, minute} = formatTime(time)
  return `${year}/${month}/${day} ${hour}:${minute}`
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
          const { list, total, pageSize, pageNum, hasNextPage } = res.data
          let activities = list.reduce((arr, {id, title, headimg, cost, areaname, startTime, endTime}) => {
            arr.push({
              id,
              title,
              thumb: headimg,
              price: cost,
              address: areaname,
              time: `${handlerActivityListTime(startTime)} - ${handlerActivityListTime(endTime)}`
            })
            return arr
          }, [])
          resolve({success: true, data: { pageInfo: {total, pageSize, pageNum, hasNextPage}, list: activities }})
        } else {
          errToast(res.msg || '获取活动失败')
          resolve({success: false})
        }
      }).catch(err => {
        errToast(err.msg || '获取活动失败')
        reject(err)
      })
    })
  },
  fetchActivityDetail ({state, commit}, params) {
    return new Promise((resolve, reject) => {
      fly.get('/activity/getActivityDetail', {...params, unionid: state.user.unionid}).then(res => {
        if (res.code === 200) {
          const { activityDetail, organization, iscollection, isconcenred } = res.data

          const active = {
            id: activityDetail.id,
            headimg: activityDetail.headimg,
            title: activityDetail.title,
            price: activityDetail.cost,
            sponsor: organization.companyName,
            scale: activityDetail.buynum,
            time: `${handlerActivityDetailTime(activityDetail.startTime)} - ${handlerActivityDetailTime(activityDetail.endTime)}`,
            address: activityDetail.address,
            iscollection
          }

          const sponsor = {
            id: organization.id,
            companyName: organization.companyName,
            companyImgurl: organization.companyImgurl,
            companyAddress: organization.companyAddress,
            compayProfile: organization.compayProfile,
            isconcenred
          }

          resolve({success: true, data: {active, sponsor}})
        } else {
          errToast(res.msg || '获取我的活动详情失败')
          resolve({success: false, data: null})
        }
      }).catch(err => {
        errToast(err.msg || '获取我的活动详情失败')
        reject(err)
      })
    })
  },
  toggleCollection ({state}, payload) {
    return new Promise((resolve, reject) => {
      fly.post('/user/saveUserCollection', {...payload, unionid: state.user.unionid}).then(res => {
        if (res.code === 200) {
          resolve({success: true})
        } else {
          resolve({success: false, msg: res.msg})
        }
      }).catch(err => {
        errToast(err.msg || '失败')
        reject(err)
      })
    })
  },
  toggleAttention ({state}, payload) {
    return new Promise((resolve, reject) => {
      fly.post('/user/saveUserConcenred', {...payload, unionid: state.user.unionid}).then(res => {
        if (res.code === 200) {
          resolve({success: true})
        } else {
          resolve({success: false, msg: res.msg})
        }
      }).catch(err => {
        errToast(err.msg || '失败')
        reject(err)
      })
    })
  },
  postUserInfo ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      fly.post('/user/updateUserInfo', {...payload, unionid: state.user.unionid}).then(res => {
        if (res.code === 200) {
          commit('setUser', payload)
          resolve({success: true})
        } else {
          errToast(res.msg || '保存失败')
          resolve({success: false})
        }
      }).catch(err => {
        errToast(err.msg || '保存失败')
        reject(err)
      })
    })
  },
  fetchMyActivities ({commit, state}) {
    return new Promise((resolve, reject) => {
      fly.get('/user/getUserActivity', {unionid: state.user.unionid}).then(res => {
        if (res.code === 200) {
          console.log(res)
          const data = res.data
          let activities = {}
          Object.keys(data).forEach(key => {
            activities[key] = []
            data[key].forEach(item => {
              activities[key].push({
                id: item.id,
                title: item.title,
                thumb: item.headimg,
                address: item.address,
                time: `${handlerActivityListTime(item.startTime)} - ${handlerActivityListTime(item.endTime)}`
              })
            })
          })
          resolve({success: true, activities})
        } else {
          errToast(res.msg || '获取我的活动列表失败')
          resolve({success: false})
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
          resolve({success: true, list: res.data})
        } else {
          errToast(res.msg || '获取我的关注列表失败')
          resolve({success: false})
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
              time: `${handlerActivityListTime(startTime)} - ${handlerActivityListTime(endTime)}`
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

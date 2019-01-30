<template>
  <div class="payment container">
    <div class="main">
      <div class="active-info">
        <div class="left">
          <img :src="active.headimg" alt="">
        </div>
        <div class="right">
          <div class="title">{{active.title}}</div>
          <div class="date">{{active.time}}</div>
          <div class="address ellipsis">{{active.address}}</div>
        </div>
      </div>
      <div class="cell-wrapper" @click="toAddRegistration">
        <van-cell title="报名信息" value="添加报名信息" is-link />
      </div>
      <div class="registration-info">
        <van-swipe-cell :right-width="65" v-for="item in registrations" :key="item.realname" @click="editRegistration(item)">
          <van-cell-group>
            <van-cell :title="item.realname + '  ' + item.phone" />
          </van-cell-group>
          <view slot="right" class="label" @click.stop="delRegistration(item)">删除</view>
        </van-swipe-cell>
      </div>
    </div>
    <div :class="buyWrapperClass">
      <van-submit-bar
        :price="active.price * 100"
        :button-text="buyBtnText"
        :tip="true"
        @submit="onPay">
        <view slot="tip">温馨提示：请您在购买之前，确认填写报名信息真实有效。</view>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      active: {},
      isButton: false
    }
  },
  computed: {
    // isAdd () {
    //   const { realname, phone, email } = this.registration
    //   return realname && phone && email ? 0 : 1
    // },
    buyWrapperClass () {
      if (this.isIphoneX) {
        return 'buy-wrapper higher'
      } else {
        return 'buy-wrapper'
      }
    },
    buyBtnText () {
      return this.active.price ? '立即支付' : '免费领取'
    },
    ...mapGetters(['registrationInfo', 'registrations', 'isIphoneX'])
  },
  components: {},
  onShow () {
    this.active.id = parseInt(this.$mp.query.id)
    let active = wx.getStorageSync('active') || '{}'
    this.active = JSON.parse(active)
  },
  onUnload () {
    this.active = {}
    wx.removeStorageSync('active')
  },
  methods: {
    delRegistration (registration) {
      let self = this
      wx.showModal({
        title: '提示',
        content: '确认删除该报名信息？',
        success (res) {
          if (res.confirm) {
            self.registrations.forEach((item, idx) => {
              if (item.realname === registration.realname && item.phone === registration.phone) {
                let registrations = [...self.registrations]
                self.setRegistrations([...registrations.splice(idx, 1)])
              }
            })
          }
        }
      })
    },
    editRegistration (registration) {
      this.setRegistration(registration)
      wx.navigateTo({
        url: '../add-registration/main?edit=1'
      })
    },
    onPay () {
      const {id, price} = this.active
      // const {realname, companyName, phone, email, position, remark} = this.registration
      if (!this.registrations || !this.registrations.length) {
        wx.showToast({
          icon: 'none',
          title: '请添加报名信息'
        })
        return false
      }
      const payload = {
        payment: price * this.registrations.length,
        goodsId: id,
        goodsCount: this.registrations.length,
        goodsPrice: price,
        userList: this.registrations
      }
      let _this = this
      this.postPay(payload).then(({success, data, msg}) => {
        if (success) {
          if (payload.payment === 0) {
            setTimeout(() => {
              wx.navigateTo({
                url: '../my-activities/main'
              })
            }, 500)
          } else {
            wx.requestPayment({
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: 'MD5',
              paySign: data.paySign,
              success (res) {
                wx.showToast({
                  title: '支付成功'
                })
                _this.setRegistrations([])
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../my-activities/main'
                  })
                }, 500)
              },
              fail (res) {
                wx.showToast({
                  icon: 'none',
                  title: '支付失败'
                })
              }
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: msg
          })
        }
      })
    },
    toAddRegistration () {
      wx.navigateTo({
        url: '../add-registration/main'
      })
    },
    ...mapActions(['postPay']),
    ...mapMutations(['setRegistration', 'setRegistrations'])
  }
}
</script>
<style lang="scss" scoped>
.payment {
  display: flex;
  flex-direction: column;
  .main {
    flex: 1 0 0;
    overflow-y: auto;
    .active-info {
      padding: 40rpx 30rpx;
      display: flex;
      background-color: #fff;
      .left {
        height:226rpx;
        position:relative;
        border-radius:20rpx;
        overflow:hidden;
        text-align:justify;
        flex:300rpx 0 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 1 0 0;
        overflow: hidden;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size:32rpx;
          color:#333;
        }
        .date, .address {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
    .cell-wrapper {
      margin: 30rpx 0;
    }
    .registration-info {
      background-color: #fff;
      .label {
        line-height: 44px;
        font-size: 14px;
        width: 65px;
        text-align: center;
        color: #fff;
        background-color: rgb(255, 68, 68);
      }
      // padding: 30rpx;
      // .item {
      //   display: flex;
      //   font-size: 28rpx;
      //   color: #666;
      //   line-height: 40rpx;
      //   margin-bottom: 20rpx;
      //   &:last-child {
      //     margin-bottom: 0;
      //   }
      //   .label {
      //     flex: 150rpx 0 0;
      //     text-align: right;
      //   }
      //   .text {
      //     flex: 1 0 0;
      //   }
      // }
    }
  }
  .buy-wrapper {
    flex: 88px 0 0;
    &.higher {
      flex: 122px 0 0;
    }
  }
}
</style>

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
        <van-cell title="报名信息" :value="isAdd ? '请填写报名信息' : '修改报名信息'" is-link />
      </div>
      <div class="registration-info" v-if="!isAdd">
        <div class="item">
          <label class="label">姓名：</label>
          <span class="text">{{registration.realname}}</span>
        </div>
        <div class="item">
          <label class="label">手机号：</label>
          <span class="text">{{registration.phone}}</span>
        </div>
        <div class="item">
          <label class="label">邮箱：</label>
          <span class="text">{{registration.email}}</span>
        </div>
        <div class="item">
          <label class="label">公司名称：</label>
          <span class="text">{{registration.companyName}}</span>
        </div>
        <div class="item">
          <label class="label">职位：</label>
          <span class="text">{{registration.position}}</span>
        </div>
        <div class="item">
          <label class="label">备注：</label>
          <span class="text">{{registration.remark}}</span>
        </div>
      </div>
    </div>
    <div :class="buyWrapperClass">
      <van-submit-bar
        :price="active.price * 100"
        :button-text="buyBtnText"
        :tip="true"
        @submit="onPay">
        <view slot="tip">温馨提示：支持报名多次报名且可以帮别人报名，您已经报名3次</view>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      active: {},
      isButton: false
    }
  },
  computed: {
    isAdd () {
      const { realname, phone, email } = this.registration
      return realname && phone && email ? 0 : 1
    },
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
    ...mapGetters(['registration', 'isIphoneX'])
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
    onPay () {
      const {id, price} = this.active
      const {realname, companyName, phone, email, position, remark} = this.registration
      if (!realname || !phone || !email) {
        wx.showToast({
          icon: 'none',
          title: '请完善报名信息'
        })
        return false
      }
      const payload = {
        payment: price,
        goodsId: id,
        goodsCount: 1,
        goodsPrice: price,
        realname,
        companyName,
        phone,
        email,
        position,
        remark
      }
      this.postPay(payload).then(({success, msg}) => {
        if (success) {
          wx.showToast({
            title: '支付成功'
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../my-activities/main'
            })
          }, 500)
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
    ...mapActions(['postPay'])
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
      padding: 30rpx;
      .item {
        display: flex;
        font-size: 28rpx;
        color: #666;
        line-height: 40rpx;
        margin-bottom: 20rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .label {
          flex: 150rpx 0 0;
          text-align: right;
        }
        .text {
          flex: 1 0 0;
        }
      }
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

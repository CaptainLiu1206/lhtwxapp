<template>
  <div class="payment container">
    <div class="main">
      <div class="active-info">
        <div class="left">
          <img :src="active.thumb" alt="">
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
          <span class="text">{{registration.name}}</span>
        </div>
        <div class="item">
          <label class="label">手机号：</label>
          <span class="text">{{registration.mobile}}</span>
        </div>
        <div class="item">
          <label class="label">邮箱：</label>
          <span class="text">{{registration.email}}</span>
        </div>
        <div class="item">
          <label class="label">公司名称：</label>
          <span class="text">{{registration.company}}</span>
        </div>
        <div class="item">
          <label class="label">职位：</label>
          <span class="text">{{registration.job}}</span>
        </div>
        <div class="item">
          <label class="label">备注：</label>
          <span class="text">{{registration.remark}}</span>
        </div>
      </div>
    </div>
    <div class="buy-wrapper">
      <span class="price">￥{{active.price}}</span>
      <button class="btn">立即支付</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      active: {
        id: 1,
        title: '遇见期待的自己-有书2018共读之夜',
        price: '199',
        time: '2018年12月16日 8:00 - 2018年12月18日 10:00',
        address: '北京东城区北京东城区北京东城区',
        thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg'
      },
      isButton: false
    }
  },
  computed: {
    isAdd () {
      const { name, mobile, email } = this.registration
      return name && mobile && email ? 0 : 1
    },
    ...mapGetters(['registration'])
  },
  components: {},
  onShow () {
    this.active.id = parseInt(this.$mp.query.id)
  },
  methods: {
    toAddRegistration () {
      wx.navigateTo({
        url: '../add-registration/main'
      })
    }
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
    display:flex;
    padding:0 40rpx;
    justify-content:space-between;
    align-items:center;
    width:100%;
    flex: 100rpx 0 0;
    font-size:36rpx;
    color:rgb(239, 79, 57);
    font-weight:bold;
    background:#fff;
    box-sizing:border-box;
    box-shadow:1rpx 0rpx 4rpx rgba(0, 0, 0,0.2);
    border-top: 2rpx solid #e8e8e8;
    .price {
      flex: 1 0 0;
    }
    .btn {
      font-size:30rpx;
      color:rgb(255, 255, 255);
      border-radius:10rpx;
      flex: 200rpx 0 0;
      height: 70rpx;
      line-height: 70rpx;
      background:rgb(239, 79, 57);
      box-shadow:1px 1px 30px 1px rgba(239, 79, 57,0.15);
      border:none;
    }
  }
}
</style>

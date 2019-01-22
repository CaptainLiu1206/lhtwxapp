<template>
  <div class="active-card item" @click="seeDetail">
    <div class="item-left">
      <img class="thumb" :src="item.thumb" alt="">
      <span class="badge" v-if="item.badge">{{item.badge}}</span>
    </div>
    <div class="item-right">
      <div class="title ellipsis">{{item.title}}</div>
      <div class="price-sign" v-if="item.price || item.price === '0' || item.price === 0">
        <span class="price" v-if="item.price">￥<span class="num">{{item.price}}</span></span>
        <div class="btn-wrapper">
          <button class="sign-btn" hover-class="btn-hover" v-if="isButton">{{item.price > 0 ? '开始报名' : '免费报名'}}</button>
        </div>
      </div>
      <div class="time ellipsis" v-if="item.time">{{item.time}}</div>
      <div class="address ellipsis" v-if="item.address">{{item.address}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: {}
    },
    isButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    seeDetail () {
      let id = this.item.id
      wx.navigateTo({
        url: `../active-detail/main?id=${id}`
      })
    }
  }
}
</script>
<style lang="scss">
  .active-card.item {
    height: 236rpx;
    display: flex;
    margin-bottom: 30rpx;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 10rpx;
    overflow: hidden;
    .item-left {
      flex: 260rpx 0 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: 20rpx;
      position: relative;
      .thumb {
        width: 260rpx;
        border-radius: 16rpx;
      }
      .badge {
        position: absolute;
        top: 10rpx;
        right: 10rpx;
        border-radius: 16rpx;
        min-width: 40rpx;
        color: #fff;
        line-height: 32rpx;
        padding: 4rpx 12rpx;
        font-size: 24rpx;
        white-space: nowrap;
        background: #f30;
        z-index: 10;
      }
    }
    .item-right {
      flex: 1 0 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      .title {
        width: 100%;
        height: 40rpx;
        font-weight: bold;
        font-size: 32rpx;
        line-height: 40rpx;
        color: #333;
      }
      .price-sign {
        font-size: 0;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 20rpx;
        display: flex;
        align-items: flex-end;
        .price {
          flex: 1 0 0;
          text-align: left;
          color: red;
          font-size: 22rpx;
          .num {
            font-size: 28rpx;
            font-weight: 600;
          }
        }
        .btn-wrapper {
          flex: 1 0 0;
          text-align: right;
          .sign-btn {
            line-height: 56rpx;
            outline: none;
            border-radius: 6rpx;
            text-align: center;
            font-size: 28rpx;
            color:#ff976a;
            border: 2rpx solid #ff976a;
            background-color: #fff;
            vertical-align:middle;
            touch-action:manipulation;
            white-space:nowrap;
            user-select:none;
            cursor:pointer;
            &.btn-hover{
              background-color: rgba(0, 0, 0, 0.1);
            }
            &::after {
              box-shadow: none;
              border: none;
            }
          }
        }
      }
      .time,
      .address {
        width: 100%;
        font-size: 24rpx;
        line-height: 24rpx;
        height: 24rpx;
        color: #333;
      }
    }
  }
</style>

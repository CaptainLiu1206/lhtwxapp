<template>
  <div class="container favourites">
    <div v-if="list.length" class="list">
      <active-card v-for="(item, idx) in list" :key="idx" :isButton="isButton" :item="item"></active-card>
    </div>
    <i-load-more class="no-data" tip="暂无数据" :loading="false" v-if="!list.length" />
  </div>
</template>

<script>
import ActiveCard from 'components/active-card'

export default {
  components: {
    ActiveCard
  },
  data () {
    return {
      isButton: false,
      list: [
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 2, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 3, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 4, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 5, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 6, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 7, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 8, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' }
      ]
    }
  },
  methods: {},
  created () {}
}
</script>

<style lang="scss">
.favourites {
  display: flex;
  flex-direction: column;
  justify-items: center;
  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx;
    .item {
      height: 220rpx;
      display: flex;
      margin-bottom: 30rpx;
      padding: 20rpx 20rpx;
      box-sizing: border-box;
      background-color: #fafafa;
      border-radius: 10rpx;
      overflow: hidden;
      .item-left {
        flex: 220rpx 0 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 20rpx;
        .thumb {
          width: 220rpx;
          // height: auto;
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
        .time,
        .address {
          width: 100%;
          font-size: 24rpx;
          line-height: 24rpx;
          height: 24rpx;
          color: #999;
        }
        .price {
          width: 100%;
          font-size: 28rpx;
          line-height: 28rpx;
          color: red;
        }
      }
    }
  }
}
</style>

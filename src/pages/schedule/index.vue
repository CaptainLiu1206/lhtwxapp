<template>
  <div class="container schedule">
    <div class="header">
      <label>当前日期：</label>
      <picker
        class="date-picker"
        mode="date"
        :value="date"
        start="2015-09-01"
        end="2029-01-01"
        @change="bindDateChange"
      >
      <span>{{date}}</span>
      <i-icon class="icon" type="activity" size="28" />
    </picker>
    </div>
    <div class="activities-box">
      <div class="title">活动推荐</div>
      <div class="list" v-if="list.length">
        <div @click="toSign(item.id)" v-for="(item, idx) in list" :key="idx">
          <active-card :isButton="isButton" :item="item"></active-card>
        </div>
      </div>
      <i-load-more tip="暂无活动" :loading="false" v-else />
    </div>
  </div>
</template>
<script>
import ActiveCard from '../../components/active-card'

export default {
  components: {
    ActiveCard
  },
  data () {
    return {
      isButton: true,
      date: '2018-08-16',
      list: [
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 2, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 3, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 4, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 5, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 6, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 7, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 8, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' }
      ]
    }
  },
  methods: {
    bindDateChange ({ mp }) {
      this.date = mp.detail.value
    },
    toSign (id) {
      wx.navigateTo({
        url: `../active-detail/main?id=${id}`
      })
    }
  }
}
</script>
<style lang="scss">
.schedule {
  .header {
    display: flex;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
    width: 100vw;
    padding: 0 30rpx;
    box-sizing: border-box;
    border-top: 2rpx solid #e8e8e8;
    border-bottom: 2rpx solid #e8e8e8;
    font-size: 32rpx;
    line-height: 80rpx;
    background-color: #fff;
    > label {
      flex: 160rpx 0 0;
    }
    > .date-picker {
      margin-left: 30rpx;
      flex: 1 0 0;
      .icon {
        float: right;
      }
    }
  }
  .activities-box{
    position: absolute;
    top: 140rpx;
    left: 0;
    width: 100vw;
    height: calc(100vh - 140px);
    > .title {
      font-size: 32rpx;
      line-height: 32rpx;
      color: #333;
      margin-left: 30rpx;
      padding-left: 20rpx;
      position: relative;
      &::before {
        position: absolute;
        content: '';
        left: 0;
        top: 0;
        bottom: 0;
        width: 8rpx;
        background-color: blue;
      }
    }
    .list {
      width: 100%;
      box-sizing: border-box;
      padding: 30rpx;
    }
  }
}
</style>

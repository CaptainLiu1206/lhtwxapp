<template>
  <div class="container schedule">
    <div class="header">
      <div class="day-wrapepr">
        <div class="left" @click="onPrev">前一天</div>
        <div class="mid">
          <picker
            class="date-picker"
            mode="date"
            :value="date"
            start="2015-09-01"
            end="2029-01-01"
            @change="bindDateChange"
          >
            <span class="date">{{date}}</span>
            <span class="day">{{day}}</span>
            <van-icon class="icon" name="calender-o" size="26px" />
          </picker>
        </div>
        <div class="right" @click="onNext">后一天</div>
      </div>
      <div class="address-category">
        <div class="address">
          <button hover-class="hover-class" @click="toSeachCity">
            <van-icon class="icon" name="location" size="14px" />
            <span class="name">{{currentCity}}</span>
          </button>
        </div>
        <div class="category">
          <div>
            <i-tabs :current='currentTab' @change="handleTabChange" :scroll="true">
              <i-tab v-for="(category, idx) in categories" :key="idx" :title="category.title"></i-tab>
            </i-tabs>
          </div>
        </div>
      </div>
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
import { formatTime, getUperDay } from '../../utils/index'
import { mapGetters } from 'vuex'

export default {
  components: {
    ActiveCard
  },
  data () {
    return {
      currentTab: 0,
      isButton: true,
      date: '2018-08-16',
      day: '周三',
      list: [
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 2, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 3, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 4, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 5, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 6, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 7, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 8, title: '遇见期待的自己-有书2018共读之夜', price: '199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' }
      ],
      categories: [
        { id: 1, title: '分类1' },
        { id: 2, title: '分类2' },
        { id: 3, title: '分类3' },
        { id: 4, title: '分类4' },
        { id: 5, title: '分类5' },
        { id: 6, title: '分类6' },
        { id: 7, title: '分类7' },
        { id: 8, title: '分类8' },
        { id: 9, title: '分类9' },
        { id: 10, title: '分类10' },
        { id: 11, title: '分类11' }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentCity'])
  },
  methods: {
    toSeachCity () {
      wx.navigateTo({
        url: '../search-city/main'
      })
    },
    onPrev () {
      const {year, month, day} = formatTime(new Date(this.date).getTime() - 24 * 60 * 60 * 1000)
      this.date = `${year}-${month}-${day}`
      this.day = getUperDay(new Date(this.date).getDay())
    },
    onNext () {
      const {year, month, day} = formatTime(new Date(this.date).getTime() + 24 * 60 * 60 * 1000)
      this.date = `${year}-${month}-${day}`
      this.day = getUperDay(new Date(this.date).getDay())
    },
    handleTabChange ({ mp }) {
      this.currentTab = parseInt(mp.detail.key)
    },
    bindDateChange ({ mp }) {
      this.date = mp.detail.value
      this.day = getUperDay(new Date(this.date).getDay())
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
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
    width: 100vw;
    .day-wrapepr {
      display: flex;
      box-sizing: border-box;
      font-size: 28rpx;
      line-height: 100rpx;
      background-color: #3B99FB;
      color: #fff;
      .left {
        flex: 200rpx 0 0;
        text-align: left;
        box-sizing: border-box;
        padding-left: 40rpx;
      }
      .mid {
        flex: 1 0 0;
        > .date-picker {
          background-color: #fff;
          width: 100%;
          box-sizing: border-box;
          padding: 0 16rpx;
          height: 70rpx;
          line-height: 70rpx;
          margin-top: 15rpx;
          border-radius: 10rpx;
          color: #3B99FB;
          .day {
            padding-left: 20rpx;
          }
          .icon {
            float: right;
            .van-icon {
              line-height: 70rpx;
            }
          }
        }
      }
      .right {
        flex: 200rpx 0 0;
        text-align: right;
        box-sizing: border-box;
        padding-right: 40rpx;
      }
    }
    .address-category {
      display: flex;
      background-color: #fff;
      .address {
        flex: 177rpx 0 0;
        text-align: center;
        padding: 10rpx 0 0 10rpx;
        box-sizing: border-box;
        button {
          display: inline-block;
          padding: 0;
          text-align: center;
          overflow: hidden;
          width: 157rpx;
          border-radius: 10rpx;
          line-height: 60rpx;
          font-size: 28rpx;
          text-align: center;
          border: 2rpx solid #3B99FB;
          box-sizing: border-box;
          outline: none;
          background-color: #fff;
          &::after {
            border: none;
          }
          .icon {
            padding-right: 2px;
          }
          &.hover-class {
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      }
      .category {
        flex: 1 0 0;
        box-sizing: border-box;
        margin: 0 10rpx;
        overflow: hidden;
      }
    }
  }
  .activities-box{
    position: absolute;
    top: 236rpx;
    left: 0;
    width: 100vw;
    height: calc(100vh - 236px);
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
        background-color: #3B99FB;
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

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
        <div class="address" @click="toSeachCity">
          <span>地区：</span>
          <div class="wrapper">
            <text class="iconfont icon-didian01"></text>
            <span class="name">{{currentCity.name}}</span>
          </div>
        </div>
        <div class="category" @click="toSelectCategory">
          <span>行业类型：</span>
          <div class="wrapper">
            <text class="iconfont" :class="currentCategory.iconUrl"></text>
            <span class="name">{{currentCategory.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="activities-box" v-if="list.length">
      <div class="title">活动列表</div>
      <div class="list">
        <div v-for="(item, idx) in list" :key="idx">
          <active-card :isButton="isButton" :item="item"></active-card>
        </div>
      </div>
    </div>
    <div class="activities-box" v-else>
      <i-load-more tip="暂无活动" :loading="false" />
    </div>
    <Authorization :isShow="!isAuthorization" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ActiveCard from 'components/active-card'
import Authorization from 'components/Authorization'
import { formatTime, getUperDay } from 'utils/index'

export default {
  components: {
    ActiveCard,
    Authorization
  },
  data () {
    return {
      isButton: true,
      date: '',
      day: '',
      list: [],
      pageInfo: {
        total: 0,
        pageSize: 100,
        pageNum: 1,
        hasNextPage: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentCity', 'isAuthorization', 'categories', 'currentCategory'])
  },
  onShow () {
    const now = new Date()
    const {year, month, day} = formatTime(now)
    this.date = `${year}-${month}-${day}`
    this.day = getUperDay(now.getDay())
    this.onFetchActivities()
  },
  methods: {
    onFetchActivities () {
      let payload = {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum
      }
      this.currentCity.id && (payload.cityId = this.currentCity.id)
      this.currentCategory && this.currentCategory.id && (payload.categoryId = this.currentCategory.id)
      this.date && (payload.time = new Date(this.date))
      this.fetchActivities(payload).then(({success, data}) => {
        if (success) {
          this.list = data.list
          this.pageInfo = {...this.pageInfo, ...data.pageInfo}
        }
      })
    },
    toSeachCity () {
      wx.navigateTo({
        url: '../search-city/main'
      })
    },
    toSelectCategory () {
      wx.navigateTo({
        url: '../categories/main'
      })
    },
    onPrev () {
      const {year, month, day} = formatTime(new Date(this.date).getTime() - 24 * 60 * 60 * 1000)
      this.date = `${year}-${month}-${day}`
      this.day = getUperDay(new Date(this.date).getDay())
      this.onFetchActivities()
    },
    onNext () {
      const {year, month, day} = formatTime(new Date(this.date).getTime() + 24 * 60 * 60 * 1000)
      this.date = `${year}-${month}-${day}`
      this.day = getUperDay(new Date(this.date).getDay())
      this.onFetchActivities()
    },
    handleTabChange ({ mp }) {
      this.currentTab = parseInt(mp.detail.key)
      this.onFetchActivities()
    },
    bindDateChange ({ mp }) {
      this.date = mp.detail.value
      this.day = getUperDay(new Date(this.date).getDay())
      this.onFetchActivities()
    },
    toSign (id) {
      wx.navigateTo({
        url: `../active-detail/main?id=${id}`
      })
    },
    ...mapActions(['fetchActivities'])
  }
}
</script>
<style lang="scss">
.schedule {
  .i-tabs-tab-scroll {
    width: auto;
    min-width: 60px;
  }
  .header {
    overflow: hidden;
    position: absolute;
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
            box-sizing: border-box;
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
      background-color: #fff;
      overflow: hidden;
      .address,
      .category {
        float: left;
        margin:10rpx 0 10rpx 30rpx;
        font-size: 12px;
        color: #333;
        line-height: 24px;
        .wrapper {
          margin-left: 5px;
          display: inline-block;
          text-align: center;
          box-sizing: border-box;
          border: 2rpx solid #3B99FB;
          border-radius: 10rpx;
          padding: 0 20rpx;
          .iconfont {
            font-size: 12px;
            margin-right:4px;
          }
        }
      }
      .category {
        float: right;
        margin-right: 30rpx;
      }
    }
  }
  .activities-box{
    position: absolute;
    top: 200rpx;
    bottom: 0;
    left: 0;
    width: 100vw;
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
      position: absolute;
      left: 0;
      top: 32rpx;
      bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;
      width: 100%;
      box-sizing: border-box;
      padding: 30rpx;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }
}
</style>

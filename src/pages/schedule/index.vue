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
              <i-tab v-for="(category, idx) in categories" :key="idx" :title="category.name"></i-tab>
            </i-tabs>
          </div>
        </div>
      </div>
    </div>
    <div class="activities-box">
      <div class="title">活动列表</div>
      <div class="list" v-if="list.length">
        <div @click="toSign(item.id)" v-for="(item, idx) in list" :key="idx">
          <active-card :isButton="isButton" :item="item"></active-card>
        </div>
      </div>
      <i-load-more tip="暂无活动" :loading="false" v-else />
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
      currentTab: 0,
      isButton: true,
      date: '2018-08-16',
      day: '周三',
      list: []
    }
  },
  computed: {
    ...mapGetters(['currentCity', 'isAuthorization', 'categories'])
  },
  onShow () {
    this.fetchActivities({title: '测试1'}).then(data => {
      this.list = data
    })
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

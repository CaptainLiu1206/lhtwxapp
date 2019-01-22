<template>
  <div class="container search-city">
    <div class="current-city section">
      <p class="title">当前选择城市</p>
      <button hover-class="hover-class" class="city current">
        <van-icon class="icon" name="location" size="14px" />
        <span>{{currentCity.name}}</span>
      </button>
    </div>
    <div class="city-list section">
      <p class="title">城市列表</p>
      <div class="list">
        <button hover-class="hover-class" class="city" v-for="city in cityList" :key="city.id" @click="onSelectCity(city)">{{city.name}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {},
  data () {
    return {
      citys: []
    }
  },
  computed: {
    ...mapGetters(['currentCity', 'cityList'])
  },
  methods: {
    onSelectCity (city) {
      this.setCurrentCity(city)
      wx.switchTab({
        url: '../schedule/main'
      })
    },
    ...mapMutations(['setCurrentCity'])
  }
}
</script>

<style lang="scss">
.search-city {
  padding: 40rpx 0 20rpx 0;
  box-sizing: border-box;
  background-color: #fff;
  .section {
    padding: 0 30rpx;
    margin-bottom: 40rpx;
    &:last-child {
      margin-bottom: 0rpx;
    }
    .title {
      font-size: 24rpx;
      line-height: 1;
      color: #666666;
      margin-bottom: 14rpx;
    }
    .list {
      font-size: 0;
    }
    .city {
      display: inline-block;
      padding: 0;
      text-align: center;
      overflow: hidden;
      width: 157rpx;
      border-radius: 10rpx;
      line-height: 60rpx;
      color: #333;
      font-size: 28rpx;
      text-align: center;
      border: 2rpx solid #3B99FB;
      box-sizing: border-box;
      margin: 0 20rpx 20rpx 0;
      outline: none;
      background-color: #fff;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &::after {
        border: none;
      }
      .icon {
        font-size: 22rpx;
        padding-right: 2px;
      }
      &.current {
        color: #ffffff;
        background-color: #3B99FB;
      }
      &.hover-class {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>

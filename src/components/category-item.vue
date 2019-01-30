<template>
  <div class="category-item">
    <div class="widget">
      <view class="icon-wrapper" :style="category.style">
        <text class="iconfont" :class="category.iconUrl"></text>
      </view>
    </div>
    <p class="title">{{category.name}}</p>
  </div>
</template>
<script>
export default {
  props: {
    category: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>
<style lang="scss">
.category-item {
  .widget {
    width: 100%;
    height: 80rpx;
    text-align: center;
    .icon-wrapper {
      display: inline-block;
      text-align: center;
      width: 80rpx;
      height: 80rpx;
      color: rgb(96, 164, 237);
      border-width: 2px;
      border-style: solid;
      border-color: rgb(96, 164, 237);
      box-sizing: border-box;
      border-radius: 50%;
      .iconfont {
        font-size: 40rpx;
        line-height: 70rpx;
      }
    }
  }
  .title {
    margin-top: 10px;
    font-size: 12px;
    color: rgb(159, 159, 159);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10rpx;
  }
}
</style>

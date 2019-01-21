<template>
  <div class="attention-item" v-if="attention">
    <div class="attention-left">
      <img class="avatar" :src="attention.companyImgurl" alt="" />
    </div>
    <div class="attention-right">
      <div class="top">
        <div class="title ellipsis">{{attention.companyName}}</div>
        <a class="btn" v-if="isBtn" @click="onToggleAttention">
          <span class="btn-attention add-attention" v-if="!attention.isconcenred">+ 关注</span>
          <span class="btn-attention cancel-attention" v-if="attention.isconcenred">取消关注</span>
        </a>
      </div>
      <div class="desc">{{attention.compayProfile}}</div>
      <div class="address ellipsis">{{attention.companyAddress}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    attention: {
      type: Object,
      default: null
    },
    isBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onToggleAttention () {
      this.$emit('btncb')
    }
  }
}
</script>
<style lang="scss" scoped>
.attention-item {
  height: 220rpx;
  display: flex;
  margin-bottom: 30rpx;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 10rpx;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
  .attention-left {
    flex: 160rpx 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
    }
  }
  .attention-right {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    .top {
      display: flex;
      margin-bottom: 10rpx;
      width: 100%;
      height: 50rpx;
      font-size: 32rpx;
      font-weight: bold;
      line-height: 50rpx;
      color: #333;
      .title {
        flex: 1 0 0;
      }
      .btn {
        width: auto;
        text-align: right;
        .btn-attention {
          display: block;
          font-size: 26rpx;
          line-height: 60rpx;
          padding: 0 30rpx;
          border-radius: 10rpx;
          &.add-attention {
            background-color: #3B99FB;
            color: #ffffff;
          }
          &.cancel-attention {
            background-color: #e8e8e8;
            color: #333;
          }
        }
      }
    }
    .desc {
      width: 100%;
      font-size: 28rpx;
      line-height: 34rpx;
      color: #666;
      max-height: 68rpx;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .address {
      width: 100%;
      font-size: 24rpx;
      line-height: 24rpx;
      height: 24rpx;
      color: #999;
    }
  }
}
</style>

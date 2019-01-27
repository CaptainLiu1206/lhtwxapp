<template>
  <div class="sponsor-item" v-if="sponsor" @click="goDetail">
    <div class="sponsor-left">
      <img class="avatar" :src="sponsor.companyImgurl" alt="" />
    </div>
    <div class="sponsor-right">
      <div class="top">
        <div class="title ellipsis">{{sponsor.companyName}}</div>
        <a class="btn" v-if="isBtn" @click.stop="onTogglesponsor">
          <span class="btn-sponsor add-sponsor" v-if="!sponsor.isconcenred">+ 关注</span>
          <span class="btn-sponsor cancel-sponsor" v-if="sponsor.isconcenred">取消关注</span>
        </a>
      </div>
      <div class="desc">{{sponsor.compayProfile}}</div>
      <div class="address ellipsis">{{sponsor.companyAddress}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sponsor: {
      type: Object,
      default: null
    },
    isBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onTogglesponsor () {
      this.$emit('btncb')
    },
    goDetail () {
      let self = this
      wx.navigateTo({
        url: `../sponsor-detail/main?id=${self.sponsor.id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sponsor-item {
  height: 200rpx;
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
  .sponsor-left {
    flex: 180rpx 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .avatar {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
    }
  }
  .sponsor-right {
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
      font-weight: bold;
      line-height: 50rpx;
      color: #333;
      .title {
        flex: 1 0 0;
        font-size: 14px;
        color: #333;
      }
      .btn {
        width: auto;
        text-align: right;
        .btn-sponsor {
          display: block;
          font-size: 12px;
          line-height: 26px;
          padding: 0 10px;
          border-radius: 2px;
          &.add-sponsor {
            background-color: #3B99FB;
            color: #ffffff;
          }
          &.cancel-sponsor {
            background-color: #e8e8e8;
            color: #333;
          }
        }
      }
    }
    .desc {
      width: 100%;
      font-size: 12px;
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
      font-size: 12px;
      line-height: 24rpx;
      height: 24rpx;
      color: #999;
    }
  }
}
</style>

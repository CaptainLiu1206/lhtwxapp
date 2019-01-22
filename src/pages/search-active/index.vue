<template>
  <div class="container search-active">
    <div class="search-wrapper">
      <van-search
        :value="title"
        placeholder="请输入搜索关键词"
        use-action-slot
        :focus="true"
        @change="handleSearchChange">
        <view slot="action" @tap="onFetchActivities">搜索</view>
      </van-search>
    </div>
    <div class="activities-box" v-if="list.length">
      <div class="title">活动列表</div>
      <div class="list">
        <div v-for="(item, idx) in list" :key="idx">
          <active-card :isButton="isButton" :item="item"></active-card>
        </div>
      </div>
    </div>
    <i-load-more tip="没用搜索到匹配的活动" :loading="false" v-if="!list.length && !isInit" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ActiveCard from 'components/active-card'

export default {
  components: {
    ActiveCard
  },
  data () {
    return {
      title: '',
      list: [],
      isButton: true,
      isInit: true
    }
  },
  onShow () {
    this.isInit = true
  },
  methods: {
    handleSearchChange (event) {
      this.title = event.mp.detail
    },
    onFetchActivities () {
      let title = this.title.trim()
      if (!this.title) {
        wx.showToast({
          icon: 'none',
          title: '请输入关键词'
        })
        return false
      }
      let payload = {
        pageSize: 100,
        pageNum: 1,
        title
      }
      this.isInit = false
      this.fetchActivities(payload).then(({success, data}) => {
        if (success) {
          this.list = data.list
        }
      })
    },
    ...mapActions(['fetchActivities'])
  }
}
</script>

<style lang="scss">
.search-active {
  .activities-box{
    position: absolute;
    top: 60px;
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

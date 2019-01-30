<template>
  <div class="sponsors">
    <div class="search-wrapper">
      <van-search
        :value="keyword"
        placeholder="请输入主办方关键词"
        use-action-slot
        :focus="true"
        @change="handleSearchChange">
        <div slot="action" @tap="onSearch">搜索</div>
      </van-search>
    </div>
    <scroll-view class="list">
      <sponsor-card v-for="item in list" :key="item.id" :sponsor="item" @btncb="onToggleSponsor(item)"></sponsor-card>
    </scroll-view>
    <i-load-more class="no-data" tip="跑到头了" :loading="false" v-if="!list.length" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SponsorCard from 'components/sponsor-card'
import ActiveCard from 'components/active-card'

export default {
  components: {
    SponsorCard,
    ActiveCard
  },
  data () {
    return {
      list: [],
      keyword: '',
      pageSize: 10,
      pageNum: 1
    }
  },
  computed: {
  },
  onShow () {
    this.onFetchSponors()
  },
  methods: {
    handleSearchChange (event) {
      this.keyword = event.mp.detail
    },
    onSearch () {
      this.pageNum = 1
      this.onFetchSponors()
    },
    onFetchSponors () {
      let payload = {
        name: this.keyword.trim() || '',
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      this.fetchSponors(payload).then(({success, list, msg}) => {
        if (success) {
          this.list = list
        } else {
          wx.showToast({
            icon: 'none',
            title: msg
          })
        }
      })
    },
    onToggleSponsor (sponsor) {
      this.toggleSponsor({organizationId: sponsor.id}).then((success, msg) => {
        if (success) {
          sponsor.uConcerned = !sponsor.uConcerned
          if (sponsor.uConcerned) {
            wx.showToast({
              title: '关注成功'
            })
          } else {
            wx.showToast({
              title: '取消关注成功',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: msg || sponsor.uConcerned ? '取消关注失败' : '关注失败',
            icon: 'none'
          })
        }
      })
    },
    ...mapActions(['fetchSponors', 'toggleSponsor'])
  },
  onReachBottom () {
    this.pageNum += 1
    this.onFetchSponors()
  }
}
</script>

<style lang="scss">
.sponsors {
  background-color: #f4f4f4;
  min-height: 100vh;
  .list {
    padding: 20rpx 30rpx 30rpx;
    box-sizing: border-box;
  }
}
</style>

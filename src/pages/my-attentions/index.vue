<template>
  <div class="container sponsor">
    <div v-if="list.length" class="sponsor-list">
      <sponsor-card v-for="sponsor in list" :key="sponsor.id" :sponsor="sponsor" @btncb="onToggleSponsor(sponsor)"></sponsor-card>
    </div>
    <i-load-more class="no-data" tip="暂无关注主办方" :loading="false" v-if="!list.length" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SponsorCard from 'components/sponsor-card'

export default {
  components: {
    SponsorCard
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    onToggleSponsor (sponsor) {
      this.toggleSponsor({organizationId: sponsor.id}).then((success, msg) => {
        if (success) {
          wx.showToast({
            title: '取消关注成功',
            icon: 'none'
          })
          this.list.forEach((item, idx) => {
            if (item.id === sponsor.id) {
              this.list.splice(idx, 1)
            }
          })
        } else {
          wx.showToast({
            title: msg || '取消关注失败',
            icon: 'none'
          })
        }
      })
    },
    ...mapActions(['fetchMyattentions', 'toggleSponsor'])
  },
  onShow () {
    this.fetchMyattentions().then(({success, list}) => {
      if (success) {
        this.list = list
      }
    })
  },
  created () {}
}
</script>

<style lang="scss">
.sponsor {
  display: flex;
  flex-direction: column;
  justify-items: center;
  background-color: #f4f4f4;
  .sponsor-list {
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx;
  }
}
</style>

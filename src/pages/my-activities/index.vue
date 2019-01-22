<template>
  <div class="container activities">
    <div class="tab-box" v-if="activityList.length">
      <div class="tab-header">
        <i-tabs :current='currentTab' @change="handleTabChange">
          <i-tab v-for="(activities, idx) in activityList" :key="idx" :title="activities.title"></i-tab>
        </i-tabs>
      </div>
      <div class="tab-body list">
        <active-card v-for="(item, idx) in activityList[currentTab].list" :key="idx" :isButton="isButton" :item="item"></active-card>
        <i-load-more tip="暂无购买活动" :loading="false" v-if="!activityList[currentTab].list || !activityList[currentTab].list.length" />
      </div>
    </div>
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
      currentTab: 0,
      isButton: false,
      activityList: [
        {
          id: 1,
          title: '进行中',
          list: []
        },
        {
          id: 2,
          title: '未开始',
          list: []
        },
        {
          id: 3,
          title: '已结束',
          list: []
        }
      ]
    }
  },
  methods: {
    handleTabChange ({ mp }) {
      this.currentTab = parseInt(mp.detail.key)
    },
    seeDetail (active) {
      wx.navigateTo({
        url: `../active-detail/main?id=${active.id}`
      })
    },
    ...mapActions(['fetchMyActivities'])
  },
  onShow () {
    this.fetchMyActivities().then(({success, activities}) => {
      if (success) {
        this.activityList[0].list = activities.runing || []
        this.activityList[1].list = activities.unbegun || []
        this.activityList[2].list = activities.end || []
      }
    })
  },
  created () {}
}
</script>

<style lang="scss">
.activities {
  .tab-box {
    position: relative;
    width: 100vw;
    height: 100vh;
    .tab-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 111;
      width: 100vw;
    }
    .tab-body {
      position: absolute;
      top: 42px;
      left: 0;
      width: 100vw;
      height: calc(100vh - 42px);
      padding: 30rpx;
      box-sizing: border-box;
    }
  }
}
</style>

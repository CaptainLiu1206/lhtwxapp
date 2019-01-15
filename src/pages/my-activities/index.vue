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
        <i-load-more tip="暂无数据" :loading="false" v-if="!activityList[currentTab].list || !activityList[currentTab].list.length" />
      </div>
    </div>
  </div>
</template>

<script>
import ActiveCard from '../../components/active-card'

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
          list: [
            { id: 101, title: '选项101选项101选项101选项101', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 102, title: '选项102选项102选项102选项102', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 103, title: '选项103选项103选项103选项103', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 104, title: '选项104选项104选项104选项104', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 105, title: '选项105选项105选项105选项105', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 106, title: '选项106选项106选项106选项106', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 107, title: '选项107选项107选项107选项107', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 108, title: '选项108选项108选项108选项108', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 109, title: '选项109选项109选项109选项109', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 110, title: '选项110选项110选项110选项110', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 111, title: '选项111选项111选项111选项111', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 112, title: '选项112选项112选项112选项112', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 113, title: '选项113选项113选项113选项113', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 114, title: '选项114选项114选项114选项114', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 115, title: '选项115选项115选项115选项115', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' }
          ]
        },
        {
          id: 2,
          title: '未开始',
          list: [
            { id: 201, title: '选项201选项201选项201选项201', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 202, title: '选项202选项202选项202选项202', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 203, title: '选项203选项203选项203选项203', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 204, title: '选项204选项204选项204选项204', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 205, title: '选项205选项205选项205选项205', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' }
          ]
        },
        {
          id: 3,
          title: '已结束',
          list: [
            { id: 301, title: '选项301选项301选项301选项301', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 302, title: '选项302选项302选项302选项302', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 303, title: '选项303选项303选项303选项303', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 404, title: '选项404选项404选项404选项404', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' },
            { id: 505, title: '选项505选项505选项505选项505', thumb: 'https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=2911576090,1350833088&fm=85&s=34314E341F006D62427241400300B0F8', time: '2017-08-09', address: '北京' }
          ]
        },
        {
          id: 4,
          title: '选项4',
          list: []
        }
      ]
    }
  },
  methods: {
    handleTabChange ({ mp }) {
      this.currentTab = parseInt(mp.detail.key)
    }
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

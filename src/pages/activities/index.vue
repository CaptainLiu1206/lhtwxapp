<template>
  <div class="activities container">
    <div class="tab-box">
      <i-tabs :current='currentTab' @change="handleTabChange" :scroll="true">
        <i-tab v-for="(activitie, idx) in activities" :key="idx" :title="activitie.title"></i-tab>
      </i-tabs>
    </div>
    <div class="list">
      <active-card v-for="(item, idx) in list" :key="idx" :isButton="isButton" :item="item"></active-card>
      <i-load-more tip="暂无活动" :loading="false" v-if="!list.length" />
    </div>
  </div>
</template>
<script>
import ActiveCard from 'components/active-card'

export default {
  data () {
    return {
      activities: [
        { id: 1, title: '分类1' },
        { id: 2, title: '分类2' },
        { id: 3, title: '分类3' },
        { id: 4, title: '分类4' },
        { id: 5, title: '分类5' },
        { id: 6, title: '分类6' },
        { id: 7, title: '分类7' },
        { id: 8, title: '分类8' },
        { id: 9, title: '分类9' },
        { id: 10, title: '分类10' },
        { id: 11, title: '分类11' }
      ],
      list: [
        { id: 1, badge: '热门', title: '遇见期待的自己-有书2018共读之夜', price: '￥199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: '￥199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: '￥199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: '￥199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: '￥199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: '￥199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: '￥199', time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' }
      ],
      isButton: true
    }
  },
  components: {
    ActiveCard
  },
  methods: {
    handleTabChange ({ mp }) {
      console.log(parseInt(mp.detail.key))
    }
  }
}
</script>
<style lang="scss">
.activities {
  .tab-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 111;
    width: 100vw;
  }
  .list {
    position: absolute;
    top: 42px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 42px);
    padding: 30rpx;
    box-sizing: border-box;
  }
}
</style>

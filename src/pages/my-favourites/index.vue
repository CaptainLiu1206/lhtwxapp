<template>
  <div class="container favourites">
    <div v-if="list.length" class="list">
      <active-card v-for="(item, idx) in list" :key="idx" :isButton="isButton" :item="item"></active-card>
    </div>
    <i-load-more class="no-data" tip="暂无收藏活动" :loading="false" v-if="!list.length" />
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
      list: [
        { id: 1, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 2, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 3, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 4, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 5, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 6, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 7, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' },
        { id: 8, title: '遇见期待的自己-有书2018共读之夜', price: 199, time: '2018年12月16日 8:00 - 2018年12月18日 10:00', address: '北京东城区北京东城区北京东城区', thumb: 'http://edustor.zhaopin.com/courseimage/15366478011041534324032043思考力.jpg' }
      ]
    }
  },
  methods: {
    ...mapActions(['fetchMyCollections'])
  },
  onShow () {
    this.fetchMyCollections().then(list => {
      this.list = list
    })
  },
  created () {}
}
</script>

<style lang="scss">
.favourites {
  display: flex;
  flex-direction: column;
  justify-items: center;
  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx;
  }
}
</style>

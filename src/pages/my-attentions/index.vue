<template>
  <div class="container attention">
    <div v-if="attentionList.length" class="attention-list">
      <attention-item v-for="attention in attentionList" :key="attention.id" :attention="attention"></attention-item>
    </div>
    <i-load-more class="no-data" tip="暂无数据" :loading="false" v-if="!attentionList.length" />
  </div>
</template>

<script>
import AttentionItem from '../../components/attention-item'

export default {
  components: {
    AttentionItem
  },
  data () {
    return {
      attentionList: [
        { id: 1, title: '北京马拉松比赛北京马拉松比赛北京马拉松比赛北北京马拉松比赛北京马拉松比赛北京马拉松比赛北京马拉松比赛京马拉松比赛', desc: '额了去忘额了去忘记了我进去了就额了去忘记了我进去了就额了去忘记了我进去了就记了我进去了就', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
        { id: 2, title: '北京马拉松比赛', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
        { id: 3, title: '北京马拉松比赛北京马拉松比赛', desc: '额了去忘记了我进去了就完全理解额了去忘记了我进去了就完全理解额为了钱饿我去可额了去忘记了我进去了就完全理解额为了钱饿我去可额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
        { id: 4, title: '北京马拉松比赛', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
        { id: 5, title: '北京马拉松比赛', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
        { id: 6, title: '北京马拉松比赛', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
        { id: 7, title: '北京马拉松比赛', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
        { id: 8, title: '北京马拉松比赛', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
        { id: 9, title: '北京马拉松比赛', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区北京东城区北京东城区北京东城区北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' }
      ]
    }
  },
  methods: {},
  created () {}
}
</script>

<style lang="scss">
.attention {
  display: flex;
  flex-direction: column;
  justify-items: center;
  background-color: #f4f4f4;
  .attention-list {
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx;
  }
}
</style>

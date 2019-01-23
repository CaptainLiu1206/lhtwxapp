<template>
  <div class="container attention">
    <div v-if="list.length" class="attention-list">
      <attention-item v-for="attention in list" :key="attention.id" :attention="attention"></attention-item>
    </div>
    <i-load-more class="no-data" tip="暂无关注主办方" :loading="false" v-if="!list.length" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AttentionItem from 'components/attention-item'

export default {
  components: {
    AttentionItem
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    ...mapActions(['fetchMyattentions'])
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

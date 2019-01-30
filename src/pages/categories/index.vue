<template>
  <div class="categories">
    <div class="list">
      <div class="item" v-for="item in categories" :key="item.id" @click="onClickCategory(item)">
        <category-item :category="item"></category-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CategoryItem from 'components/category-item'

export default {
  components: {
    CategoryItem
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['categories'])
  },
  onShow () {
  },
  methods: {
    onClickCategory (category) {
      this.setCurrentCategory(category)
      wx.switchTab({
        url: `../schedule/main`
      })
    },
    ...mapMutations(['setCurrentCategory'])
  }
}
</script>

<style lang="scss">
.categories {
  background-color: #ffffff;
  .list {
    padding: 20rpx 30rpx 30rpx;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-bottom: 40rpx;
      text-align:center;
      width: 25%;
    }
  }
}
</style>

<template>
  <div class="container index">
    <div class="head">
      <div class="address" @click="toSeachCity">
        <span class="icon-wrapper">
          <van-icon name="location" size="14px" />
        </span>
        <span class="name">{{currentCity.name}}</span>
      </div>
      <div class="search-wrapper" @click="toSeachActive">
        <van-search placeholder="搜索精彩活动" v-model="value" />
      </div>
    </div>
    <div class="banner-wrapper" v-if="banners.length">
      <swiper>
        <block v-for="(banner, idx) in banners" :key="idx">
          <swiper-item>
            <img class="banner-img" :src="banner.title" alt="" @click="onBannerClick(banner)">
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="categories" v-if="categories.length">
      <div class="category" v-for="category in categories" :key="category.id" @click="toSchedule(category.id)">
        <van-icon class="icon" name="gem-o" />
        <p class="title">{{category.name}}</p>
      </div>
      <div class="category" @click="toSchedule(0)">
        <van-icon class="icon" name="more-o" />
        <p class="title">更多</p>
      </div>
    </div>
    <div class="activities" v-if="activities.length">
      <div class="title">强力推荐</div>
      <div class="list">
        <div class="item" v-for="active in activities" :key="active.id" @click="seeDetail(active)">
          <image :src="active.imgUrl" />
          <div class="desc">
            <p class="title ellipsis">{{active.title}}</p>
            <div class="label">
              <div class="date">{{active.startTime}}</div>
              <div class="price">￥<span class="num">{{active.price}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="activities" v-if="newest.length">
      <div class="title">最新活动</div>
      <div class="list">
        <div class="item" v-for="active in newest" :key="active.id" @click="seeDetail(active)">
          <image :src="active.imgUrl" />
          <div class="desc">
            <p class="title ellipsis">{{active.title}}</p>
            <div class="label">
              <div class="date">{{active.startTime}}</div>
              <div class="price">￥<span class="num">{{active.price}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Authorization :isShow="!isAuthorization" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Authorization from 'components/Authorization'
// import { formatTime } from 'utils'

export default {
  components: {
    Authorization
  },
  data () {
    return {
      banners: [],
      categories: [],
      activities: [],
      newest: []
    }
  },
  computed: {
    ...mapGetters(['currentCity', 'isAuthorization'])
  },
  methods: {
    toSeachCity () {
      wx.navigateTo({
        url: '../search-city/main'
      })
    },
    toSeachActive () {
      wx.navigateTo({
        url: '../search-active/main'
      })
    },
    toSchedule (id) {
      if (id || id === 0) {
        this.setCurrentCategoryId(id)
      }
      wx.switchTab({
        url: `../schedule/main`
      })
    },
    seeDetail (active) {
      wx.navigateTo({
        url: `../active-detail/main?id=${active.id}`
      })
    },
    onBannerClick (banner) {
      if (banner.urltype === 1 || banner.urltype === '1') {
        wx.navigateTo({
          url: `../active-detail/main?id=${banner.linkUrl}`
        })
      }
      if (banner.urltype === 2) {
        wx.navigateTo({
          url: `../webview/main?linkurl=${banner.linkUrl}`
        })
      }
    },
    ...mapActions(['fetchIndexInfo']),
    ...mapMutations(['setCurrentCategoryId'])
  },
  created () {
    this.fetchIndexInfo().then(({banners, categories, activities, newest}) => {
      this.newest = newest
      this.activities = activities
      this.categories = categories
      this.banners = banners
    })
  }
}
</script>

<style lang="scss">
.index {
  background-color: #fff;
  .head {
    display: flex;
    overflow: hidden;
    .address {
      width: 70px;
      padding-left: 10px;
      line-height: 44px;
      font-size: 0;
      overflow: hidden;
      height: 44px;
      .icon-wrapper {
        float: left;
        vertical-align: middle;
        margin: 6px 2px 0 0;
        overflow: hidden;
      }
      >.name {
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .search-wrapper {
      flex: 1 0 0;
      .van-search {
        background-color: #fff !important;
        .van-cell {
          background-color: #f2f2f2;
        }
      }
    }
  }
  .banner-wrapper {
    height: 400rpx;
    ._swiper {
      height: 100%;
      ._swiper-item {
        height: 100%;
      }
    }
    .banner-img {
      display: block;
      width: 100vw;
      height: 400rpx;
    }
  }

  .categories {
    display: flex;
    padding: 0 15px;
    margin: 50rpx 0 30rpx;
    flex-wrap: wrap;
    .category {
      flex: 0 0 25%;
      overflow: hidden;
      text-align: center;
      margin-bottom: 20rpx;
      .icon {
        color: #3B99FB;
        font-size: 24px;
      }
      .title {
        font-size: 16px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10rpx;
      }
    }
  }
  .activities {
    padding: 0 15px;
    margin-bottom: 40rpx;
    &:last-child {
      margin-bottom: 0;
    }
    > .title {
      position: relative;
      padding-left: 20rpx;
      margin-bottom: 40rpx;
      font-size: 32rpx;
      line-height: 32rpx;
      color: #333;
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
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      .item {
        flex: 0 0 50%;
        box-sizing: border-box;
        margin-bottom: 40rpx;
        overflow: hidden;
        &:nth-child(2n+1) {
          padding-right: 20rpx;
        }
        &:nth-child(2n) {
          padding-left: 20rpx;
        }
        > image {
          width: 100%;
          height: 244rpx;
          border-radius: 16rpx;
        }
        .desc {
          .title {
            font-size: 16px;
            line-height: 20px;
            color: #333;
            margin: 16rpx 0;
          }
          .label {
            display: flex;
            align-items: flex-end;
            .date {
              flex: 1 0 0;
              text-align: left;
              color: #666;
              font-size: 12px;
            }
            .price {
              flex: 1 0 0;
              text-align: right;
              color: red;
              font-size: 12px;
              font-weight: bold;
              .num {
                font-size: 16px;
                font-weight: 600;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="container index">
    <div class="head">
      <div class="address" @click="toSeachCity">
        <span class="icon-wrapper">
          <van-icon name="location" size="14px" />
        </span>
        <span class="name ellipsis">{{currentCity.name}}</span>
      </div>
      <div class="search-wrapper" @click="toSeachActive">
        <van-search placeholder="搜索精彩活动" v-model="value" />
      </div>
    </div>
    <div class="banner-wrapper" v-if="banners.length">
      <swiper>
        <block v-for="(banner, idx) in banners" :key="idx">
          <swiper-item>
            <image class="banner-img" mode="aspectFill" :src="banner.title" alt="" @click="onBannerClick(banner)"></image>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="categories" v-if="categories.length">
      <div class="category" v-for="category in categories" :key="category.id" @click="toSchedule(category.id)">
        <div class="widget">
          <view class="icon-wrapper">
            <text class="iconfont" :class="category.iconUrl"></text>
          </view>
        </div>
        <p class="title">{{category.name}}</p>
      </div>
      <div class="category" @click="toSchedule(0)">
        <view class="icon-wrapper">
          <text class="iconfont icon-qita"></text>
        </view>
        <p class="title">其它行业</p>
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
  onShareAppMessage () {},
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
    background-color: #f2f2f2;
    .address {
      width: auto;
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
        max-width: 70px;
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .search-wrapper {
      flex: 1 0 0;
      .van-search {
        .van-cell {
        background-color: #fff !important;
        }
      }
    }
  }
  .banner-wrapper {
    height: 300rpx;
    ._swiper {
      height: 100%;
      ._swiper-item {
        height: 100%;
      }
    }
    .banner-img {
      display: block;
      width: 100vw;
      height: 300rpx;
    }
  }

  .categories {
    margin: 30px 0 15px;
    .category {
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
      text-align: center;
      margin: 0 30rpx 15px;
      & + .category {
        .icon-wrapper {
          color: rgb(226, 100, 104);
          border-color: rgb(226, 100, 104);
        }
        & + .category {
          .icon-wrapper {
            color: rgb(246, 83, 184);
            border-color: rgb(246, 83, 184);
          }
          & + .category {
            .icon-wrapper {
              color: rgb(107, 201, 213);
              border-color: rgb(107, 201, 213);
            }
            & + .category {
              .icon-wrapper {
                color: rgb(238, 132, 93);
                border-color: rgb(238, 132, 93);
              }
              & + .category {
                .icon-wrapper {
                  color: rgb(117, 77, 199);
                  border-color: rgb(117, 77, 199);
                }
                & + .category {
                  .icon-wrapper {
                    color: rgb(139, 210, 70);
                    border-color: rgb(139, 210, 70);
                  }
                  & + .category {
                    .icon-wrapper {
                      color: rgb(246, 175, 83);
                      border-color: rgb(246, 175, 83);
                    }
                  }
                }
              }
            }
          }
        }
      }
      .widget {
        width: 127rpx;
        height: 80rpx;
        text-align: center;
      }
      .icon-wrapper {
        display: inline-block;
        text-align: center;
        width: 80rpx;
        height: 80rpx;
        color: rgb(96, 164, 237);
        border: 2px solid rgb(96, 164, 237);
        box-sizing: border-box;
        border-radius: 50%;
        .iconfont {
          font-size: 40rpx;
          line-height: 70rpx;
        }
      }
      .title {
        margin-top: 5px;
        font-size: 12px;
        color: rgb(159, 159, 159);
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
            font-size: 14px;
            line-height: 18px;
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

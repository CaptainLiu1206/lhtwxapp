<template>
  <div class="container index">
    <div class="head">
      <div class="address" @click="toSeachCity">
        <text class="iconfont icon-didian01"></text>
        <span class="name ellipsis">地区</span>
      </div>
      <div class="search-wrapper" @click="toSeachActive">
        <van-search placeholder="搜索精彩活动" v-model="value" />
      </div>
    </div>
    <div class="banner-wrapper" v-if="indexData.banners.length">
      <swiper>
        <block v-for="(banner, idx) in indexData.banners" :key="idx">
          <swiper-item>
            <image class="banner-img" mode="aspectFill" :src="banner.title" alt="" @click="onBannerClick(banner)"></image>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="categories" v-if="indexData.categories.length">
      <div class="category" v-for="category in indexData.categories" :key="category.id" @click="onClickCategory(category.id)">
        <category-item :category="category"></category-item>
      </div>
    </div>
    <div class="activities" v-if="indexData.activities.length">
      <div class="title">强力推荐</div>
      <div class="list">
        <div class="item" v-for="active in indexData.activities" :key="active.id" @click="seeDetail(active)">
          <image :src="active.imgUrl" />
          <div class="desc">
            <p class="title ellipsis">{{active.title}}</p>
            <div class="label">
              <div class="date" v-if="active.startTime"><i-icon class="icon" type="time" color="#666" size="14" /><span>{{active.startTime}}</span></div>
              <div class="address" v-if="active.areaname"><i-icon class="icon" type="coordinates" color="#666" size="14" /><span>{{active.areaname}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="advertisement-position">
      <div class="widget" @click="onBannerClick(indexData.advertisement)">
        <image class="advertisement" mode="widthFix" :src="indexData.advertisement.headimg"></image>
      </div>
    </div>
    <div class="activities" v-if="indexData.newest.length">
      <div class="title">最新活动</div>
      <div class="list">
        <div class="item" v-for="active in indexData.newest" :key="active.id" @click="seeDetail(active)">
          <image :src="active.imgUrl" />
          <div class="desc">
            <p class="title ellipsis">{{active.title}}</p>
            <div class="label">
              <div class="date" v-if="active.startTime"><i-icon class="icon" type="time" color="#666" size="14" /><span>{{active.startTime}}</span></div>
              <div class="address" v-if="active.areaname"><i-icon class="icon" type="coordinates" color="#666" size="14" /><span>{{active.areaname}}</span></div>
            </div>
            <!-- <div class="label">
              <div class="price">￥<span class="num">{{active.price}}</span></div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="sponsors">
      <div class="header">
        <div class="title">主办方</div>
        <a class="more" @click="toSponsors">更多<van-icon name="arrow" size="12px"></van-icon></a>
      </div>
      <div class="list">
        <div class="item" v-for="sponsor in indexData.sponsors" :key="sponsor.id" @click="toSponsorDetail(sponsor.id)">
          <div class="icon-widget" v-if="sponsor.type && sponsor.type.className">
            <i class="iconfont icon-renzheng" :class="sponsor.type.className"></i>
          </div>
          <image class="thumb" :src="sponsor.companyImgurl" />
          <div class="meta">
            <p class="name ellipsis">{{sponsor.companyName}}</p>
            <p class="desc ellipsis-two">{{sponsor.compayProfile}}</p>
            <a class="btn" @click.stop="onToggleSponsor(sponsor)" :class="{'done': sponsor.uConcerned}">{{sponsor.uConcerned? '已关注' : '关注'}}</a>
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
import CategoryItem from 'components/category-item'

export default {
  components: {
    Authorization,
    CategoryItem
  },
  data () {
    return {
      banners: [],
      categories: [],
      activities: [],
      newest: [],
      advertisement: {},
      sponsors: []
    }
  },
  computed: {
    ...mapGetters(['isAuthorization', 'indexData'])
  },
  methods: {
    onToggleSponsor (sponsor) {
      this.toggleSponsor({organizationId: sponsor.id}).then((success, msg) => {
        if (success) {
          sponsor.uConcerned = !sponsor.uConcerned
          if (sponsor.uConcerned) {
            wx.showToast({
              title: '关注成功'
            })
          } else {
            wx.showToast({
              title: '取消关注成功',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: msg || sponsor.uConcerned ? '取消关注失败' : '关注失败',
            icon: 'none'
          })
        }
      })
    },
    toSponsorDetail (id) {
      wx.navigateTo({
        url: `../sponsor-detail/main?id=${id}`
      })
    },
    toSponsors () {
      wx.navigateTo({
        url: '../sponsors/main'
      })
    },
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
    onClickCategory (id) {
      if (id >= 0) {
        this.setCurrentCategoryId(id)
        wx.switchTab({
          url: `../schedule/main`
        })
      } else {
        wx.navigateTo({
          url: `../categories/main`
        })
      }
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
    ...mapActions(['fetchIndexInfo', 'toggleSponsor']),
    ...mapMutations(['setCurrentCategoryId'])
  },
  onShareAppMessage () {},
  created () {}
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
      .iconfont {
        display: inline-block;
        vertical-align: middle;
        margin-right: 3px;
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
    margin: 60rpx 0 20rpx;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .category {
      margin-bottom: 40rpx;
      text-align:center;
      width: 25%;
    }
  }
  .activities {
    padding: 0 15px;
    margin-bottom: 20rpx;
    &:last-child {
      margin-bottom: 0;
    }
    > .title {
      position: relative;
      padding-left: 20rpx;
      margin-bottom: 40rpx;
      font-size: 32rpx;
      line-height: 32rpx;
      font-weight: 600;
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
          height: 203rpx;
          border-radius: 16rpx;
        }
        .desc {
          .title {
            font-size: 14px;
            line-height: 18px;
            color: #333;
            margin: 16rpx 0;
            font-weight: 600;
          }
          .label {
            display: flex;
            align-items: flex-end;
            .icon {
              padding-right: 2px;
            }
            .date {
              flex: 1 0 0;
              text-align: left;
              color: #666;
              font-size: 12px;
            }
            .address {
              font-size: 12px;
              color: #666;
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
  .advertisement-position {
    padding: 0 30rpx;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 40rpx;
    .widget {
      .advertisement {
        width: 100%;
        overflow: hidden;
        border-radius: 20rpx;
      }
    }
  }
  .sponsors {
    padding: 0 15px;
    margin-bottom: 40rpx;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 40rpx;
      > .title {
        flex: 1 0 0;
        position: relative;
        padding-left: 20rpx;
        font-size: 32rpx;
        line-height: 32rpx;
        font-weight: 600;
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
      .more {
        width: auto;
        font-size: 12px;
        line-height: 32rpx;
        color: #666;
      }
    }
    .list {
      display: flex;
      justify-content: space-between;
      .item {
        position: relative;
        flex: 1 0 0;
        margin-right: 20rpx;
        overflow: hidden;
        border: 2rpx solid #e8e8e8;
        border-radius: 8rpx;
        padding: 12rpx;
        box-sizing: border-box;
        text-align: center;
        &:last-child {
          margin-right: 0;
        }
        .icon-widget {
          position: absolute;
          left: 15rpx;
          top: 15rpx;
          .iconfont {
            font-size: 14px;
            color: #808069;
          }
        }
        .thumb {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          overflow: hidden;
        }
        .meta {
          font-size: 12px;
          line-height: 16px;
          .name {
            color: #333;
            font-weight: 600;
            margin: 5px 0;
          }
          .desc {
            color: #666;
            font-size: 10px;
            text-align: left;
            height: 32px;
          }
          .btn {
            margin-top: 5px;
            display: inline-block;
            font-size: 12px;
            line-height: 20px;
            width: 80%;
            color: rgb(139, 210, 70);
            border: 1px solid rgb(139, 210, 70);
            border-radius: 4px;
            &.done {
              color: #3B99FB;
              border: 1px solid #3B99FB;
            }
          }
        }
      }
    }
  }
}
</style>

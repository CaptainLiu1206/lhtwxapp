<template>
  <div class="container index">
    <div class="head">
      <div class="address" @click="toSeachCity">
        <span class="icon-wrapper">
          <van-icon name="location" size="14px" />
        </span>
        <span class="name">{{currentCity}}</span>
      </div>
      <div class="search-wrapper">
        <van-search placeholder="搜索精彩活动" v-model="value" />
      </div>
    </div>
    <div class="banner-wrapper">
      <swiper>
        <block v-for="(imgUrl, idx) in imgUrls" :key="idx">
          <swiper-item>
            <image class="banner-img" :src="imgUrl" mode="widthFix" style="width: 100%;" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="categories">
      <div class="category" v-for="category in categories" :key="category.id">
        <van-icon class="icon" :name="category.icon" />
        <p class="title">{{category.title}}</p>
      </div>
      <div class="category">
        <van-icon class="icon" name="more-o" />
        <p class="title">更多</p>
      </div>
    </div>
    <div class="activities">
      <div class="title">强力推荐</div>
      <div class="list">
        <div class="item" v-for="active in activities" :key="active.id">
          <image :src="active.imgUrl" mode="widthFix" />
          <div class="desc">
            <p class="title">{{active.title}}</p>
            <div class="label">
              <div class="date">{{active.startTime}}</div>
              <div class="price">￥{{active.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
      imgUrls: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548165717&di=f5067553402fa156140cc2b0931b4d6e&imgtype=jpg&er=1&src=http%3A%2F%2Fimg0.ph.126.net%2FyPuVuVngJMXkhhOHBmKsow%3D%3D%2F6597981261795990840.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548165717&di=f5067553402fa156140cc2b0931b4d6e&imgtype=jpg&er=1&src=http%3A%2F%2Fimg0.ph.126.net%2FyPuVuVngJMXkhhOHBmKsow%3D%3D%2F6597981261795990840.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548165717&di=f5067553402fa156140cc2b0931b4d6e&imgtype=jpg&er=1&src=http%3A%2F%2Fimg0.ph.126.net%2FyPuVuVngJMXkhhOHBmKsow%3D%3D%2F6597981261795990840.jpg'
      ],
      categories: [
        {
          id: 1,
          icon: 'gem-o',
          title: '分类1'
        },
        {
          id: 2,
          icon: 'gift-o',
          title: '分类2'
        },
        {
          id: 3,
          icon: 'shop-o',
          title: '分类3'
        }
      ],
      activities: [
        {
          id: 1,
          imgUrl: 'http://edustor.zhaopin.com/courseimage/1538980970608社保税管750-420.jpg',
          title: '2018年全球金融衍产品大会颁奖盛典',
          startTime: '2018-12-31',
          price: '188'
        },
        {
          id: 2,
          imgUrl: 'http://edustor.zhaopin.com/courseimage/1538980970608社保税管750-420.jpg',
          title: '2018年全球金融衍产品大会颁奖盛典',
          startTime: '2018-12-31',
          price: '188'
        },
        {
          id: 3,
          imgUrl: 'http://edustor.zhaopin.com/courseimage/1538980970608社保税管750-420.jpg',
          title: '2018年全球金融衍产品大会颁奖盛典',
          startTime: '2018-12-31',
          price: '188'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentCity'])
  },
  methods: {
    toSeachCity () {
      wx.navigateTo({
        url: '../search-city/main'
      })
    }
  },
  created () {}
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
  .swiper-wrapper {
    .banner-img {
      display: block;
      width: 100%;
      height: 300rpx;
    }
  }
  .categories {
    display: flex;
    padding: 0 15px;
    margin: 60rpx 0;
    .category {
      flex: 1 0 0;
      text-align: center;
      color: green;
      .icon {
        font-size: 24px;
      }
      .title {
        font-size: 16px;
      }
    }
  }
  .activities {
    padding: 0 15px;
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
        background-color: blue;
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
        &:nth-child(2n+1) {
          padding-right: 10rpx;
        }
        &:nth-child(2n) {
          padding-left: 10rpx;
        }
        > image {
          width: 100%;
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
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="container index">
    <div class="head">
      <div class="address">
        <span class="icon-wrapper">
          <van-icon name="location-o" />
        </span>
        <span class="name">全国</span>
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
        <van-icon :name="category.icon" />
        <p>{{category.title}}</p>
      </div>
      <div class="category">
        <van-icon name="more" />
        <p>更多</p>
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
          icon: 'gem',
          title: '分类1'
        },
        {
          id: 2,
          icon: 'gift',
          title: '分类2'
        },
        {
          id: 3,
          icon: 'shop',
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
  },
  methods: {
  },
  created () {}
}
</script>

<style lang="scss">
.index {
  background-color: #f2f2f2;
  .head {
    display: flex;
    overflow: hidden;
    .address {
      width: 50px;
      padding-left: 15px;
      line-height: 44px;
      font-size: 0;
      overflow: hidden;
      height: 44px;
      .icon-wrapper {
        font-size: 16px;
        float: left;
        vertical-align: middle;
        margin-top: 2px;
      }
      >.name {
        font-size: 16px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .search-wrapper {
      flex: 1 0 0;
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
    .category {
      flex: 1 0 0;
      text-align: center;
    }
  }
  .activities {
    padding: 0 15px;
    > .title {
      font-size: 32rpx;
      line-height: 32rpx;
      color: #333;
      padding-left: 20rpx;
      position: relative;
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
            }
          }
        }
      }
    }
  }
}
</style>

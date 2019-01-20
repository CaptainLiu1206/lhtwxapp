<template>
  <div class="container user">
    <div class="avatar-card">
      <div class="avatar-box">
        <div class="avatar">
          <i-avatar i-class="avatar-icon" size="large">刘</i-avatar>
          <span class="user-name">王凯</span>
        </div>
        <div class="icon-box">
          <i-icon type="setup" size="28" @click="toUserInfoSet"></i-icon>
        </div>
      </div>
    </div>
    <i-cell-group>
      <i-cell title="我的活动" is-link url="/pages/my-activities/main">
        <i-icon type="activity_fill" slot="icon" size="20"></i-icon>
      </i-cell>
      <i-cell title="关注的主办方" is-link url="/pages/my-attentions/main">
        <i-icon type="group_fill" slot="icon" size="20"></i-icon>
      </i-cell>
      <i-cell title="我的收藏" is-link url="/pages/my-favourites/main">
        <i-icon type="task_fill" slot="icon" size="20"></i-icon>
      </i-cell>
      <i-cell title="联系我们" is-link url="/pages/index/main">
        <i-icon type="mobilephone_fill" slot="icon" size="20"></i-icon>
      </i-cell>
    </i-cell-group>
    <swiper
      class="swiper"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <swiper-item v-for="(imgUrl, index) in imgUrls" v-bind:key="index">
        <image :src="imgUrl" class="slide-image" />
      </swiper-item>
    </swiper>
    <Authorization :isShow="!isAuthorization" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Authorization from 'components/Authorization'

export default {
  components: {
    Authorization
  },
  data () {
    return {
      imgUrls: [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546453506553&di=ba2a7ec9cb858c6d8ee381da5775f995&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01edb3555ea8100000009af0ba36f5.jpg%401280w_1l_2o_100sh.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546453506553&di=ba2a7ec9cb858c6d8ee381da5775f995&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01edb3555ea8100000009af0ba36f5.jpg%401280w_1l_2o_100sh.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546453506553&di=ba2a7ec9cb858c6d8ee381da5775f995&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01edb3555ea8100000009af0ba36f5.jpg%401280w_1l_2o_100sh.jpg'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000
    }
  },
  computed: {
    ...mapGetters(['isAuthorization'])
  },
  methods: {
    toUserInfoSet () {
      wx.navigateTo({
        url: '/pages/userInfoSet/main'
      })
    }
  },
  created () {}
}
</script>

<style lang="scss">
.user {
  .avatar-card {
    width: 100%;
    height: 400rpx;
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    .avatar-box {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 10rpx;
      .avatar {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        .avatar-icon {
          width: 120rpx;
          height: 120rpx;
          line-height: 120rpx;
          border-radius: 60rpx;
          font-size: 72rpx;
        }
        .user-name {
          display: block;
          margin-top: 20rpx;
          font-size: 32rpx;
          color: yellowgreen;
        }
      }
      .icon-box {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
      }
    }
  }
  .swiper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 120rpx;
    image {
      width: 100vw;
      height: 120rpx;
    }
  }
}
</style>

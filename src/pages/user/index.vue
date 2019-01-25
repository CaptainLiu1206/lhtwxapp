<template>
  <div class="container user">
    <div class="avatar-card">
      <div class="avatar-box">
        <div class="blur_bj">
          <img :src="userInfo.userimage" alt="Alternate Text">
        </div>
        <div class="avatar">
          <i-avatar i-class="avatar-icon" size="large" :src="userInfo.userimage"></i-avatar>
          <span class="user-name">{{userInfo.realname || userInfo.nickname}}</span>
        </div>
        <div class="icon-box">
          <i-icon type="setup" size="28" @click="toUserInfoSet"></i-icon>
        </div>
        <div class="blur_bj_gray"></div>
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
      <swiper-item v-for="banner in userBanners" v-bind:key="banner.id" @click="toWebView(banner)">
        <image :src="banner.headimg" class="slide-image" />
      </swiper-item>
    </swiper>
    <Authorization :isShow="!isAuthorization" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Authorization from 'components/Authorization'

export default {
  components: {
    Authorization
  },
  data () {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000
    }
  },
  computed: {
    avatarBoxStyle () {
      return `background: url(${this.userInfo.userimage}) no-repeat center;`
    },
    ...mapGetters(['isAuthorization', 'userInfo', 'userBanners'])
  },
  methods: {
    toUserInfoSet () {
      wx.navigateTo({
        url: '/pages/userInfoSet/main'
      })
    },
    toWebView (banner) {
      wx.navigateTo({
        url: `../webview/main?linkurl=${banner.linkUrl}`
      })
    },
    ...mapActions(['fetchUserBanners'])
  },
  onShow () {
    if (!this.userBanners.length) {
      this.fetchUserBanners()
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
      background-color: transparent;
      border-radius: 10rpx;
      background-size: cover;
      .blur_bj {
        position: absolute;
        height: 100%;
        width: 100%;
        overflow: hidden;
        top: 0;
        z-index: 1;
        filter: blur(15px);
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .blur_bj_gray {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        background: rgba(0,0,0,.2);
        z-index: 2;
      }
      .avatar {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        z-index: 111;
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
        z-index: 111;
      }
    }
  }
  .swiper {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 150rpx;
    image {
      width: 100vw;
      height: 150rpx;
    }
  }
}
</style>

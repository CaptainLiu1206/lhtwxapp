<template>
  <div class="active-detail container">
    <div class="active-info scrollbar-hide">
      <div class="top">
        <div class="img-wrapper">
          <div class="blur_bj">
            <img class="blur-img" :src="active.headimg" alt="">
          </div>
          <div class="blur_bj_gray"></div>
          <div class="cover"></div>
          <div class="collection-wrapper" :class="{'clollected': active.iscollection}" @click="onToggleCollection">
            <van-icon name="like" color="#FC2C22" size="20px" v-if="active.iscollection" />
            <van-icon name="like-o" color="#44474C" size="20px" v-if="!active.iscollection" />
          </div>
          <img class="active-img" :src="active.headimg" alt="">
        </div>
        <div class="info">
          <p class="title">{{active.title}}</p>
          <p class="date ellipsis">{{active.time}}</p>
          <p class="address ellipsis">{{active.address}}</p>
        </div>
      </div>
      <div class="mid" v-if="sponsor && sponsor.id">
        <sponsor-card :isBtn="isBtn" :sponsor="sponsor" @btncb="onToggleSponsor"></sponsor-card>
      </div>
      <view class="panel-wrapper">
        <van-panel title="活动详情">
          <div class="widget">
            <div class="list">
              <div class="cell">
                <label class="label">大会主题：</label>
                <span class="text">{{active.title}}</span>
              </div>
              <div class="cell">
                <label class="label">主办方：</label>
                <span class="text">{{active.sponsor}}</span>
              </div>
              <div class="cell">
                <label class="label">大会规模：</label>
                <span class="text">{{active.scale}}</span>
              </div>
              <div class="cell">
                <label class="label">大会时间：</label>
                <span class="text">{{active.time}}</span>
              </div>
              <div class="cell">
                <label class="label">大会地址：</label>
                <span class="text">{{active.address}}</span>
              </div>
            </div>
          </div>
          <div class="btn-wrapper" v-if="active.attachment">
            <van-button size="small" type="primary" plain round @click="seeMore">查看更多</van-button>
          </div>
        </van-panel>
      </view>
      <view class="panel-wrapper">
        <van-panel title="咨询" use-footer-slot class="sub-question">
          <view class="form-wrapper">
            <van-field type="text" placeholder="请输入问题" :value="leavingMessage" @change="onTextChange" :maxlength="150" :clearable="true" />
          </view>
          <view slot="footer" class="footer">
            <van-button type="primary" size="small" @click="onSubmit">提交</van-button>
          </view>
        </van-panel>
      </view>
      <view class="panel-wrapper" v-if="leavingmessages.length">
        <van-panel title="全部问题">
          <view class="list questions">
            <view class="item" v-for="question in leavingmessages" :key="question.id">
              <view class="left">
                <image class="avatar" :src="question.userimage" />
                <view class="name ellipsis">{{question.nickname}}</view>
              </view>
              <view class="right">
                <view class="question">{{question.question}}</view>
                <view class="answer">
                  <span>回复：</span>
                  <text>{{question.answer}}</text>
                </view>
              </view>
            </view>
          </view>
        </van-panel>
      </view>
    </div>
    <!-- <div :class="buyWrapperClass" v-if="!active.isexpired"> -->
    <div :class="buyWrapperClass">
      <van-submit-bar
        :price="active.price * 100"
        :button-text="buyBtnText"
        :tip="true"
        @submit="toBuy">
        <view slot="tip">温馨提示：请您在购买之前，确认填写报名信息真实有效。</view>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import SponsorCard from 'components/sponsor-card'

export default {
  data () {
    return {
      active: {
        price: 0
      },
      sponsor: {},
      isBtn: true,
      leavingMessage: '',
      leavingmessages: []
    }
  },
  computed: {
    sponsors () {
      let str = this.active && this.active.sponsors ? this.active.sponsors.reduce((_str, sponsor) => {
        _str += `${sponsor.title}, `
        return _str
      }, '') : ''
      return str.length > 0 ? str.slice(0, -2) : ''
    },
    buyBtnText () {
      return this.active.price ? '立即支付' : '免费领取'
    },
    buyWrapperClass () {
      if (this.isIphoneX) {
        return 'buy-wrapper higher'
      } else {
        return 'buy-wrapper'
      }
    },
    ...mapGetters(['userInfo', 'isIphoneX'])
  },
  components: {
    SponsorCard
  },
  onUnload () {
    this.active = {}
    this.sponsor = {}
  },
  methods: {
    seeMore () {
      wx.setStorageSync('wxparsecontent', this.active.attachment)
      wx.navigateTo({
        url: '../wxparse-widget/main'
      })
    },
    onTextChange (e) {
      this.leavingMessage = e.mp.detail
    },
    onSubmit () {
      const leavingMessage = this.leavingMessage.trim()
      if (!leavingMessage) {
        this.leavingMessage = ''
        wx.showToast({
          icon: 'none',
          title: '请填写问题'
        })
        return false
      }
      if (!this.active.id) {
        wx.showToast({
          icon: 'none',
          title: '活动数据出错'
        })
        return false
      }
      this.saveUserLeavingMessage({activityId: this.active.id, leavingMessage}).then(({success}) => {
        if (success) {
          wx.showToast({
            title: '提问成功'
          })
          this.leavingMessage = ''
        }
      })
    },
    toBuy () {
      let activeStr = JSON.stringify(this.active)
      wx.setStorageSync('active', activeStr)

      wx.navigateTo({
        url: `../payment/main?id=${this.active.id}`
      })
    },
    onToggleCollection () {
      this.toggleCollection({activityId: this.active.id}).then((success, msg) => {
        if (success) {
          this.active.iscollection = !this.active.iscollection
          if (this.active.iscollection) {
            wx.showToast({
              title: '收藏成功'
            })
          } else {
            wx.showToast({
              title: '取消收藏成功',
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: msg || this.active.iscollection ? '取消收藏失败' : '收藏失败',
            icon: 'none'
          })
        }
      })
    },
    onToggleSponsor () {
      this.toggleSponsor({organizationId: this.sponsor.id}).then((success, msg) => {
        if (success) {
          this.sponsor.uConcerned = !this.sponsor.uConcerned
          if (this.sponsor.uConcerned) {
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
            title: msg || this.sponsor.uConcerned ? '取消关注失败' : '关注失败',
            icon: 'none'
          })
        }
      })
    },
    ...mapActions(['fetchActivityDetail', 'toggleCollection', 'toggleSponsor', 'saveUserLeavingMessage'])
  },
  onShow () {
    this.fetchActivityDetail({activityId: parseInt(this.$mp.query.id)}).then(({success, data}) => {
      if (success) {
        this.active = {...data.active}
        this.sponsor = {...data.sponsor}
        this.leavingmessages = [...data.leavingmessages]
      }
    })
  },
  onShareAppMessage () {}
}
</script>
<style lang="scss" scoped>
.active-detail {
  background-color: rgb(244, 244, 244);
  display: flex;
  flex-direction: column;
  .active-info {
    flex: 1 0 0;
    overflow-y: auto;
    .top {
      position: relative;
      background-color: #fff;
      margin-bottom: 40rpx;
      padding-bottom: 20rpx;
      .img-wrapper {
        position: relative;
        height: 480rpx;
        width: 100%;
        .blur_bj {
          position: absolute;
          height: 380rpx;
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
          height: 380rpx;
          width: 100%;
          top: 0;
          background: rgba(0,0,0,.2);
          z-index: 2;
        }
        .cover {
          position: absolute;
          left: 0;
          top: 330rpx;
          width: 100%;
          height: 150rpx;
          border-radius: 40% 40% 0 0;
          overflow: hidden;
          z-index: 10;
          background-color: #ffffff;
        }
        .collection-wrapper {
          position: absolute;
          right: 50rpx;
          top: 60rpx;
          width: 30px;
          height: 30px;
          line-height: 38px;
          z-index: 20;
          text-align: center;
          background-color: rgba(184, 188, 191, 0.8);
          border-radius:50%;
          overflow:hidden;
        }
        .active-img {
          position: absolute;
          left: 30rpx;
          top: 40rpx;
          z-index: 11;
          width: 690rpx;
          height: 431rpx;
          border-radius: 20rpx;
          overflow: hidden;
        }
      }
      .info {
        padding: 0 15px;
        line-height: 16px;
        font-size: 12px;
        color: #666;
        .title {
          margin: 10px 0;
          font-size: 16px;
          line-height: 20px;
          color: #333;
          font-weight: 600;
        }
        .address {
          margin-top: 10rpx;
        }
      }
    }
    .mid {
      background-color: transparent;
      .collect-icon {
        width: 50rpx;
        height: 50rpx;
      }
    }
    .panel-wrapper {
      margin: 40rpx 0;
      .widget {
        padding: 15px 15px 10px;
        background-color: #fff;
        .cell {
          margin-bottom: 10rpx;
          font-size: 14px;
          line-height: 24px;
          color: #333;
        }
      }
      .btn-wrapper {
        text-align: center;
        padding-bottom: 15px;
      }
      .questions {
        padding: 15px;
        .item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 15px;
          &:last-child {
            margin-bottom: 0;
          }
          .left {
            width: 80rpx;
            overflow: hidden;
            .avatar {
              display: block;
              width: 80rpx;
              height: 80rpx;
              overflow: hidden;
              border-radius: 50%;
            }
            .name {
              text-align: center;
              margin-top: 6px;
              color: #666;
              font-size: 12px;
            }
          }
          .right {
            flex: 1 0 0;
            margin-left: 15px;
            font-size: 12px;
            color: #333;
            .question {
              line-height: 20px;
            }
            .answer {
              margin-top: 10px;
              padding: 10px;
              background-color: rgb(244, 247, 250);
              line-height: 20px;
            }
          }
        }
      }
    }
  }
  .buy-wrapper {
    flex: 88px 0 0;
    &.higher {
      flex: 122px 0 0;
    }
  }
  .sub-question {
    .footer {
      text-align: right;
    }
  }
}
</style>

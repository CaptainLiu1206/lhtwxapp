<template>
  <div class="active-detail container">
    <div class="active-info scrollbar-hide">
      <div class="top">
        <div class="collection-wrapper" :class="{'clollected': active.iscollection}" @click="onToggleCollection">
          <img class="star" src="../../assets/img/collected.png" alt="" v-if="active.iscollection">
          <img class="star" src="../../assets/img/uncollected.png" alt="" v-if="!active.iscollection">
        </div>
        <img class="active-img" :src="active.headimg" alt="">
        <div class="info">
          <p class="title">{{active.title}}</p>
          <p class="date ellipsis">{{active.time}}</p>
          <p class="address ellipsis">{{active.address}}</p>
        </div>
      </div>
      <div class="mid">
        <attention-item :isBtn="isBtn" :attention="sponsor" @btncb="onToggleAttention"></attention-item>
      </div>
      <div class="bottom">
        <div class="title">活动详情</div>
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
          <!-- <div class="cell">
            <label class="label">大会赞助/合作接洽微信：</label>
            <span class="text">{{active.contact}}</span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="buy-wrapper">
      <span class="price">￥{{active.price}}</span>
      <button class="btn" @click="toBuy">立即购买</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import AttentionItem from 'components/attention-item'

export default {
  data () {
    return {
      active: {},
      sponsor: {},
      isBtn: true
    }
  },
  computed: {
    sponsors () {
      let str = this.active && this.active.sponsors ? this.active.sponsors.reduce((_str, sponsor) => {
        _str += `${sponsor.title}, `
        return _str
      }, '') : ''
      return str.length > 0 ? str.slice(0, -2) : ''
    }
  },
  components: {
    AttentionItem
  },
  onUnload () {
    this.active = {}
    this.sponsor = {}
  },
  methods: {
    toBuy () {
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
    onToggleAttention (flag) {
      this.toggleAttention({organizationId: this.sponsor.id}).then((success, msg) => {
        if (success) {
          this.sponsor.isconcenred = !this.sponsor.isconcenred
          if (this.sponsor.isconcenred) {
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
            title: msg || this.sponsor.isconcenred ? '取消关注失败' : '关注失败',
            icon: 'none'
          })
        }
      })
    },
    ...mapActions(['fetchActivityDetail', 'toggleCollection', 'toggleAttention'])
  },
  onShow () {
    this.fetchActivityDetail({activityId: parseInt(this.$mp.query.id)}).then(({success, data}) => {
      if (success) {
        console.log(data.sponsor)
        this.active = {...data.active}
        this.sponsor = {...data.sponsor}
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
      .collection-wrapper {
        position: absolute;
        right: 20rpx;
        top: 20rpx;
        width: 60rpx;
        height: 60rpx;
        .star {
          display: block;
          width: 60rpx;
          height: 60rpx;
        }
      }
      .active-img {
        width: 100%;
        height: 420rpx;
      }
      .info {
        padding: 0 30rpx;
        line-height: 32rpx;
        font-size: 28rpx;
        color: #666;
        .title {
          margin: 20rpx 0;
          font-size: 40rpx;
          line-height: 40rpx;
          color: #333;
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
    .bottom {
      padding: 30rpx;
      background-color: #fff;
      margin: 40rpx 0;
      .title {
        margin-bottom: 20rpx;
        font-size: 40rpx;
      }
      .cell {
        margin-bottom: 10rpx;
        font-size: 28rpx;
        line-height: 40rpx;
        font-size: #333;
      }
    }
  }
  .buy-wrapper {
    display:flex;
    padding:0 40rpx;
    justify-content:space-between;
    align-items:center;
    width:100%;
    flex: 100rpx 0 0;
    font-size:36rpx;
    color:rgb(239, 79, 57);
    font-weight:bold;
    background:#fff;
    box-sizing:border-box;
    box-shadow:1rpx 0rpx 4rpx rgba(0, 0, 0,0.2);
    border-top: 2rpx solid #e8e8e8;
    .price {
      flex: 1 0 0;
    }
    .btn {
      font-size:30rpx;
      color:rgb(255, 255, 255);
      border-radius:10rpx;
      flex: 200rpx 0 0;
      height: 70rpx;
      line-height: 70rpx;
      background:rgb(239, 79, 57);
      box-shadow:1px 1px 30px 1px rgba(239, 79, 57,0.15);
      border:none;
    }
  }
}
</style>

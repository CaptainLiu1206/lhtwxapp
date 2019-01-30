<template>
  <div class="container sponsor-detail">
    <div class="sponsor-info">
      <div class="widget">
        <div class="box">
          <div class="thumb">
            <div @click="onToggleSponsor">
              <img class="avatar" :src="sponsor.companyImgurl" alt="thumb">
              <div class="btn-wrapper">
                <a class="btn">
                  <span class="btn-sponsor add-sponsor" v-if="!sponsor.uConcerned">关注</span>
                  <span class="btn-sponsor cancel-sponsor" v-if="sponsor.uConcerned">已关注</span>
                </a>
              </div>
            </div>
          </div>
          <div class="meta">
            <div class="name" v-if="sponsor.companyName">
              <div>{{sponsor.companyName}}</div>
              <view class="type" v-if="sponsor.type && sponsor.type.className">
                <text class="iconfont icon-renzheng" :class="sponsor.type.className"></text>
                <span>{{sponsor.type.sponsorType}}</span>
              </view>
            </div>
            <div class="desc" v-if="sponsor.compayProfile">{{sponsor.compayProfile}}</div>
            <div class="address" v-if="sponsor.companyAddress">{{sponsor.companyAddress}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="activities-box" v-if="list.length">
      <div class="title">活动列表</div>
      <div class="list">
        <div v-for="(item, idx) in list" :key="idx">
          <active-card :isButton="isBtn" :item="item"></active-card>
        </div>
      </div>
    </div>
    <div class="activities-box" v-else>
      <i-load-more tip="暂无活动" :loading="false" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SponsorCard from 'components/sponsor-card'
import ActiveCard from 'components/active-card'

export default {
  components: {
    SponsorCard,
    ActiveCard
  },
  data () {
    return {
      isBtn: true,
      sponsor: {},
      list: []
    }
  },
  computed: {
  },
  onShow () {
    this.fetchSponsorDetail({organizationId: this.$mp.query.id}).then(({success, data, msg}) => {
      if (success) {
        this.sponsor = data.sponsor
        this.list = data.list
      } else {
        wx.showTast({
          icon: 'none',
          title: msg
        })
      }
    })
  },
  methods: {
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
    ...mapActions(['fetchSponsorDetail', 'toggleSponsor'])
  }
}
</script>

<style lang="scss">
.sponsor-detail {
  .sponsor-info {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    .widget {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 10rpx;
      background-size: cover;
      overflow: hidden;
      padding: 10px;
      box-sizing: border-box;
    }
    .box {
      position: relative;
      display: flex;
      .thumb {
        flex: 200rpx 0 0;
        display: flex;
        align-items: center;
        .avatar {
          display: block;
          width: 160rpx;
          height: 160rpx;
          border-radius: 50%;
          overflow: hidden;
        }
      }
      .meta {
        flex: 1 0 0;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .name {
          height: auto;
          font-size: 14px;
          color: #333;
          .type {
            margin-top: 10rpx;
            display: block;
            font-size: 12px;
            color: #666;
            line-height: 16px;
          }
        }
        .desc,
        .address {
          height: auto;
          word-wrap: break-word;
          text-justify: inter-word;
          margin-top: 20rpx;
          font-size: 12px;
          color: #666666;
          text-align: left;
        }
        .desc {
          flex: 1 0 0;
        }
      }
    }
    .btn-wrapper {
      text-align: left;
      margin-top: 5px;
      .btn {
        display: inline-block;
        width: auto;
        .btn-sponsor {
          display: inline-block;
          font-size: 12px;
          line-height: 22px;
          text-align: center;
          min-width: 150rpx;
          border: 1px solid rgb(139, 210, 70);
          border-radius: 5px;
          &.add-sponsor {
            color: rgb(139, 210, 70);
            border-color: rgb(139, 210, 70);
          }
          &.cancel-sponsor {
            color: #3B99FB;
            border-color: #3B99FB;
          }
        }
      }
    }
  }
  .activities-box{
    position: absolute;
    top: 370rpx;
    bottom: 0;
    left: 0;
    width: 100vw;
    > .title {
      font-size: 14px;
      line-height: 18px;
      color: #333;
      margin-left: 15px;
      padding-left: 20rpx;
      position: relative;
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
      position: absolute;
      left: 0;
      top: 15px;
      bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;
      width: 100%;
      box-sizing: border-box;
      padding: 15px;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }
}
</style>

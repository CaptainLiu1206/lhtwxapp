<template>
  <div class="active-detail container">
    <div class="active-info scrollbar-hide">
      <div class="top">
        <img class="active-img" :src="active.imgUrl" alt="">
        <div class="info">
          <p class="title">{{active.title}}</p>
          <p class="date ellipsis">{{active.time}}</p>
          <p class="address ellipsis">{{active.address}}</p>
        </div>
      </div>
      <div class="mid">
        <attention-item v-for="sponsor in active.sponsors" :key="`sponsor_${sponsor.id}`" :isBtn="isBtn" :attention="sponsor">
          <img class="collect-icon" src="../../assets/img/collected.png" alt="">
        </attention-item>
      </div>
      <div class="bottom">
        <div class="title">活动详情</div>
        <div class="list">
          <div class="cell">
            <label class="label">大会主题：</label>
            <span class="text">{{active.theme}}</span>
          </div>
          <div class="cell">
            <label class="label">主办方：</label>
            <span class="text">{{sponsors}}</span>
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
          <div class="cell">
            <label class="label">大会赞助/合作接洽微信：</label>
            <span class="text">{{active.contact}}</span>
          </div>
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
import AttentionItem from '../../components/attention-item'

export default {
  data () {
    return {
      active: {
        id: '',
        title: '揭秘社保税改后的三类应对方法',
        theme: '2018产品经理大会 创新·增长·链接',
        price: 199,
        imgUrl: 'http://edustor.zhaopin.com/courseimage/1538980970608社保税管750-420.jpg',
        time: '2018年12月23日 8:00 - 2018年12月23日 10:00',
        address: '北京朝阳区首开广场',
        contact: 'dora969',
        scale: '1000人',
        sponsors: [
          { id: 1, title: '北京马拉松比赛1', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
          { id: 2, title: '北京马拉松比赛2', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' },
          { id: 3, title: '北京马拉松比赛3', desc: '额了去忘记了我进去了就完全理解额为了钱饿我去可', address: '北京东城区', thumb: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546529283550&di=addce014fe03d139f9b16d5c92692115&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201503%2F29%2F20150329202148_jasit.jpeg' }
        ]
      },
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
  methods: {
    toBuy () {
      wx.navigateTo({
        url: `../payment/main?id=${this.active.id}`
      })
    }
  },
  onShow () {
    this.active.id = parseInt(this.$mp.query.id)
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
      background-color: #fff;
      margin-bottom: 40rpx;
      padding-bottom: 20rpx;
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

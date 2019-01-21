<template>
  <div class="authorization" v-if="isShow">
    <div class="wrapper">
      <button class="btn-aut" open-type="getUserInfo" @getuserinfo="bindgetuserinfo" @click="getUserInfo">微信授权登录</button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: '',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    bindgetuserinfo (res) {
      const { encryptedData, iv } = res.mp.detail
      this.updLoginInfoFn(encryptedData, iv)
    },
    getUserInfo () {
      let _this = this
      wx.getUserInfo({
        withCredentials: true,
        success (res) {
          const { encryptedData, iv } = res
          _this.updLoginInfoFn(encryptedData, iv)
        }
      })
    },
    updLoginInfoFn (encryptedData, iv) {
      this.updLoginInfo({encryptedData, iv, session_key: this.userInfo.session_key}).then(res => {
        console.log(`updLoginInfo ${res ? 'success' : 'fail'}`)
      })
    },
    ...mapMutations(['setUser']),
    ...mapActions(['updLoginInfo'])
  }
}
</script>
<style lang="scss">
.authorization {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 111;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  .wrapper {
    width: 500rpx;
    height: 300rpx;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rpx;
    background: #fff;
    .btn-aut {
      width: 300rpx;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 28rpx;
      color: #ffffff;
      background-color: #3B99FB;
    }
  }
}
</style>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  created () {
    let _this = this
    wx.getSystemInfo({
      success (res) {
        _this.setIsIphoneX(res.model.indexOf('iPhone X') !== -1)
      }
    })
    this.login()
  },
  methods: {
    ...mapActions(['login']),
    ...mapMutations(['setIsIphoneX'])
  }
}
</script>

<style lang="scss">
@import './assets/font/iconfont.css';

.scrollbar-hide {
  &::-webkit-scrollbar {
    width: 0;
  }
  -webkit-overflow-scrolling: touch;
}
.container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  @extend .scrollbar-hide;
  background-color: #f4f4f4;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

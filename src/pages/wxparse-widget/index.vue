<template>
  <div class="wxparse-widget">
    <wxParse :content="content" />
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    wxParse
  },
  data () {
    return {
      content: ''
    }
  },
  onShow () {
    this.content = wx.getStorageSync('wxparsecontent')
  },
  onUnload () {
    wx.removeStorageSync('wxparsecontent')
  }
}
</script>

<style lang="scss">
@import url("~mpvue-wxparse/src/wxParse.css");
.wxparse-widget {
  width: 100%;
  min-height: 100vh;
  padding: 15px;
  box-sizing: border-box;
}
</style>

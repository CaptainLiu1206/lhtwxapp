<template>
  <div class="web-view">
    <web-view :src="linkurl"></web-view>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      linkurl: ''
    }
  },
  onShow () {
    this.linkurl = this.$mp.query.linkurl
  },
  onUnload () {
    this.linkurl = ''
  }
}
</script>

<style lang="scss">
</style>

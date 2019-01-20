<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.login()
  },
  methods: {
    ...mapActions(['login'])
  }
}
</script>

<style lang="scss">
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

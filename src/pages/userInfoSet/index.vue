<template>
  <div class="user">
    <div class="form">
      <div class="form-cell">
        <label class="label">姓名</label>
        <div class="input-block">
          <input type="text" v-model="userInfo.realname" focus placeholder="请输入名字">
        </div>
      </div>
      <div class="form-cell">
        <label class="label">性别</label>
        <div class="input-block">
          <input type="text" disabled v-model="userInfo.gender" placeholder="请选择性别" @click="sexActionSheetVisible=true">
          <i-action-sheet :visible="sexActionSheetVisible" :actions="sexActions" show-cancel @cancel="handlerSexSelectCancel" @change="handlerSexSelected"></i-action-sheet>
        </div>
      </div>
      <div class="form-cell">
        <label class="label">手机号</label>
        <div class="input-block">
          <input type="number" v-model="userInfo.phone" focus placeholder="请输入手机号">
        </div>
      </div>
      <div class="form-cell">
        <label class="label">邮箱</label>
        <div class="input-block">
          <input type="text" v-model="userInfo.email" placeholder="请输入邮箱">
        </div>
      </div>
      <div class="form-cell">
        <label class="label">公司</label>
        <div class="input-block">
          <input type="text" v-model="userInfo.companyName" placeholder="请输入公司名称">
        </div>
      </div>
      <div class="form-cell">
        <label class="label">地址</label>
        <div class="input-block">
          <input type="text" v-model="userInfo.companyPosition" placeholder="请输入详细地址">
        </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="btn" hover-class="btn-hover" @click="onSave">保存</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {},
  data () {
    return {
      userInfo: {
        realname: '',
        gender: '',
        phone: '',
        email: '',
        companyPosition: '',
        companyName: ''
      },
      sexActionSheetVisible: false,
      sexActions: [
        { name: '男' },
        { name: '女' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'userInfo'
    })
  },
  methods: {
    handlerSexSelectCancel () {
      this.sexActionSheetVisible = false
    },
    handlerSexSelected (e) {
      this.userInfo.gender = this.sexActions[e.mp.detail.index].name
      this.handlerSexSelectCancel()
    },
    onSave () {
      this.postUserInfo(this.userInfo).then(({success}) => {
        if (success) {
          wx.showToast({
            title: '保存成功'
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../user/main'
            })
          }, 500)
        }
      })
    },
    ...mapActions(['postUserInfo'])
  },
  onShow () {
    Object.keys(this.userInfo).forEach(key => {
      this.userInfo[key] = this.user[key]
    })
  },
  created () {}
}
</script>

<style lang="scss">
@import '~assets/scss/filed.scss';

.user {
  width: 100vw;
  height: 100vh;
  position: relative;
  .form {
    padding-left: 30rpx;
  }
  .btn-wrapper {
    margin-top: 60rpx;
    padding: 0 30rpx;
    .btn {
      background-color: rgb(1, 132, 214);
      color: #ffffff;
      font-size: 16px;
      transition: all 0.3s;
      &.btn-hover {
        opacity: 0.8;
      }
    }
  }
}
</style>

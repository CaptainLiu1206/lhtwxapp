<template>
  <div class="add-registration container">
    <div class="form">
      <div class="form-cell required">
        <label class="label">用户名</label>
        <div class="input-block">
          <input type="text" v-model="registration.realname" focus placeholder="请输入用户名">
        </div>
      </div>
      <div class="form-cell required">
        <label class="label">手机号</label>
        <div class="input-block">
          <input type="number" v-model="registration.phone" placeholder="请输入手机号">
        </div>
      </div>
      <div class="form-cell required">
        <label class="label">邮箱</label>
        <div class="input-block">
          <input type="text" v-model="registration.email" placeholder="请输入邮箱">
        </div>
      </div>
      <div class="form-cell">
        <label class="label">公司</label>
        <div class="input-block">
          <input type="text" v-model="registration.companyName" placeholder="请输入公司名称">
        </div>
      </div>
      <div class="form-cell">
        <label class="label">职位</label>
        <div class="input-block">
          <input type="text" v-model="registration.position" placeholder="请输入职位名称">
        </div>
      </div>
      <div class="form-cell">
        <label class="label">备注</label>
        <div class="input-block">
          <textarea name="" id="" rows="2" :auto-height="true" v-model="registration.remark" placeholder="请输入备注信息"></textarea>
        </div>
      </div>
    </div>
    <div class="btn-wrapper">
      <button class="btn" hover-class="btn-hover" @click="onSave">保存</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  components: {},
  data () {
    return {
      registration: {
        realname: '',
        phone: '',
        email: '',
        companyName: '',
        position: '',
        remark: ''
      }
    }
  },
  methods: {
    onSave () {
      const registration = this.registration
      let realname = registration.realname.trim()
      let phone = registration.phone.trim()
      let email = registration.email.trim()
      if (!realname || !phone || !email) {
        wx.showToast({
          icon: 'none',
          title: '请完善报名信息'
        })
        return false
      }

      const phoneReg = /^1[3456789]\d{9}$/
      if (!phoneReg.test(phone)) {
        wx.showToast({
          icon: 'none',
          title: '请填写正确的手机号'
        })
        return false
      }
      const emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (!emailReg.test(email)) {
        wx.showToast({
          icon: 'none',
          title: '请填写正确的邮箱'
        })
        return false
      }

      this.setRegistration({
        realname,
        phone,
        email,
        companyName: registration.companyName.trim(),
        position: registration.position.trim(),
        remark: registration.remark.trim()
      })
      wx.navigateBack({
        delta: 1
      })
    },
    ...mapMutations(['setRegistration'])
  },
  onShow () {
    this.registration = {...this.$store.state.registration}
  },
  created () {
  }
}
</script>

<style lang="scss">
@import '~assets/scss/filed.scss';

.add-registration {
  background-color: #fff;
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

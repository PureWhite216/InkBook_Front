<template>
  <div class="login-container">
    <div
      ref="loginWrapper"
      class="login-bg-wrapper"
    >
      <img :src="$isMobile ? ImageMobileBg1 : ImageBg1" />
    </div>
    <div class="flex form-wrapper">
      <div class="left"></div>
      <div class="right">
        <div class="my-width flex-sub flex justify-center align-center">
          <div class="title margin-left">忘记密码</div>
        </div>
        <el-form :model="form" class="form-container">
          <div class="item-wrapper">
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱"
              prefix-icon="el-icon-user"
              clearable
            />
          </div>
          <div class="margin-top-lg">
            <el-button
              class="login"
              @click="identifier_send"
            >
              发送验证码
            </el-button>
          </div>
          <div class="item-wrapper margin-top-lg">
            <el-input
              v-model="form.verify_code"
              placeholder="请输入验证码"
              type="password"
              clearable
              prefix-icon="el-icon-lock"
            />
          </div>
          <div class="item-wrapper margin-top-lg">
            <el-input
              v-model="form.password1"
              placeholder="请输入密码"
              type="password"
              clearable
              prefix-icon="el-icon-lock"
            />
          </div>
          <div class="item-wrapper margin-top-lg">
            <el-input
              v-model="form.password2"
              placeholder="请确认密码"
              type="password"
              clearable
              prefix-icon="el-icon-lock"
            />
          </div>
          <div class="flex-sub"></div>
          <div class="margin-top-lg">
            <el-button
              class="login"
              @click="change"
            >
              确定
            </el-button>
          </div>
          <div class="margin-top-rg">
            <el-button
              type="info"
              class="login"
              @click="back"
            >
              返回
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="login-footer-wrapper">
      <PageFooter />
    </div>
  </div>
</template>

<script>
import ImageBg1 from '@/assets/img_login_bg_01.jpg'
import ImageMobileBg1 from '@/assets/img_login_mobile_bg_01.jpg'
import PageFooter from '@/layouts/footer'
import 'vaw-verify/lib/vaw-verify.css'
import qs from 'qs'
export default {
  name: 'Forget',
  components: { PageFooter },
  data() {
    return {
      form: {
        mode: 0,
        email: '',
        verify_code: '',
        password1: '',
        password2: ''
      },
      ImageBg1,
      ImageMobileBg1,
      redirect: '',
      defaultTheme: this.$layoutStore.state.theme
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$layoutStore.changeTheme('light')
  },
  destroyed() {
    this.$layoutStore.changeTheme(this.defaultTheme)
  },
  methods: {
    change() {
      if (!this.form.email) {
        this.$errorMsg('请输入邮箱')
        return
      }
      if (!this.form.verify_code) {
        this.$errorMsg('请输入验证码')
        return
      }
      if (!this.form.password1) {
        this.$errorMsg('请输入密码')
        return
      }
      if (!this.form.password2) {
        this.$errorMsg('请确认密码')
        return
      }
      this.$axios.post(
        '/user/changePassword',
        qs.stringify(this.form)
      )
        .then((res) => {
          if (res.data.success === true) {
            this.$message.success(res.data.message)
            this.$router.push({ path: '/login' })
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    identifier_send() {
      if (!this.form.email) {
        this.$errorMsg('请输入邮箱')
        return
      }
      this.$axios.post(
        '/user/sendForgotPasswordEmail',
        qs.stringify({ email: this.form.email })
      )
        .then((res) => {
          if (res.data.success === true) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    back() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .login-bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .logo-wrapper {
    & img {
      width: 50px;
    }
    & img::after {
      content: "欢迎来到墨书";
    }
  }
  .login-footer-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    ::v-deep {
      .el-card {
        background-color: transparent;
      }
    }
  }
  .form-wrapper {
    position: absolute;
    top: 18.5%;
    left: 0;
    right: 0;
    bottom: 15.8%;
    @media screen and (max-width: 768px) {
      .left {
        display: none;
      }
      .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 80%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #34495e;
          text-shadow: 0 0 0.2em #41b883, -0 -0 0.2em #41b883;
        }
        .form-container {
          width: 80%;
          min-height: 60%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 992px) {
      .left {
        display: none;
      }
      .right {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #d9d9d9;
        }
        .form-container {
          width: 50%;
          height: 70%;
          margin-bottom: 10%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 992px) {
      .left {
        display: block;
        flex: 1;
      }
      .right {
        margin-left: 10%;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #d9d9d9;
        }
        .item-wrapper {
          width: 48%;
        }
        .login {
          width: 48%;
        }
      }
    }
  }
}
</style>

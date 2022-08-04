<template>
  <div class="vaw-avatar-container">
    <el-dropdown trigger="hover" @command="onCommad">
      <div class="action-wrapper">
        <div class="avatar">
          <el-avatar :size="35" :src="personalInformation.avatar" />
        </div>
        <span class="nick-name el-dropdown-link">
          <!--          <span>{{ username }}</span>-->
          <i class="el-icon-arrow-down tip" style="color: white; margin-left: 5px"></i>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="personalCenter">
          个人中心
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command="logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import store from '../store/index'
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
export default {
  name: 'VAWAvatar',
  data() {
    return {
      personalInformation: {
        avatar: ''
      },
      avatar: getters.getAvatar(state),
      state: store.state
    }
  },
  computed: {
    ...mapGetters({
      username: 'user/getUserName'
    })
  },
  created() {
    this.getPersonalInformation()
  },
  methods: {
    getPersonalInformation() {
      this.loading = true
      this.$axios.get('/user/selectUserByUserId', {
        params: {
          user_id: getters.getUserId(state)
        }
      })
        .then((res) => {
          // console.log(5)
          if (res.data.success === true) {
            this.personalInformation.avatar = res.data.data.avatar
          }
          this.loading = false
        })
    },
    onCommad(command) {
      switch (command) {
        case 'personalCenter':
          this.onPersonalCenter()
          break
        case 'logout':
          this.onLogout()
          break
      }
    },
    onPersonalCenter() {
      store.toPersonalCenter && store.toPersonalCenter()
    },
    onLogout() {
      MessageBox.confirm('是否要退出登录？', '提示')
        .then(_ => {
          store.logout()
          store.onLogout && store.onLogout()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
.vaw-avatar-container {
  .action-wrapper {
    display: flex;
    align-items: center;
    .avatar {
      width: calc(#{$logoHeight} - 15px);
      height: calc(#{$logoHeight} - 15px);
      display: flex;
      align-items: center;
      & > img {
        border: 1px solid #f6f6f6;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10%;
      }
    }
  }
}
.vaw-avatar-container:hover {
  cursor: pointer;
}
.el-dropdown-menu {
  top: 40px !important;
}
</style>

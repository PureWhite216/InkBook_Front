<template>
  <div
    class="vaw-side-bar-wrapper"
    style="font-family: 等线"
    :class="[!state.isCollapse ? 'open-status' : 'close-status']"
  >
    <transition name="logo">
      <Logo v-if="showLogo" />
    </transition>
    <el-menu
      ref="elMenu1"
      class="el-menu-vertical-demo"
    >
      <el-menu-item index="1" style="font-size: 18px; font-family: 等线" @click="toRecent">
        <i class="el-icon-document" style="color: #3297ff; font-size: 22px"></i>
        <span slot="title">最近浏览</span>
      </el-menu-item>
      <el-menu-item index="2" style="font-size: 18px; font-family: 等线" @click="toCollect">
        <i class="el-icon-star-off" style="color: #ffc226; font-size: 22px"></i>
        <span slot="title">收藏</span>
      </el-menu-item>
    </el-menu>
    <el-divider class="line" />
    <el-button
      class="button-create"
      @click="createTeamStep = 0,form_createTeam.teamName = '',form_createTeam.teamInfo='', dialogCreateTeamVisible = true"
    >创建团队
      <i class="el-icon-plus" style="margin-left: 40px"></i>
    </el-button>
    <el-divider class="line" />
    <el-button
      class="button-create"
      @click="toGroup()"
    >切换团队
      <i class="el-icon-right" style="margin-left: 40px"></i>
    </el-button>
    <div class="text-grey">最近查看的团队</div>
    <el-menu
      v-for="(item,index) in recentTeamList"
      :key="index"
      ref="elMenu2"
      style="margin-top: 0px; height: 45px"
      class="el-menu-vertical-demo"
    >
      <el-menu-item @click="toGroupFile(item)">
        <i class="el-icon-right"></i>
        <span slot="title">{{ item.team_name }}</span>
      </el-menu-item>
    </el-menu>
    <div class="mobile-shadow"></div>
    <div>
      <el-dialog
        title="创建团队"
        :visible.sync="dialogCreateTeamVisible"
        width="35%"
        append-to-body="“true”"
        style="font-family: 等线"
        :before-close="handleClose"
      >
        <el-steps :active="createTeamStep" finish-status="success">
          <el-step title="步骤 1" />
          <el-step title="步骤 2" />
          <el-step title="步骤 3" />
        </el-steps>
        <div v-if="createTeamStep === 0">
          <el-input v-model="form_createTeam.teamName" size="medium" placeholder="请输入团队名" />
          <el-button style="margin-top: 12px; margin-left: auto" @click="createTeamNext">下一步</el-button>
        </div>

        <div v-if="createTeamStep === 1">
          <el-input v-model="form_createTeam.teamInfo" size="medium" placeholder="请输入团队描述" />
          <el-button style="margin-top: 12px;" @click="createTeamNext">下一步</el-button>
        </div>

        <div v-if="createTeamStep === 2">
          <h3> </h3>
          <h3> </h3>
          <el-button style="margin-top: 12px;" @click="dialogCreateTeamVisible = false,createTeamStep = 0, createTeam()">完成创建</el-button>
        </div>
        <!-- <el-button style="margin-top: 12px;" @click="createTeamNext">下一步</el-button> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import store from '../store/index'
import router from '@/router'
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'

export default {
  name: 'SideBar',
  props: {
    showLogo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      state: store.state,
      dialogCreateTeamVisible: false,
      createTeamStep: 0,
      form_createTeam: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamName: '',
        teamInfo: ''
      },
      recentTeamList: []
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.hiddenSiderbar) {
        this.hiddenSiderbar = true
      } else {
        this.hiddenSiderbar = false
      }
    }
  },
  mounted() {
    // 隐藏侧边栏
    if (this.$route.meta.hiddenSiderbar) {
      this.hiddenSiderbar = true
    } else {
      this.hiddenSiderbar = false
    }
  },
  created() {
    this.getRecentTeam()
  },
  methods: {
    getRecentTeam() {
      this.recentTeamList = []
      this.$axios.get('/team/getRecentViewList', {
              params: {
                token: getters.getToken(state)
              }
            })
            .then(res => {
              if (res.data.success) {
                for (let i = 0; i < res.data.data.length; i++) {
                  const teams = {
                    team_id: null,
                    team_name: null,
                    team_info: null
                  }
                  teams.team_name = res.data.data[i].team_name
                  teams.team_info = res.data.data[i].team_info
                  teams.team_id = res.data.data[i].team_id
                  let flag = 0
                  for (let i = 0; i < this.recentTeamList.length; i++) {
                    if (this.recentTeamList[i].team_id === teams.team_id) {
                      flag = 1
                      break
                    }
                  }
                  if (!flag) { this.recentTeamList.push(teams) }
              // this.$message.success(res.data.message)
            }
              } else {
                this.$message.error(res.data.message)
              }
            })
    },
    toGroupFile(item) {
      localStorage.setItem('team_id', item.team_id)
      localStorage.setItem('team_name', item.team_name)
      localStorage.setItem('team_info', item.team_info)
      this.$refs.elMenu1.activeIndex = null
      this.$router.push('/redirect' + '/list/table-group-message')
    },
    toGroup() {
      router.push('/list/table-group')
      this.$refs.elMenu1.activeIndex = null
      this.$refs.elMenu2.activeIndex = null
    },
    toRecent() {
      this.$refs.elMenu2.activeIndex = null
      router.push('/list/table-recentvisit')
    },
    toCollect() {
      // this.$refs.elMenu2.activeIndex = null
      router.push('/list/table-favorite')
    },
    toRecover() {
      router.push('/list/table-recover')
    },
    createTeamNext() {
      if (this.createTeamStep < 3) this.createTeamStep++
    },
    createTeam() {
      this.$axios.post('/team/create', qs.stringify(this.form_createTeam))
         .then((res) => {
           if (res.data.success) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
          this.refresh()
         })
    },
    refresh() {
      this.$router.replace({
        path: '/redirect' + this.$route.path
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
.text-grey {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 14px;
  color: #6c6c6c;
  font-family: 等线,serif;
}
.button-create {
  width: 210px;
  border: none;
  background-color: #ffffff;
  color: #000000;
  font-size: 20px;
  text-align: left;
  font-family: 等线,serif;
}
.line {
  //width: 80px;
  height: 1px;
  margin: 5px 5px;
  transition: all $transitionTime;
}
.vertical-line {
  position: absolute;
  height: 800px;
  width: 3px;
  margin-left: 0px;
  z-index: 999;
}
.open-status {
  width: $menuWidth;
  //box-shadow: 2px 5px 5px rgb(202, 202, 202, 0.8);
  transition: all $transitionTime;
}
.close-status {
  width: $minMenuWidth;
  box-shadow: none;
  transition: all $transitionTime;
}
.vaw-side-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  height: 100%;
  box-sizing: border-box;
  //z-index: 999;
  .vaw-menu-wrapper {
    overflow-x: hidden;
    color: white;
  }
  .scrollbar {
    height: calc(100% - #{$logoHeight}) !important;
  }
}
.is-mobile {
  .open-status {
    width: $menuWidth;
    transform: translateX(0);
    transition: transform $transitionTime;
  }
  .close-status {
    width: $menuWidth;
    transform: translateX(-$menuWidth);
    transition: transform $transitionTime;
    box-shadow: none;
  }
}
</style>
<style lang="scss">
@import "../../assets/styles/variables.scss";
.scrollbar-wrap-class {
  overflow-x: hidden !important;
}
.el-menu {
  overflow: hidden !important;
  border-right: none !important;
}
::v-deep {
  .el-menu--collapse .el-submenu__title span {
    display: none !important;
  }
  .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none !important;
  }
}
</style>

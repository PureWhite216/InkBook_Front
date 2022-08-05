<template>
  <div class="main-container" style="position:fixed;">
    <TableHeader :can-collapsed="false">
      <template slot="left">
        <p id="projectName" class="projecttitle">
          最近浏览
        </p>
      </template>
    </TableHeader>

    <TableBody ref="tableBody" class="temptablebody">
      <template>
        <el-tabs :tab-position="top" style="height: 200px;" class="messagecss">
          <el-tab-pane>
            <span slot="label" class="fontClass" style="font-size: large; color: #2c2c2c">文档</span>
            <el-table
              ref="table"
              v-loading="tableloading"
              class="table-custom"
              :data="docList"
              :header-cell-style="tableConfig.headerCellStyle"
              :size="tableConfig.size"
              :cell-style="tableConfig.cellStyle"
              @row-dblclick="toDocEditor"
            >
              <el-table-column
                align="center"
                label="名称"
                prop="doc_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="所属团队"
                prop="team_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="所属项目"
                prop="project_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="更新时间"
                prop="last_edit_time"
                width="200px"
              />
              <el-table-column
                align="center"
                label="创建者"
                prop="creator_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-dropdown trigger="click" @command="onCommad">
                    <div class="action-wrapper">
                      <span class="nick-name el-dropdown-link">
                        <i class="el-icon-more"></i>
                      </span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                        <el-button type="text">重命名</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-switch-button" command="logout">
                        <el-button type="text">删除文件</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="fontClass" style="font-size: large; color: #2c2c2c">原型</span>
            <el-table
              ref="table"
              v-loading="loading"
              class="table-custom"
              :data="axureList"
              :header-cell-style="tableConfig.headerCellStyle"
              :size="tableConfig.size"
              :cell-style="tableConfig.cellStyle"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                align="center"
                label="名称"
                prop="axure_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="所属团队"
                prop="team_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="所属项目"
                prop="project_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="更新时间"
                prop="last_edit"
                width="200px"
              />
              <el-table-column
                align="center"
                label="创建者"
                prop="create_user"
                width="200px"
              />
              <el-table-column
                align="center"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-dropdown trigger="click" @command="onCommad">
                    <div class="action-wrapper">
                      <span class="nick-name el-dropdown-link">
                        <i class="el-icon-more"></i>
                      </span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                        <el-button type="text">重命名</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-switch-button" command="logout">
                        <el-button type="text">删除文件</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </TableBody>

    <!--    <TableFooter-->
    <!--      :page-size="pageModel.pageSize"-->
    <!--      :total-size="pageModel.totalSize"-->
    <!--      @pageSizeChanged="pageSizeChanged"-->
    <!--      @currentChanged="currentChanged"-->
    <!--      @onRefresh="doRefresh"-->
    <!--    />-->
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'
import {
  GetDataMixin,
  AddItemMixin,
  DeleteItemsMixin,
  UpdateItemMixin,
  RefreshActionMixin
} from '@/mixins/ActionMixin'
import SingleUpload from '@/components/common/SingleUpload.vue'
import BaseForm from '@/components/common/BaseForm.vue'
import draggable from '@/directive/draggable'
import store from '@/layouts/store'
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
export default {
  name: 'TableGroupMember',
  // eslint-disable-next-line vue/no-unused-components
  components: { SingleUpload, BaseForm },
  directives: { draggable },
  mixins: [
    TableMixin,
    PageModelMixin,
    GetDataMixin,
    AddItemMixin,
    DeleteItemsMixin,
    UpdateItemMixin,
    RefreshActionMixin
  ],
  data() {
    return {
      visible_setPerm: true,
      loading: false,
      form_getAxureList: {
        token: getters.getToken(state)
      },
      form_member: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id'))
      },
      visible: false,
      form_invite: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        send_id: getters.getUserId(state),
        accept_id: null,
        team_id: Number(localStorage.getItem('team_id')),
        power: null
      },
      form_project: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        project_name: '',
        team_id: Number(localStorage.getItem('team_id'))
      },
      form_deleteMember: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id')),
        deleted_id: null
      },
      form_quitTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id'))
      },
      form_setPerm: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id')),
        member_id: 0,
        perm: null
      },
      project_name: localStorage.getItem('project_name'),
      team_name: localStorage.getItem('team_name'),
      dialogInviteVisible: false,
      dialogProjectVisible: false,
      dialogMethodVisible: false,
      memberList: [],
      deleteMemberList: [],
      docList: [],
      axureList: [],
      powerOptions: [
        {
          value: 1,
          label: '队长'
        },
        {
          value: 2,
          label: '开发者'
        },
        {
          value: 3,
          label: '观察者'
        }
      ],
      userModel: {
        address: '',
        avatar: '',
        gender: 1,
        id: 1,
        lastLoginIp: '',
        lastLoginTime: '',
        nickName: '',
        status: 0,
        vip: 1
      }
    }
  },
  created() {
    this.getDocList()
    this.getAxureList()
  },
  methods: {
    toDocEditor(val) {
      localStorage.setItem('doc_id', val.doc_id)
      localStorage.setItem('doc_name', val.doc_name)
      localStorage.setItem('is_favorite', val.is_favorite)
      this.$axios.get('/doc/getDocInfo', {
        params: {
          token: getters.getToken(state),
          doc_id: localStorage.getItem('doc_id')
        }
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('doc_content', res.data.data.doc_content)
        } else {
          this.$message.error(res.data.message)
        }
      })
      this.$router.push('/editor/rich-text')
    },
    getAxureList() {
      this.loading = true
      this.axureList = []
      this.$axios.post('/axure/getRecentViewList', qs.stringify(this.form_getAxureList))
        .then((res) => {
          if (res.data.success) {
            for (let i = 0; i < res.data.data.length; i++) {
              const axures = {
                axure_info: null,
                axure_id: null,
                project_id: null,
                axure_name: null,
                title: null,
                config: null,
                items: null,
                last_edit: null,
                create_user: null,
                team_name: null,
                project_name: null
              }
              axures.axure_info = res.data.data[i].axure_info
              axures.axure_id = res.data.data[i].axure_id
              axures.project_id = res.data.data[i].project_id
              axures.axure_name = res.data.data[i].axure_name
              axures.title = res.data.data[i].title
              axures.config = res.data.data[i].config
              axures.items = res.data.data[i].items
              axures.last_edit = res.data.data[i].last_edit
              axures.create_user = res.data.data[i].create_user
              axures.team_name = res.data.data[i].team_name
              axures.project_name = res.data.data[i].project_name
              let flag = 0
              for (let i = 0; i < this.axureList.length; i++) {
                if (this.axureList[i].axure_id === axures.axure_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.axureList.push(axures) }
              // this.$message.success(res.data.message)
            }
          } else {
             // this.$message.error(res.data.message)
          }
           this.loading = false
         })
    },
    getDocList() {
      this.docList = []
      this.$axios.get('/user/recentlyViewedList', {
              params: {
                token: getters.getToken(state)
              }
            })
            .then(res => {
              if (res.data.success) {
                for (let i = 0; i < res.data.data.length; i++) {
              const docs = {
                doc_name: null,
                last_edit_time: null,
                project_id: null,
                doc_description: null,
                creator_id: null,
                doc_content: null,
                creator_name: null,
                doc_id: null,
                team_name: null,
                project_name: null,
                create_user: null
              }
              docs.doc_name = res.data.data[i].doc_name
              docs.last_edit_time = res.data.data[i].last_edit_time
              docs.project_id = res.data.data[i].project_id
              docs.doc_description = res.data.data[i].doc_description
              docs.creator_id = res.data.data[i].creator_id
              docs.doc_content = res.data.data[i].doc_content
              docs.creator_name = res.data.data[i].creator_name
              docs.doc_id = res.data.data[i].doc_id
              docs.team_name = res.data.data[i].team_name
              docs.project_name = res.data.data[i].project_name
              docs.create_user = res.data.data[i].create_user
              let flag = 0
              for (let i = 0; i < this.docList.length; i++) {
                if (this.docList[i].doc_id === docs.doc_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.docList.push(docs) }
              // this.$message.success(res.data.message)
            }
              } else {
                this.$message.error(res.data.message)
              }
            })
    },
    CreateProject() {
      this.$message.error('还没写接口哪！')
    },
    setPerm(item) {
      this.form_setPerm.member_id = item.id
      this.$axios.post('/team/set_perm', qs.stringify(this.form_setPerm))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 7) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getMemberList()
        })
    },
    deleteItem(item) {
      if (item.id === this.form_deleteMember.user_id) {
        this.$confirm('此操作将使您退出此团队' + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.quitTeam()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$confirm('此操作将踢出用户成员' + item.username + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.deleteMember(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    handleSelectionChange(items) {
      this.deleteMemberList = items
    },
    deleteMultiItem() {
      this.$confirm('此操作将踢出您选中的所有成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.deleteMemberList.length; i++) {
          this.deleteMember(this.deleteMemberList[i])
        }
        this.getMemberList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消踢出'
          })
        })
    },
    deleteMember(item) {
      this.form_deleteMember.deleted_id = item.id
      // console.log(item.id)
      this.$axios.post('/team/delete_member', qs.stringify(this.form_deleteMember))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getMemberList()
        })
    },
    quitTeam() {
      this.$axios.post('/team/quit_team', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.onGroupSpace()
        })
    },
    onGroupSpace() {
      store.toGroupSpace && store.toGroupSpace()
    },
    clearList() {
      this.memberList = []
    },
    onFile() {
      this.$router.push('/list/table-group-file')
    },
    getMemberList() {
      this.loading = true
      this.clearList()
      this.$axios.post('/team/get_team_member_list', qs.stringify(this.form_member))
        .then((res) => {
          if (res.data.result === 4) {
            for (let i = 0; i < res.data.team_member_list.length; i++) {
              const members = {
                sno: 0,
                id: 0,
                username: '',
                email: '',
                power: ''
              }
              members.sno = i + 1
              members.id = res.data.team_member_list[i].id
              members.username = res.data.team_member_list[i].username
              members.email = res.data.team_member_list[i].email
              if (res.data.team_member_list[i].power === 1) {
                members.power = '队长'
              } else if (res.data.team_member_list[i].power === 2) {
                members.power = '开发者'
              } else if (res.data.team_member_list[i].power === 3) {
                members.power = '观察者'
              }
              let flag = 0
              for (let i = 0; i < this.memberList.length; i++) {
                if (this.memberList[i].id === members.id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.memberList.push(members) }
              // this.$message.success(res.data.message)
            }
          } else {
             this.$message.error(res.data.message)
          }
           this.loading = false
         })
    },
    invite() {
      this.$axios.post('/team/invite_member', qs.stringify(this.form_invite))
         .then((res) => {
           if (res.data.result === 6) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
    onRichTextEditor() {
      store.toRichTextEditor && store.toRichTextEditor()
    },
    onChooseTemplate() {
      store.toChooseTemplate && store.toChooseTemplate()
    },
    onSingleSuccess({ res }) {
      if (res.status !== 200) {
        this.$errorMsg(res.msg)
      } else {
        this.userModel = res.obj
      }
    },
    beforeUpload(file) {
      const size = file.size
      if (size / 1024 > 500) {
        this.$errorMsg('上传文件最大不能超过500K')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#building{
    background:url("../../assets/bg.jpg");
    width:100%;			//大小设置为100%
    height:100%;			//大小设置为100%
    position:fixed;
    background-size:100% 100%;
}
.button-style {
  margin: 10px;
  font-size: 14px;
  font-weight: bold;
  color: black;
  height: 35px;
}
.spcbutton-style {
  margin: 20px;
  font-size: 14px;
  font-weight: bold;
  color: black;
  height: 35px;
}
.projecttitle {
  font-size: 45px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.teamtitle {
  font-size: 16px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.temptablebody{
  height: 500px;
  width: 100%;
  float: left;
}
.messagecss{
  width: 1150px;
  margin: 10px;
  //background-color: rgba(255, 255, 255, 0);
}
.rightside{
  float: right;
  width: 23%;
  margin: 10px;
  height: 500px;
}
.rightsidefont{
  font-size: 25px;
  margin: 10px;
}
</style>

<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="left">
        <p id="projectName" class="projecttitle">
          加入的团队
        </p>
      </template>
    </TableHeader>
    <el-dialog title="创建团队" :visible.sync="dialogFormVisible">
      <el-form :model="form2">
        <el-form-item label="团队名称" :label-width="formLabelWidth">
          <el-input v-model="form2.team_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false; form2.team_name = '' ">取 消</el-button>
        <el-button @click="addTeam">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改团队信息" :visible.sync="dialogUpdateTeam">
      <el-form :model="form_update">
        <el-form-item label="团队新名称" :label-width="formLabelWidth">
          <el-input v-model="form_update.teamName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="团队新简介(可不填)" :label-width="formLabelWidth">
          <el-input v-model="form_update.teamInfo" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateTeam = false; form_update.project_name = '' ">取 消</el-button>
        <el-button @click="updateTeam">确 定</el-button>
      </div>
    </el-dialog>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="groupList"
          :header-cell-style="tableConfig.headerCellStyle"
          :cell-style="tableConfig.cellStyle"
          :size="tableConfig.size"
          @row-dblclick="handleCurrentChange"
        >
          <el-table-column
            width="45"
          />
          <el-table-column
            align="center"
            label="团队名"
            prop="name"
            width="400"
          />
          <el-table-column
            align="center"
            label="团队信息"
            prop="info"
          />
          <el-table-column
            align="center"
            label="我的身份"
            prop="power"
          />
          <el-table-column
            align="center"
            label="操作"
            width="260"
          >
            <template slot-scope="scope">
              <el-button
                slot="reference"
                class="morebutton"
              ><el-dropdown trigger="click">
                <div class="action-wrapper" style="font-size: 16px ;font-weight: bold">
                  <i class="el-icon-more"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                    <el-button type="text" @click="form_update.teamId = scope.row.id, form_update.teamName = scope.row.name, form_update.teamInfo =scope.row.info, dialogUpdateTeam = true">修改信息</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-switch-button" command="logout">
                    <el-button type="text" style="color: red" @click="quitTeam(scope.row)">退出团队</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-delete-solid" command="logout">
                    <el-button type="text" style="color: red" @click="deleteTeam(scope.row)">解散团队</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
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
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import store from '@/layouts/store'
export default {
  name: 'TableGroup',
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
      visible_applyTeam: false,
      currentRow: null,
      form: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state)
      },
      dialogUpdateTeam: false,
      form_update: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: '',
        teamName: '',
        teamInfo: ''
      },
      form1: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: null,
        member_id: null
      },
      form_applyTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: null
      },
      groupList: [],
      tableLoading: false,
      dialogFormVisible: false,
      dialogVisible: false,
      form2: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_name: ''
      },
      form_disbandTeam: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: 0
      },
      form_getTeam: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: 0
      },
      form_quitTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        teamId: 0
      },
      disbandTeamList: [],
      formLabelWidth: '150px'
    }
  },
  created() {
    this.Refresh()
  },
  methods: {
    updateTeam() {
      this.$axios.post('/team/update', qs.stringify(this.form_update))
      .then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
        this.dialogUpdateTeam = false
        this.Refresh()
      })
    },
    handleCurrentChange(val) {
      this.toGroupFile(val)
    },
    deleteTeam(item) {
      this.$confirm('此操作将使您删除该团队' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.form_quitTeam.teamId = item.id
      this.$axios.post('/team/delete', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    quitTeam(item) {
      this.$confirm('此操作将使您退出该团队' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.form_quitTeam.teamId = item.id
      this.$axios.post('/team/quitTeam', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    applyTeam() {
      this.$axios.post('/team/apply_team', qs.stringify(this.form_applyTeam))
        .then((res) => {
          if (res.data.result === 4) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    Leader_change(item) {
      this.form1.team_id = item.id
      console.log(item.id)
      this.$axios.post('/team/move_team_leader_perm', qs.stringify(this.form1))
        .then((res) => {
          if (res.data.result === 6) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
        })
    },
    toGroupFile(item) {
      localStorage.setItem('team_id', item.id.toString())
      localStorage.setItem('team_name', item.name)
      localStorage.setItem('team_info', item.info)
      this.form_getTeam.teamId = item.id
      this.$axios.post('/team/getTeam', qs.stringify(this.form_getTeam))
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('prj_root_id', res.data.data[0].prj_root_id)
          console.log(res.data.data[0].prj_root_id)
        }
      })
      store.toGroupMessage && store.toGroupMessage()
    },
    addTeam() {
      this.$axios.post('/team/create_team', qs.stringify(this.form2))
        .then((res) => {
          if (res.data.result === 2) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
          this.dialogFormVisible = false
          this.form2.team_name = null
        })
    },
    handleSelectionChange(items) {
      this.disbandTeamList = items
    },
    deleteItem(item) {
      if (item.power === '超管') {
        this.$confirm('此操作将永久解散该团队, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.disbandTeam(item)
          // console.log(item.id)
          // this.$message({
          //   type: 'success',
          //   message: '解散成功!'
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: item.power === '超管' ? '已取消解散' : '已取消解散'
          })
        })
      } else {
        this.$confirm('此操作将退出该团队, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.quitTeam(item)
          // console.log(item.id)
          // this.$message({
          //   type: 'success',
          //   message: '解散成功!'
          // })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
      }
    },
    deleteMultiItem() {
      this.$confirm('此操作将永久解散/退出您选中的所有团队, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.disbandTeamList.length; i++) {
          if (this.disbandTeamList[i].power === '创建者') {
            this.disbandTeam(this.disbandTeamList[i])
          } else {
            this.quitTeam(this.disbandTeamList[i])
          }
        }
        this.Refresh()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解散/退出'
          })
        })
    },
    disbandTeam(item) {
      this.form_disbandTeam.teamId = item.id
      this.$axios.post('/team/delete', qs.stringify(this.form_disbandTeam))
        .then((res) => {
          // console.log(5)
          if (res.data.success === true) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
        })
    },
    Refresh() {
       this.tableLoading = true
       this.groupList = []
       this.$axios.post('/team/getTeamList', qs.stringify(this.form))
         .then((res) => {
           if (res.data.success === true) {
             for (let i = 0; i < res.data.data.length; i++) {
               const teams = {
                 name: '',
                 time: '',
                 member_num: 0,
                 word_num: 0,
                 power: '',
                 id: 0,
                 dialogVisible: false
                }
               teams.name = res.data.data[i].team_name
               teams.info = res.data.data[i].team_info
               teams.id = res.data.data[i].team_id
               if (res.data.data[i].user_perm === 0) {
                 teams.power = '超管'
               } else if (res.data.data[i].user_perm === 1) {
                 teams.power = '管理员'
               } else if (res.data.data[i].user_perm === 2) {
                 teams.power = '成员'
               }
               let flag = 0
               for (let i = 0; i < this.groupList.length; i++) {
                 if (this.groupList[i].id === teams.id) {
                   flag = 1
                   break
                 }
               }
               if (!flag) { this.groupList.push(teams) }
             }
           } else {
             // this.$message.error(res.data.message)
           }
           this.tableLoading = false
         })
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
.morebutton {
  padding: 5px;
  border: 0;
}
.projecttitle {
  font-size: 45px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>

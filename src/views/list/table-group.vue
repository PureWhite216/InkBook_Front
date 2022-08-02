<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-popover
          v-model="visible_applyTeam"
          placement="top"
          width="350"
        >
          <p>通过ID申请加入团队</p>
          <el-input
            v-model="form_applyTeam.team_id"
            placeholder="输入团队ID"
            style="width: 80%;margin: auto"
          />
          <p></p>
          <div style="text-align: left; margin: 0">
            <el-button size="mini" style="margin-top:10px" @click="applyTeam(), visible_applyTeam = false, form_applyTeam.team_id = null">确定</el-button>
          </div>
          <el-button
            slot="reference"
            style="margin-right:10px"
            size="mini"
            icon="el-icon-plus"
          >申请加入
          </el-button>
        </el-popover>
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
        >创建团队
        </el-button>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="deleteMultiItem"
        >解散/退出
        </el-button>
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
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="groupList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
          />
          <el-table-column
            align="center"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="团队id"
            prop="id"
            width="100"
          />
          <el-table-column
            align="center"
            label="团队名"
            prop="name"
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="time"
            width="180"
          />
          <el-table-column
            align="center"
            label="成员数量"
            prop="member_num"
            width="80"
          />
          <el-table-column
            align="center"
            label="文档数量"
            prop="word_num"
            width="80"
          />
          <el-table-column
            align="center"
            label="权限"
            prop="power"
            width="140px"
          />
          <el-table-column
            align="center"
            label="操作"
            width="260"
          >
            <template slot-scope="scope">
              <el-dialog title="队长权限转让" :visible.sync="scope.row.dialogVisible">
                <el-form :model="form1">
                  <el-form-item label="转让成员id" :label-width="formLabelWidth">
                    <el-input v-model="form1.member_id" autocomplete="off" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="scope.row.dialogVisible = false; form1.member_id = null; form1.team_id = null">取 消</el-button>
                  <el-button @click="Leader_change(scope.row),scope.row.dialogVisible = false">确 定</el-button>
                </div>
              </el-dialog>
              <el-button
                :underline="false"
                size="small"
                @click="toGroupFile(scope.row)"
              >进入</el-button>
              <el-button
                type="info"
                :underline="false"
                size="small"
                :disabled="scope.row.power != '创建者'"
                @click="scope.row.dialogVisible = true"
              >队长让位</el-button>
              <el-button
                v-if="scope.row.power === '创建者'"
                type="danger"
                :underline="false"
                size="small"
                icon="el-icon-delete"
                @click="deleteItem(scope.row)"
              >解散</el-button>
              <el-button
                v-if="scope.row.power != '创建者'"
                type="danger"
                :underline="false"
                size="small"
                icon="el-icon-delete"
                @click="deleteItem(scope.row)"
              >退出</el-button>
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
      form: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state)
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
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: 0
      },
      form_quitTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: 0
      },
      disbandTeamList: [],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.Refresh()
  },
  methods: {
    quitTeam(item) {
      this.form_quitTeam.team_id = item.id
      this.$axios.post('/team/quit_team', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
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
      store.toGroupFile && store.toGroupFile()
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
      if (item.power === '创建者') {
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
            message: item.power === '创建者' ? '已取消解散' : '已取消解散'
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
      this.form_disbandTeam.team_id = item.id
      this.$axios.post('/team/disband_team', qs.stringify(this.form_disbandTeam))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 4) {
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
       this.$axios.post('/team/get_team_list', qs.stringify(this.form))
         .then((res) => {
           if (res.data.result === 3) {
             for (let i = 0; i < res.data.team_list.length; i++) {
               const teams = {
                 name: '',
                 time: '',
                 member_num: 0,
                 word_num: 0,
                 power: '',
                 id: 0,
                 dialogVisible: false
                }
               teams.name = res.data.team_list[i].team_name
               teams.time = res.data.team_list[i].create_time
               teams.member_num = res.data.team_list[i].member_cnt
               teams.word_num = res.data.team_list[i].word_cnt
               teams.id = res.data.team_list[i].team_id
               if (res.data.team_list[i].power === 1) {
                 teams.power = '创建者'
               } else if (res.data.team_list[i].power === 2) {
                 teams.power = '管理员'
               } else if (res.data.team_list[i].power === 3) {
                 teams.power = '游客'
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
             this.$message.error(res.data.message)
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

</style>

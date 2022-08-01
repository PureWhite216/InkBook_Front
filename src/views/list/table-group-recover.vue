<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="left">
        <el-button
          size="mini"
          icon="el-icon-back"
          @click="onFile"
        >返回</el-button>
      </template>
      <template slot="right">
        <el-button
          size="mini"
          icon="el-icon-refresh-right"
          @click="recoverMutiItem"
        >恢复
        </el-button>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="deleteMultiItem"
        >删除
        </el-button>
      </template>
    </TableHeader>
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
            width="60"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="文件名"
            prop="name"
          />
          <el-table-column
            align="center"
            label="文件id"
            prop="word_id"
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time"
          />
          <el-table-column
            align="center"
            label="是否公开"
            prop="open"
          />
          <el-table-column
            align="center"
            label="删除时间"
            prop="deleteTime"
            width="140px"
          />
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                :underline="false"
                icon="el-icon-refresh-right"
                @click="Recover(scope.row)"
              >恢复</el-button>
              <el-button
                size="mini"
                type="danger"
                :underline="false"
                icon="el-icon-delete"
                @click="deleteItem(scope.row)"
              >删除</el-button>
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
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'
export default {
  name: 'TableGroupRecover',
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
      form: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id'))
      },
      form1: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        team_id: Number(localStorage.getItem('team_id')),
        word_id: 0
      },
      groupList: [],
      deleteList: [],
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
    this.Refresh()
    localStorage.setItem('flag', 'team')
  },
  methods: {
    handleSelectionChange(vals) {
      this.deleteList = vals
    },
    recoverMutiItem() {
      this.$confirm('此操作将恢复您选中的所有文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.deleteList.length; i++) {
          this.Recover(this.deleteList[i])
        }
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        })
      })
    },
    deleteMultiItem() {
      this.$confirm('此操作将彻底删除您选中的所有文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.deleteList.length; i++) {
          this.Delete(this.deleteList[i])
        }
        this.Refresh()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteItem(item) {
      this.$confirm('此操作将彻底删除此文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.Delete(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    Delete(item) {
      this.form1.word_id = item.word_id
      this.$axios.post('/worddocx/team_real_delete_word', qs.stringify(this.form1))
        .then(res => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    Recover(item) {
      this.form1.word_id = item.word_id
      this.$axios.post('/worddocx/team_recover_word', qs.stringify(this.form1))
        .then(res => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    onFile() {
      this.$router.push('/list/table-group-file')
    },
    Refresh() {
      this.loading = true
      this.groupList = []
      this.$axios.post('/worddocx/team_get_delete_word_list', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 4) {
            for (let i = 0; i < res.data.team_delete_word_message_list.length; i++) {
              const words = {
                name: '',
                time: '',
                member_num: 0,
                word_num: 0,
                powers: ''
              }
              words.name = res.data.team_delete_word_message_list[i].word_name
              words.word_id = res.data.team_delete_word_message_list[i].word_id
              words.create_time = res.data.team_delete_word_message_list[i].create_time
              words.edit_time = res.data.team_delete_word_message_list[i].edit_time
              words.last_id = res.data.team_delete_word_message_list[i].last_edit_user_id
              words.deleteTime = res.data.team_delete_word_message_list[i].delete_time
              words.is_editing = res.data.team_delete_word_message_list[i].is_editing === 1 ? '是' : '否'
              words.open = res.data.team_delete_word_message_list[i].open === 1 ? '是' : '否'
              let flag = 0
              for (let i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].word_id === words.word_id) {
                  this.groupList[i].is_editing = words.is_editing
                  flag = 1
                  break
                }
              }
              if (!flag) { this.groupList.push(words) }
            }
          }
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


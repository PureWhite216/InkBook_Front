<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="left">
        <el-button
          size="mini"
          icon="el-icon-back"
          @click="onGroup"
        >返回</el-button>
      </template>
      <template slot="right">
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="onGroupMember()"
        >成员管理
        </el-button>
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
        >创建
        </el-button>
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-delete"
          @click="onGroupRecover"
        >回收站
        </el-button>
      </template>
    </TableHeader>
    <el-dialog title="创建文档" :visible.sync="dialogFormVisible">
      <el-form :model="form2">
        <el-form-item label="文档名称" :label-width="formLabelWidth">
          <el-input v-model="form2.word_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否公开" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1">是</el-radio>
          <el-radio v-model="radio" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="选择模板" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="8">
              <el-card v-model="radio2" :body-style="{ padding: '0px' }">
                <img src="../../assets/template0.jpg" class="image" />
                <div style="padding: 14px;">
                  <span>空白文档</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="create0">创建</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card v-model="radio2" :body-style="{ padding: '0px' }">
                <img src="../../assets/template1.jpg" class="image" />
                <div style="padding: 14px;">
                  <span>会议纪要</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="create1">创建</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../../assets/template2.jpg" class="image" />
                <div style="padding: 14px;">
                  <span>待办事项</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="create2">创建</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../../assets/template3.jpg" class="image" />
                <div style="padding: 14px;">
                  <span>工作清单</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="create3">创建</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="loading"
          :data="teamWordList"
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
            width="100"
          />
          <el-table-column
            align="center"
            label="创建时间"
            prop="create_time"
            width="180"
          />
          <el-table-column
            align="center"
            label="是否有人编辑"
            prop="is_editing"
            width="100"
          />
          <el-table-column
            align="center"
            label="是否公开"
            prop="open"
            width="80"
          />
          <el-table-column
            align="center"
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                :underline="false"
                @click="onGroupRichTextEditor(scope.row)"
              >编辑</el-button>
              <el-popover
                placement="top"
                width="350"
              >
                <p>文档管理</p>
                <el-popover
                  v-model="visible"
                  placement="top"
                  width="320"
                >
                  <el-switch
                    v-model="isPublic"
                    inactive-color="#13ce66"
                    active-color="#FFBF00"
                    active-text="部分公开"
                    inactive-text="全体公开"
                  />
                  <el-popover
                    v-model="visible"
                    placement="top"
                    width="350"
                  >
                    <p>通过名称添加协作者</p>
                    <el-select v-model="form_invite.username" placeholder="请选择成员">
                      <el-option
                        v-for="item in powerOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <p></p>
                    <el-select v-model="form_invite.power" placeholder="请选择权限">
                      <el-option
                        v-for="item in powerOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                    <div style="text-align: left; margin: 0">
                      <el-button size="mini" style="margin-top:10px" @click="invite(), visible = false">确定</el-button>
                    </div>
                    <el-button
                      slot="reference"
                      style="margin:10px"
                      size="mini"
                      icon="el-icon-plus"
                    >添加成员
                    </el-button>
                  </el-popover>
                  <el-table :data="gridData">
                    <el-table-column width="140" property="name" label="名称" />
                    <el-table-column width="60" property="power" label="权限" />
                    <el-table-column
                      align="center"
                      label="操作"
                      width="80"
                    >
                      <template>
                        <el-button
                          size="mini"
                          type="danger"
                          :underline="false"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    slot="reference"
                    v-permission="['admin', 'editor']"
                    style="margin-inline:10px"
                    size="mini"
                    icon="el-icon-plus"
                  >协作
                  </el-button>
                </el-popover>
                <el-button
                  size="mini"
                  type="warning"
                  :underline="false"
                  style="margin:10px"
                  @click="unlock(scope.row)"
                >强制解锁</el-button>
                <el-button
                  v-if="scope.row.open === '是'"
                  size="mini"
                  :underline="false"
                  @click="openTeamWord(scope.row)"
                >设置为私有</el-button>
                <el-button
                  v-if="scope.row.open === '否'"
                  size="mini"
                  :underline="false"
                  @click="openTeamWord(scope.row)"
                >设置为公开</el-button>
                <el-button
                  slot="reference"
                  style="margin-inline:10px"
                  size="mini"
                  icon="el-icon"
                >管理
                </el-button>
              </el-popover>
              <el-button
                size="mini"
                type="danger"
                :underline="false"
                @click="OnDelete(scope.row)"
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
import store from '@/layouts/store'
import qs from 'qs'
export default {
  name: 'TableGroupLatest',
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
      loading: false,
      form: {
          token: getters.getToken(state),
          user_id: getters.getUserId(state),
          username: getters.getUserName(state),
          team_id: localStorage.getItem('team_id')
      },
      radio: '0',
      radio2: '0',
      form2: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_name: '',
        team_id: Number(localStorage.getItem('team_id')),
        open: 0,
        template_id: 0
      },
      form3: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0,
        team_id: Number(localStorage.getItem('team_id'))
      },
      form4: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      },
      form_invite: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        send_id: getters.getUserId(state),
        accept_id: null,
        team_id: Number(localStorage.getItem('team_id')),
        power: null
      },
      form_openTeamWord: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0,
        team_id: Number(localStorage.getItem('team_id')),
        open: 0
      },
      teamWordList: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      isPublic: true
    }
  },
  created() {
    this.Refresh()
    localStorage.setItem('flag', 'team')
    localStorage.setItem('shareFlag', 'false')
    localStorage.setItem('addCooper', 'true')
  },
  methods: {
    create0() {
      this.radio2 = '0'
      this.addWord()
    },
    create1() {
      this.radio2 = '1'
      this.addWord()
    },
    create2() {
      this.radio2 = '2'
      this.addWord()
    },
    create3() {
      this.radio2 = '3'
      this.addWord()
    },
    openTeamWord(item) {
      this.form_openTeamWord.word_id = item.word_id
      this.form_openTeamWord.open = item.open === '是' ? 0 : 1
      this.$axios.post('/worddocx/team_edit_open_word', qs.stringify(this.form_openTeamWord))
        .then(res => {
            if (res.data.result === 6) {
              this.$message.success(res.data.message)
              // localStorage.setItem('enable', 'true')
              this.Refresh()
            } else {
              this.$message.error(res.data.message)
            }
        })
    },
    unlock(item) {
      this.form3.word_id = item.word_id
      this.$axios.post('/worddocx/team_unlock_word', qs.stringify(this.form3))
        .then(res => {
          if (res.data.result === 6) {
            this.$message.success(res.data.message)
            localStorage.setItem('enable', 'true')
            location.reload()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    addWord() {
      if (this.radio2 === '0') { this.form2.template_id = 0 } else if (this.radio2 === '1') { this.form2.template_id = 1 } else if (this.radio2 === '2') { this.form2.template_id = 2 } else { this.form2.template_id = 3 }
      if (this.radio === '0') { this.form2.open = 0 } else this.form2.open = 1
      this.$axios.post('/worddocx/team_create_word', qs.stringify(this.form2))
      .then((res) => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        this.Refresh()
        this.dialogFormVisible = false
        }
      )
    },
    Refresh() {
      this.loading = true
      this.teamWordList = []
      this.$axios.post('/worddocx/team_word_message_list', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 4) {
            for (let i = 0; i < res.data.team_word_message_list.length; i++) {
              const words = {
                name: '',
                word_id: 0,
                create_time: '',
                edit_time: '',
                last_id: 0,
                is_editing: '',
                open: ''
              }
              words.name = res.data.team_word_message_list[i].word_name
              words.word_id = res.data.team_word_message_list[i].word_id
              words.create_time = res.data.team_word_message_list[i].create_time
              words.edit_time = res.data.team_word_message_list[i].edit_time
              words.last_id = res.data.team_word_message_list[i].last_edit_user_id
              words.is_editing = res.data.team_word_message_list[i].is_editing === 1 ? '是' : '否'
              words.open = res.data.team_word_message_list[i].open === 1 ? '是' : '否'
              let flag = 0
              for (let i = 0; i < this.teamWordList.length; i++) {
                if (this.teamWordList[i].word_id === words.word_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.teamWordList.push(words) }
            }
          }
          this.loading = false
        })
    },
    onGroupRichTextEditor(item) {
      this.form3.word_id = item.word_id
      this.$axios.post('/worddocx/team_edit_word', qs.stringify(this.form3))
        .then(res => {
            if (res.data.result === 6) {
              this.$message.success('获得内容！')
              localStorage.setItem('team_word_name', item.name)
              localStorage.setItem('team_word_id', item.word_id)
              localStorage.setItem('team_word_content', res.data.word_content)
              localStorage.setItem('enable', 'true')
              store.toGroupRichTextEditor && store.toGroupRichTextEditor()
            } else if (res.data.result === 3 || res.data.result === 5) {
              this.$message.error(res.data.message)
              this.$axios.post('/worddocx/team_look_word', qs.stringify(this.form3))
                .then(res => {
                    if (res.data.result === 4) {
                      localStorage.setItem('team_word_name', item.name)
                      localStorage.setItem('team_word_id', item.word_id)
                      localStorage.setItem('team_word_content', res.data.word_content)
                      localStorage.setItem('enable', 'false')
                      store.toRichTextReadOnly && store.toRichTextReadOnly()
                    } else {
                      this.$message.error(res.data.message)
                    }
                })
            } else {
              this.$message.error(res.data.message)
            }
          }
        )
    },
    OnDelete(item) {
      this.form3.word_id = item.word_id
      this.$axios.post('/worddocx/team_delete_word', qs.stringify(this.form3))
        .then(res => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    onGroupMember() {
      store.toGroupMember && store.toGroupMember()
    },
    onGroupRecover() {
      store.toGroupRecover && store.toGroupRecover()
    },
    onGroup() {
      store.toGroup && store.toGroup()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>

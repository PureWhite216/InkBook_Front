<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
        >创建
        </el-button>
      </template>
    </TableHeader>
    <el-dialog title="创建个人文档" :visible.sync="dialogFormVisible">
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
          :data="wordList"
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
            label="最后打开时间"
            prop="open_time"
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
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                :underline="false"
                icon="el-icon-reading"
                @click="onRichTextEditor(scope.row)"
              >查看</el-button>
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
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'
import draggable from '@/directive/draggable'
import store from '@/layouts/store'
export default {
  name: 'TableLatest',
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
      deleteWordList: [],
      radio: '0',
      radio2: '0',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state)
      },
      form1: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        word_id: ''
      },
      form2: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        word_name: '',
        open: 0
      },
      wordList: [],
      loading: false,
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
    localStorage.setItem('flag', 'user')
    localStorage.setItem('shareFlag', 'false')
    localStorage.setItem('enable', 'false')
    localStorage.setItem('addCooper', 'false')
  },
  methods: {
    Refresh() {
      this.loading = true
      this.wordList = []
      this.$axios.post('/worddocx/user_get_look_history', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 3) {
            for (let i = 0; i < res.data.history.length; i++) {
              const words = {
                name: '',
                word_id: 0,
                create_time: '',
                edit_time: '',
                last_id: 0,
                open_time: '',
                is_editing: '',
                open: ''
              }
              words.name = res.data.history[i].word_name
              words.word_id = res.data.history[i].word_id
              words.create_time = res.data.history[i].create_time
              words.edit_time = res.data.history[i].edit_time
              words.open_time = res.data.history[i].open_time
              words.last_id = res.data.history[i].last_edit_user_id
              words.is_editing = res.data.history[i].is_editing === 1 ? '是' : '否'
              words.open = res.data.history[i].open === 1 ? '是' : '否'
              let flag = 0
              for (let i = 0; i < this.wordList.length; i++) {
                if (this.wordList[i].word_id === words.word_id) {
                  this.wordList[i].is_editing = words.is_editing
                  flag = 1
                  break
                }
              }
              if (!flag) { this.wordList.push(words) }
            }
          }
          this.loading = false
        })
    },
    onRichTextEditor(item) {
      this.form1.word_id = item.word_id
      this.$axios.post('/worddocx/user_look_history_word_content', qs.stringify(this.form1))
        .then(res => {
          if (res.data.result === 3) {
            localStorage.setItem('word_name', item.name)
            localStorage.setItem('word_id', item.word_id)
            localStorage.setItem('user_word_content', res.data.word_content)
            store.toRichTextReadOnly && store.toRichTextReadOnly()
          } else {
            this.$message.error(res.data.message)
          }
        })
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
    },
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
    addWord() {
      if (this.radio2 === '0') { this.form2.template_id = 0 } else if (this.radio2 === '1') { this.form2.template_id = 1 } else if (this.radio2 === '2') { this.form2.template_id = 2 } else { this.form2.template_id = 3 }
      if (this.radio === '0') { this.form2.open = 0 } else this.form2.open = 1
      this.$axios.post('/worddocx/user_create_word', qs.stringify(this.form2))
        .then((res) => {
            if (res.data.result === 3) {
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
            this.Refresh()
            this.dialogFormVisible = false
          }
        )
      store.toTableCreate && store.toTableCreate()
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

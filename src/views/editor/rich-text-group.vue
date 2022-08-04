<template>
  <div class="main-container">
    <el-card :body-style="{padding: '0'}" style="max-width: 950px; margin: auto">
      <template #header>
        <el-link :underline="false">文章标题</el-link>
      </template>
      <el-input
        v-model="title"
        class="title-input"
        placeholder="请输入文章标题"
      />
    </el-card>
    <el-card
      :body-style="{padding: '0'}"
      class="margin-top-xs"
      style="max-width: 950px; margin: auto"
    >
      <template #header>
        <div class="flex">
          <el-link :underline="false">文章内容</el-link>
          <div class="flex-sub"></div>
          <el-button
            style="margin-inline:10px"
            type="danger"
            size="mini"
            @click="back"
          >退出编辑
          </el-button>
          <el-popover
            v-model="comment_visible"
            placement="top"
            width="600"
          >
            <p>添加评论</p>
            <el-input
              v-model="form_addComment.comment_content"
              placeholder="输入评论"
              style="width: 80%;margin: auto"
            />
            <div style="text-align: left; margin: 0">
              <el-button size="mini" style="margin-top:10px" @click="addComment(), form_addComment.comment_content= null, comment_visible = false">确定</el-button>
            </div>
            <el-table :data="commentList" height="400">
              <el-table-column width="120" property="username" label="名称" />
              <el-table-column width="120" property="time" label="时间" />
              <el-table-column width="300" property="content" label="评论" />
            </el-table>
            <el-button
              slot="reference"
              style="margin-inline:10px"
              size="mini"
              icon="el-icon-plus"
            >评论
            </el-button>
          </el-popover>
          <el-popover
            v-model="visible"
            placement="top"
            width="320"
          >
            <el-popover
              v-model="visible"
              placement="top"
              width="280"
            >
              <el-table :data="gridData" height="400">
                <el-table-column width="160" property="username" label="名称" />
                <el-table-column
                  align="center"
                  label="操作"
                  width="80"
                >
                  <template>
                    <el-button
                      size="mini"
                      :underline="false"
                    >添加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                slot="reference"
                style="margin:10px"
                size="mini"
                icon="el-icon-plus"
              >添加团队成员
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
          </el-popover>
          <el-button
            size="mini"
            @click="Save"
          >保存</el-button>
          <el-button
            size="mini"
            @click="Like"
          >收藏</el-button>
          <el-button
            type="warning"
            size="mini"
            @click="share"
          >分享</el-button>
        </div>
      </template>
      <RichTextEditor
        ref="richTextEditor"
        :height="600"
      />
    </el-card>
    <div
      v-if="htmlContent"
      class="margin-top padding priview-content"
      v-html="htmlContent"
    >
    </div>
    <div
      v-if="jsonContent"
      class="margin-top padding priview-content"
    >
      {{ jsonContent }}
    </div>
  </div>
</template>

<script>
import RichTextEditor from '@/components/common/RichTextEditor'
import store from '@/layouts/store'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'

export default {
  name: 'RichTextGroup',
  components: { RichTextEditor },
  data() {
    return {
      form: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: Number(localStorage.getItem('team_word_id')),
        team_id: Number(localStorage.getItem('team_id')),
        word_content: ''
      },
      form1: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: Number(localStorage.getItem('team_word_id')),
        team_id: Number(localStorage.getItem('team_id')),
        word_name: ''
      },
      form2: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: Number(localStorage.getItem('team_word_id')),
        team_id: Number(localStorage.getItem('team_id')),
        word_content: ''
      },
      form3: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: Number(localStorage.getItem('team_word_id'))
      },
      form4: {
        word_id: Number(localStorage.getItem('team_word_id')),
        word_name: localStorage.getItem('team_word_name')
      },
      form_getCommentList: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: localStorage.getItem('word_id')
      },
      form_addComment: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: localStorage.getItem('word_id'),
        comment_content: ''
      },
      title: localStorage.getItem('team_word_name'),
      htmlContent: '',
      jsonContent: '',
      comment: '',
      ID: '',
      isPublic: true,
      loading: false,
      gridData: [{
        name: 'ABC',
        power: '1'
      }, {
        name: 'CCC',
        power: '2'
      }],
      commentData: [{
        name: 'ABC',
        time: '2022-05-11',
        comment: 'Test'
      }],
      commentList: []
    }
  },
  created() {
    this.getCommentList()
  },
  mounted() {
    store.changeDevice('mobile')
    store.toggleCollapse(true)
  },
  beforeDestroy() {
    this.exitEdit()
  },
  destroyed() {
    store.changeDevice('pc')
    store.toggleCollapse(false)
  },
  methods: {
    share() {
      this.$axios.post('/worddocx/share', qs.stringify(this.form4))
        .then(res => {
          if (res.data.result === 0) {
            alert('您的分享链接是' + 'http://124.220.205.84/#/share' + res.data.x)
            localStorage.setItem('refresh', '1')
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    back() {
      store.toGroupFile && store.toGroupFile()
    },
    Like() {
      this.$axios.post('/worddocx/user_collect_word', qs.stringify(this.form3))
        .then(res => {
          if (res.data.result === 4) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    addComment() {
      this.$axios.post('/worddocx/user_comment_word', qs.stringify(this.form_addComment))
        .then((res) => {
          if (res.data.result === 3) {
              this.getCommentList()
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          }
        )
    },
    getCommentList() {
      this.loading = true
      this.commentList = []
      this.$axios.post('/worddocx/user_get_comment_list', qs.stringify(this.form_getCommentList))
        .then((res) => {
          if (res.data.result === 4) {
            for (let i = 0; i < res.data.word_comment_list.length; i++) {
              const comments = {
                id: 0,
                username: '',
                time: '',
                content: ''
              }
              comments.id = res.data.word_comment_list[i].comment_id
              comments.username = res.data.word_comment_list[i].comment_username
              comments.time = res.data.word_comment_list[i].comment_time
              comments.content = res.data.word_comment_list[i].comment_content
              this.commentList.push(comments)
            }
            // this.$message.success(res.data.message)
          }
          this.loading = false
        })
    },
    Save() {
      this.form2.word_content = this.$refs.richTextEditor.getJsonContent().slice(7, -1)
      this.$axios.post('/worddocx/team_save_word', qs.stringify(this.form2))
        .then((res) => {
            if (res.data.result === 5) {
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          }
        )
      this.form1.word_name = this.title
      this.$axios.post('/worddocx/team_rename_word', qs.stringify(this.form1))
    },
    exitEdit() {
      this.form.word_content = this.$refs.richTextEditor.getJsonContent().slice(7, -1)
      this.$axios.post('/worddocx/team_out_edit_word', qs.stringify(this.form))
        .then((res) => {
            if (res.data.result === 3) {
              this.$message.success(res.data.message)
              localStorage.setItem('enable', 'true')
            } else {
              this.$message.error(res.data.message)
            }
          }
        )
      this.form1.word_name = this.title
      this.$axios.post('/worddocx/team_rename_word', qs.stringify(this.form1))
    },
    getHtmlContent() {
      this.htmlContent = this.$refs.richTextEditor.getHtmlContent()
    },
    getJsonContent() {
      console.log(localStorage.getItem('flag'))
      console.log(JSON.parse(localStorage.getItem('team_word_content')))
      this.jsonContent = this.$refs.richTextEditor.getJsonContent()
    }
  }
}
</script>

<style lang="scss" scoped>
.title-input {
  ::v-deep .el-input__inner {
    border: none !important;
  }
}
::v-deep .ql-container.ql-snow {
  border: none;
}
::v-deep .ql-toolbar.ql-snow {
  border: none;
  border-bottom: 1px solid #ccc;
}
::v-deep .ql-editor.ql-blank::before {
  color: #afb4bd;
  font-size: 14px;
  font-style: normal;
}
.theme-dark .priview-content {
  background: #5a5a5a;
  color: #fff;
}
.priview-content {
  background: #fff;
  color: #333;
}
</style>

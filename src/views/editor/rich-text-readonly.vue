<template>
  <div class="main-container">
    <el-card :body-style="{padding: '0'}">
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
    >
      <template #header>
        <div class="flex">
          <el-link :underline="false">文章内容</el-link>
          <div class="flex-sub"></div>
          <el-button
            style="margin-inline:10px"
            type="danger"
            size="mini"
            @click="exit_Look"
          >退出查看
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
          <el-button
            type="common"
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
      title: '',
      htmlContent: '',
      jsonContent: '',
      comment: '',
      ID: '',
      isShow: true,
      isPublic: true,
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
      commentList: [],
      form: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: localStorage.getItem('word_id')
      },
      form4: {
        word_id: localStorage.getItem('word_id'),
        word_name: localStorage.getItem('flag') === 'user' ? localStorage.getItem('word_name') : localStorage.getItem('team_word_name')
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
      }
    }
  },
  created() {
    if (localStorage.getItem('flag') === 'user') {
      this.title = localStorage.getItem('word_name')
    } else {
      this.title = localStorage.getItem('team_word_name')
    }
    if (localStorage.getItem('addCooper') === 'false') {
      this.isShow = false
    }
    this.getCommentList()
  },
  mounted() {
    store.changeDevice('mobile')
    store.toggleCollapse(true)
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
    Like() {
      this.$axios.post('/worddocx/user_collect_word', qs.stringify(this.form))
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
    exit_Look () {
      if (localStorage.getItem('flag') === 'user') {
        store.toTableLatest && store.toTableLatest()
      } else {
        store.toGroupFile && store.toGroupFile()
      }
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

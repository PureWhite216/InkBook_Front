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
            style="margin-inline:10px; background: orange; color: white; border: 0"
            @click="back()"
          >
            <i class="el-icon-back"></i>
            退出编辑
          </el-button>
          <el-button
            style="margin-inline:10px; background: #49aaef; color: white; border: 0"
            @click="Save"
          >
            <i class="el-icon-plus"></i>
            保存</el-button>
        </div>
      </template>
      <!-- <el-dialog title="分享二维码" :visible.sync="dialogVisible_share">
        <div>
          <image
            :src="imgUrl"
          />
        </div>
      </el-dialog> -->
      <RichTextEditor
        ref="richTextEditor"
        v-model="editor"
        :height="1000"
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
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'
import store from '@/layouts/store'
// import QRCode from 'qrcode'
export default {
  name: 'RichText',
  components: { RichTextEditor },
  data() {
    return {
      imgUrl: '',
      dialogVisible_share: false,
      form: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: localStorage.getItem('word_id'),
        word_content: ''
      },
      form1: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: localStorage.getItem('word_id'),
        word_name: ''
      },
      form_save: {
        token: getters.getToken(state),
        doc_id: localStorage.getItem('doc_id'),
        doc_content: ''
      },
      form3: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: localStorage.getItem('word_id')
      },
      form4: {
        word_id: Number(localStorage.getItem('word_id')),
        word_name: localStorage.getItem('word_name')
      },
      form_invite: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        accept_id: null,
        word_id: localStorage.getItem('word_id')
      },
      form_getCooperatorList: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: localStorage.getItem('word_id')
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
      form_deleteCooperator: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: localStorage.getItem('word_id'),
        cooperation_id: 0
      },
      isShow: true,
      invite_visible: false,
      comment_visible: false,
      title: localStorage.getItem('doc_name'),
      htmlContent: '',
      jsonContent: '',
      comment: '',
      ID: '',
      cooperatorList: [],
      commentList: [],
      loading: false,
      commentData: [{
        name: 'ABC',
        time: '2022-05-11',
        comment: 'Test'
      }]
      // opt: {
      //   errorCorrectionLevel: 'H',
      //   type: 'image/jpeg',
      //   quality: 0.3,
      //   margin: 1
      // }
    }
  },
  created() {
    this.getCooperatorList()
    this.getCommentList()
    if (localStorage.getItem('shareFlag') === 'true' && localStorage.getItem('addCooper') === 'false') {
      this.isShow = false
    }
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
    back() {
      this.$router.go(-1)
    },
    deleteCooperator(item) {
      this.form_deleteCooperator.cooperation_id = item.id
      this.$axios.post('/team/out_cooperate', qs.stringify(this.form_deleteCooperator))
        .then((res) => {
          if (res.data.result === 4) {
              this.getCooperatorList()
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          }
        )
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
    getCooperatorList() {
      this.loading = true
      this.cooperatorList = []
      this.$axios.post('/team/get_cooperationer_list', qs.stringify(this.form_getCooperatorList))
        .then((res) => {
          if (res.data.result === 4) {
            for (let i = 0; i < res.data.cooperation_list.length; i++) {
              const cooperators = {
                id: 0,
                username: '',
                email: ''
              }
              cooperators.id = res.data.cooperation_list[i].id
              cooperators.username = res.data.cooperation_list[i].username
              cooperators.email = res.data.cooperation_list[i].email
              this.cooperatorList.push(cooperators)
              // this.$message.success(res.data.message)
            }
            // this.$message.success(res.data.message)
          }
          this.loading = false
        })
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
    addCooperator() {
      this.$axios.post('/team/send_cooperate_inviter', qs.stringify(this.form_invite))
        .then((res) => {
          if (res.data.result === 5) {
              this.getCooperatorList()
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
          }
        )
    },
    Save() {
      this.form_save.doc_content = this.$refs.richTextEditor.getJsonContent().slice(7, -1)
        this.$axios.post('/doc/save', qs.stringify(this.form_save))
          .then((res) => {
              if (res.data.success) {
                this.$message.success(res.data.message)
              } else {
                this.$message.error(res.data.message)
              }
            }
          )
    },
    exitEdit() {
      this.form.word_content = this.$refs.richTextEditor.getJsonContent().slice(7, -1)
      if (localStorage.getItem('shareFlag') === 'true') {
        this.$axios.post('/worddocx/user_out_edit_cooperation_word', qs.stringify(this.form))
          .then((res) => {
              if (res.data.result === 4) {
                this.$message.success(res.data.message)
                localStorage.setItem('enable', 'true')
                localStorage.setItem('shareFlag', 'false')
              } else {
                this.$message.error(res.data.message)
              }
            }
          )
        localStorage.setItem('shareFlag', 'false')
      } else {
        this.$axios.post('/worddocx/user_out_edit_word', qs.stringify(this.form))
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
        this.$axios.post('/worddocx/user_rename_word', qs.stringify(this.form1))
      }
    },
    getHtmlContent() {
      this.htmlContent = this.$refs.richTextEditor.getHtmlContent()
    },
    getJsonContent() {
      console.log(localStorage.getItem('flag'))
      console.log(JSON.parse(localStorage.getItem('user_word_content')))
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

<template>
  <div class="main-container">
    <el-row style="background: #2f2f2f; min-height: 40px">
      <el-col :span="8">
        <el-button class="backbutton" style="margin-left: 20px; margin-top: 3px" @click="back">
          <i class="el-icon-back" style="font-size: x-large"></i>
        </el-button>
      </el-col>
      <el-col :span="8" style="text-align: center; margin-top: 12px">
        <div style="font-size: 16px; color: #ececec" contenteditable="true">
          {{ title }}
        </div>
        <div>
          <!--          <el-button style="padding: 5px; background: #2f2f2f; border: 0">-->
          <!--            <i class="el-icon-more" style="font-size: large; color: #ececec"></i>-->
          <!--          </el-button>-->
        </div>
      </el-col>
    </el-row>
    <el-dialog title="创建团队文件" :visible.sync="dialogCreateDoc">
      <el-form :model="form_createDoc">
        <el-form-item label="文档名称" :label-width="formLabelWidth">
          <el-input v-model="form_createDoc.doc_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateDoc = false; form_createDoc.doc_name = '' ">取 消</el-button>
        <el-button @click="CreateDoc(), dialogCreateDoc = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="创建文档目录" :visible.sync="dialogCreateDir">
      <el-form :model="form_createDir">
        <el-form-item label="目录名称" :label-width="formLabelWidth">
          <el-input v-model="form_createDir.dict_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateDir = false; form_createDir.dict_name = '' ">取 消</el-button>
        <el-button @click="CreateDir(), dialogCreateDir = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-card :body-style="{padding: '0'}" style="max-width: 950px; margin: auto">
      <template #header>
        <p style="color: black; font-family: 等线; font-size: 20px; font-weight: bold">Title</p>
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
          <div class="flex-sub"></div>
          <!--          <el-button-->
          <!--            style="margin-inline:10px; background: #49aaef; color: white; border: 0"-->
          <!--            @click="uploadModel"-->
          <!--          >-->
          <!--            <i class="el-icon-plus"></i>-->
          <!--            上传模板</el-button>-->
          <el-button
            style="margin-inline:10px; background: #49aaef; color: white; border: 0"
            @click="Save"
          >
            <i class="el-icon-plus"></i>
            保存</el-button>
          <el-button
            v-if="!is_favorite"
            style="margin-inline:10px; background: orange; color: white; border: 0"
            @click="likeDoc"
          >
            <i class="el-icon-star-on"></i>
            收藏</el-button>
          <el-button
            v-if="is_favorite"
            style="margin-inline:10px; background: orange; color: white; border: 0"
            @click="unlikeDoc"
          >
            <i class="el-icon-star-off"></i>
            取消收藏</el-button>
          <el-button
            style="margin-inline:10px; background: #16dcea; color: white; border: 0"
            @click="exportPDF"
          >
            <i class="el-icon-upload"></i>
            导出</el-button>
          <el-button
            style="margin-inline:10px; background: #2ce8b9; color: white; border: 0"
            @click="openPreview"
          >
            <i class="el-icon-share"></i>
            生成预览</el-button>
          <el-button
            style="margin-inline:10px; background: #2ce8b9; color: white; border: 0"
            @click="closePreview"
          >
            <i class="el-icon-s-release"></i>
            关闭预览</el-button>
        </div>
      </template>
      <RichTextEditor
        id="pdfDom"
        ref="richTextEditor"
        v-model="editor"
        :height="1000"
      />
    </el-card>
    <div id="drag" v-drag:#drag class="drag-box">
      <div class="boxhead">
        <i class="el-icon-menu"></i>
        <p>团队文档</p>
      </div>
      <!-- <el-tree
        :data="data"
        :props="{label: 'dir_name'}"
        style="margin-top:50px;"
        @node-click="handleNodeClick"
      /> -->
      <el-table
        ref="table"
        :data="data"
        :default-expand-all="true"
        lazy
        row-key="dir_id"
        :expand-row-keys="expands"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @row-dblclick="toDocEditor"
      >
        <el-table-column
          align="left"
          label="团队文档"
        >
          <template slot-scope="scope">
            <i v-if="scope.row.type === 'documentation'" class="el-icon-document"></i>
            <i v-if="scope.row.type !== 'documentation'" class="el-icon-folder"></i>
            <span style="margin-left: 10px">{{ scope.row.dir_name }}</span>
            <i v-if="scope.row.type === 'dir' && scope.row.dir_id !== prj_root_id && scope.row.dir_parent_id !== prj_root_id" class="el-icon-document-add" style="margin-left: 10px" @click="form_createDoc.dest_folder_id = scope.row.dir_id, dialogCreateDoc = true"></i>
            <i v-if="scope.row.type === 'dir' && scope.row.dir_id !== prj_root_id && scope.row.dir_parent_id !== prj_root_id" class="el-icon-folder-add" style="margin-left: 5px" @click="form_createDir.dest_folder_id = scope.row.dir_id, dialogCreateDir = true"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import RichTextEditor from '@/components/common/RichTextEditor'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'
import store from '@/layouts/store'
import { drag } from 'poster/poster.directives'

export default {
  name: 'RichText',
  components: { RichTextEditor },
  directives: { drag },
  data() {
    return {
      url_preview: null,
      is_favorite: localStorage.getItem('is_favorite') === 'true',
      form_likeDoc: {
        token: getters.getToken(state),
        doc_id: null,
        undo: null
      },
      imgUrl: '',
      dialogCreateDoc: false,
      dialogCreateDir: false,
      prj_root_id: localStorage.getItem('prj_root_id'),
      dialogVisible_share: false,
      form_openPreview: {
        token: getters.getToken(state),
        doc_id: localStorage.getItem('doc_id'),
        html_code: null
      },
      form_closePreview: {
        token: getters.getToken(state),
        doc_id: localStorage.getItem('doc_id')
      },
      form_createDoc: {
        token: getters.getToken(state),
        doc_name: '',
        team_id: localStorage.getItem('team_id'),
        dest_folder_id: ''
      },
      form_createDir: {
        token: getters.getToken(state),
        dict_name: '',
        dest_folder_id: ''
      },
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
      form_Model: {
        token: getters.getToken(state),
        name: '模板',
        content: ''
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
      form_getTeam: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: Number(localStorage.getItem('team_id'))
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
      data: []
      // opt: {
      //   errorCorrectionLevel: 'H',
      //   type: 'image/jpeg',
      //   quality: 0.3,
      //   margin: 1
      // }
    }
  },
  created() {
    this.getModel()
    this.getDocTree()
    store.changeDevice('mobile')
    store.toggleCollapse(true)
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
    openPreview() {
      this.getHtmlContent()
      this.form_openPreview.html_code = this.htmlContent
      this.$axios.post('/doc/uploadDoc', qs.stringify(this.form_openPreview))
        .then(res => {
          if (res.data.success) {
            this.url_preview = res.data.data[0].url
            alert('您的分享链接是' + this.url_preview)
            localStorage.setItem('refresh', '1')
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    closePreview() {
      this.$axios.post('/doc/disableSharing', qs.stringify(this.form_closePreview))
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    getModel() {
      this.$axios.get('/doc/getTemplateList', {
        params: {
          token: getters.getToken(state)
        }
      })
      .then(res => {
        if (res.data.success) {
          console.log(res.data.data)
        }
      })
    },
    CreateDir() {
      this.$axios.post('/doc/mkdir', qs.stringify(this.form_createDir))
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getDocTree()
        })
    },
    CreateDoc() {
      this.$axios.post('/doc/newDoc', qs.stringify(this.form_createDoc))
        .then(res => {
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getDocTree()
        })
    },
    toDocEditor(val) {
      if (val.type === 'documentation') {
        localStorage.setItem('flag', 'in')
        localStorage.setItem('doc_id', val.doc_id)
        localStorage.setItem('doc_name', val.doc_name)
        this.$axios.get('/doc/getDocInfo', {
          params: {
            token: getters.getToken(state),
            doc_id: localStorage.getItem('doc_id')
          }
        })
          .then(res => {
            if (res.data.success) {
              localStorage.setItem('in_word_content', res.data.data[0].doc_content)
               this.$router.push('/redirect/editor/rich-text')
            } else {
              this.$message.error(res.data.message)
            }
          })
      }
    },
    getDocTree() {
      this.$axios.post('/team/getTeam', qs.stringify(this.form_getTeam))
        .then(res => {
          if (res.data.success) {
            this.$axios.get('/doc/walkDir', {
              params: {
                token: getters.getToken(state),
                folder_id: res.data.data[0].root_id
              }
            })
              .then(res => {
                if (res.data.success) {
                  this.data = res.data.data
                } else {
                  this.$message.error(res.data.message)
                }
              })
          }
        })
    },
    handleNodeClick(data) {
        console.log(data)
    },
    likeDoc() {
      this.form_likeDoc.doc_id = localStorage.getItem('doc_id')
      this.form_likeDoc.undo = false
      this.$axios.post('/user/favorite', qs.stringify(this.form_likeDoc))
         .then((res) => {
           if (res.data.success) {
            this.is_favorite = true
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
    unlikeDoc() {
      this.form_likeDoc.doc_id = localStorage.getItem('doc_id')
      this.form_likeDoc.undo = true
      this.$axios.post('/user/favorite', qs.stringify(this.form_likeDoc))
         .then((res) => {
           if (res.data.success) {
            this.is_favorite = false
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
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
    exportPDF() {
      this.getPdf('pdfDom', this.title)
    },
    uploadModel() {
      this.form_Model.content = this.$refs.richTextEditor.getJsonContent().slice(7, -1)
      this.$axios.post('/doc/editTemplate', qs.stringify(this.form_Model))
        .then((res) => {
            if (res.data.success) {
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
      console.log(this.htmlContent)
      // this.$message.success(this.htmlContent)
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
::v-deep .title {
  color: #2c2c2c;
  background-color: #2c2c2c;
}
.backbutton {
  color: white;
  background: #2c2c2c;
  height: 30px;
  border: 0;
  margin-top: 5px;
  padding: 5px;
}
.backbutton:hover {
  color: white;
  background: #000000;
  height: 35px;
}
.backbutton:focus {
  color: white;
  background: #000000;
  height: 35px;
}

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

.drag-box {
  position: absolute;
  top: 100px;
  left: 40px;
  width: 240px;
  height: 600px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, .15);
}
.boxhead {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 240px;
  height: 40px;
  background: #fffaf6;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, .1);
  font-size: 18px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #565656;
}

.layer-panel {
  width: 220px;
  height: 460px;
  background-color: #1d2024;
  position: fixed;
  right: 252px;
  top: 60px;
  box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.1);
  color: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  user-select: none;
  z-index: 1001;
  .header {
    height: 30px;
    display: flex;
    align-items: center;
    line-height: 30px;
    box-sizing: border-box;
    padding-left: 10px;
    .title {
      height: 30px;
      flex: 1;
      cursor: move;
    }
    i {
      cursor: pointer;
      width: 30px;
      text-align: center;
      padding: 10px 0;
    }
  }
  .content {
    width: 100%;
    flex: 1;
    /* overflow-y: scroll; */
    background-color: #1d2024;
    .draggable-container {
      height: 100%;
    }
    .scroll-container {
      height: 100%;
      ::v-deep .el-scrollbar__wrap {
        overflow-x: hidden;
        height: 430px;
      }
    }
  }
  .panel-item.selected {
    background-color: #404955;
    color: #fff;
    border-left-color: #358dd9;
  }
}
</style>

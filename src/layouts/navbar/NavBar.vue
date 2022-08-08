<template>
  <div class="vaw-nav-bar-wrapper">
<!--    <Humburger />-->
<!--    <Breadcrumb v-if="state.device !== 'mobile'" />-->
    <div style="flex: 1">
    </div>
    <div>
      <el-popover
        v-model="search_visible"
        placement="top"
        width="450"
        height="400"
      >
        <p>搜索文档</p>
        <el-input
          v-model="keyword"
          placeholder="输入文件名"
          style="width: 80%;margin: auto"
        />
        <div style="text-align: left; margin: 0">
          <el-button size="mini" style="margin-top:10px" @click="getSearchDocList()">确定</el-button>
        </div>
        <el-table v-loading="loading" :data="searchDocList" height="400">
          <el-table-column width="80" property="doc_id" label="ID" align="center" />
          <el-table-column width="140" property="doc_name" label="名称" align="center" />
          <el-table-column width="200" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                :underline="false"
                text-align="left"
                icon="el-icon-view"
                @click="viewSearchWord(scope.row)"
              >查看</el-button>
              <el-button
                size="mini"
                type="warning"
                :underline="false"
                text-align="left"
                icon="el-icon-star-on"
                @click="Like(scope.row)"
              >收藏</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          slot="reference"
          style="margin-inline:10px; color: white; background: #2c2c2c"
          size="mini"
          icon="el-icon-search"
        >搜索
        </el-button>
      </el-popover>
    </div>
<!--    <div class="right-wrapper">-->
<!--      <ActionItems />-->
<!--    </div>-->
    <div class="avatar-wrapper">
      <VAWAvatar />
    </div>
  </div>
</template>

<script>
import store from '@/layouts/store'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'
export default {
  name: 'NavBar',
  data() {
    return {
      state: store.state,
      search_visible: false,
      loading: false,
      searchDocList: [],
      keyword: null,
      form_getSearchWordList: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_name: null
      },
      form_like: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      },
      form_viewSearchWord: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      }
    }
  },
  methods: {
    viewSearchWord(item) {
      this.form_viewSearchWord.word_id = item.word_id
      this.$axios.post('/worddocx/user_look_search_word_content', qs.stringify(this.form_viewSearchWord))
        .then(res => {
          if (res.data.result === 3) {
            localStorage.setItem('word_name', item.name)
            localStorage.setItem('word_id', item.word_id)
            localStorage.setItem('user_word_content', res.data.word_content)
            store.toRichTextReadOnly && store.toRichTextReadOnly()
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    Like(item) {
      this.form_like.word_id = item.word_id
      this.$axios.post('/worddocx/user_collect_word', qs.stringify(this.form_like))
        .then(res => {
          if (res.data.result === 4) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    getSearchDocList() {
      // this.loading = true
      this.searchDocList = []
      this.$axios.get('/doc/searchDoc', {
              params: {
                token: getters.getToken(state),
                keyword: this.keyword
              }
            })
        .then((res) => {
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
                is_favorite: null
              }
              docs.doc_name = res.data.data[i].doc_name
              docs.last_edit_time = res.data.data[i].last_edit_time
              docs.project_id = res.data.data[i].project_id
              docs.doc_description = res.data.data[i].doc_description
              docs.creator_id = res.data.data[i].creator_id
              docs.doc_content = res.data.data[i].doc_content
              docs.creator_name = res.data.data[i].creator_name
              docs.doc_id = res.data.data[i].doc_id
              docs.is_favorite = res.data.data[i].is_favorite
              let flag = 0
              for (let i = 0; i < this.searchDocList.length; i++) {
                if (this.searchDocList[i].doc_id === docs.doc_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.searchDocList.push(docs) }
              // this.$message.success(res.data.message)
            }
              } else {
                this.$message.error(res.data.message)
              }
            })
    },
    getSearchWordList() {
      this.loading = true
      this.searchWordList = []
      this.$axios.post('/worddocx/user_search_word', qs.stringify(this.form_getSearchWordList))
        .then((res) => {
          if (res.data.result === 3) {
            for (let i = 0; i < res.data.word_list.length; i++) {
              const words = {
                name: '',
                word_id: 0,
                create_time: '',
                edit_time: '',
                last_id: 0,
                is_editing: '',
                open: ''
              }
              words.name = res.data.word_list[i].word_name
              words.word_id = res.data.word_list[i].word_id
              words.create_time = res.data.word_list[i].create_time
              words.edit_time = res.data.word_list[i].edit_time
              words.last_id = res.data.word_list[i].last_edit_user_id
              words.is_editing = res.data.word_list[i].is_editing === 1 ? '是' : '否'
              words.open = res.data.word_list[i].open === 1 ? '是' : '否'
              let flag = 0
              for (let i = 0; i < this.searchWordList.length; i++) {
                if (this.searchWordList[i].word_id === words.word_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.searchWordList.push(words) }
            }
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
.vaw-nav-bar-wrapper {
  height: $logoHeight;
  max-height: $logoHeight;
  min-height: $logoHeight;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .avatar-wrapper {
    padding-right: 15px;
  }
  .right-wrapper {
    height: 100%;
  }
}
</style>

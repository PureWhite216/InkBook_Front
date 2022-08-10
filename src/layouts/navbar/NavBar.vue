<template>
  <div class="vaw-nav-bar-wrapper">
    <div style="flex: 1">
      <el-popover
        v-model="visible_search"
        placement="bottom"
        width="250"
        height="400"
      >
        <el-select v-model="value_search" placeholder="请选择" @change="getSearchList">
          <el-option
            v-for="item in options_search"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-table v-loading="loading" :data="searchList" height="400" @row-dblclick="toEditor">
          <el-table-column v-if="value_search === 0" property="project_name" label="名称" align="left" />
          <el-table-column v-if="value_search === 1" property="doc_name" label="名称" align="left" />
          <el-table-column v-if="value_search === 2" property="axure_name" label="名称" align="left" />
        </el-table>
        <el-input slot="reference"  class="search-input" v-model="keyword_search" placeholder="全局搜索" prefix-icon="el-icon-search" size="mini" style="width: 200px; margin-left: 20px" @input="visible_search = true,getSearchList()" />
      </el-popover>
      <!-- <el-popover
        v-model="searchProject_visible"
        placement="top"
        width="450"
        height="400"
      >
        <el-select value="" />
        <el-table v-loading="loading" :data="searchProjectList" height="400">
          <el-table-column width="80" property="project_name" label="名称" align="center" />
          <el-table-column width="140" property="project_info" label="简介" align="center" />
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
        <el-input slot="reference" v-model="keyword_project" placeholder="搜索" prefix-icon="el-icon-search" size="mini" style="width: 200px; margin-left: 20px" @input="searchProject_visible = true,getSearchProjectList()" />
      </el-popover> -->
    </div>
    <!-- <<<<<<< HEAD -->
    <!-- <div>
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
          <el-table-column width="80" property="doc_name" label="名称" align="center" />
          <el-table-column width="140" property="project_name" label="所属项目" align="center" />
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
        </el-button> -->
    <!-- <el-input slot="reference" v-model="keyword" placeholder="Search" prefix-icon="el-icon-search" size="mini" style="width: 200px; margin-left: 20px" @input="search_visible = true,getSearchDocList()" /> -->
    <!-- </el-popover>
    </div> -->
    =======
    <!--    <div>-->
    <!--      <el-popover-->
    <!--        v-model="search_visible"-->
    <!--        placement="top"-->
    <!--        width="450"-->
    <!--        height="400"-->
    <!--      >-->
    <!--        <p>搜索文档</p>-->
    <!--        <el-input-->
    <!--          v-model="keyword"-->
    <!--          placeholder="输入文件名"-->
    <!--          style="width: 80%;margin: auto"-->
    <!--        />-->
    <!--        <div style="text-align: left; margin: 0">-->
    <!--          <el-button size="mini" style="margin-top:10px" @click="getSearchDocList()">确定</el-button>-->
    <!--        </div>-->
    <!--        <el-table v-loading="loading" :data="searchDocList" height="400">-->
    <!--          <el-table-column width="80" property="doc_name" label="名称" align="center" />-->
    <!--          <el-table-column width="140" property="project_name" label="所属项目" align="center" />-->
    <!--          <el-table-column width="200" label="操作" align="center">-->
    <!--            <template slot-scope="scope">-->
    <!--              <el-button-->
    <!--                size="mini"-->
    <!--                type="primary"-->
    <!--                :underline="false"-->
    <!--                text-align="left"-->
    <!--                icon="el-icon-view"-->
    <!--                @click="viewSearchWord(scope.row)"-->
    <!--              >查看</el-button>-->
    <!--              <el-button-->
    <!--                size="mini"-->
    <!--                type="warning"-->
    <!--                :underline="false"-->
    <!--                text-align="left"-->
    <!--                icon="el-icon-star-on"-->
    <!--                @click="Like(scope.row)"-->
    <!--              >收藏</el-button>-->
    <!--            </template>-->
    <!--          </el-table-column>-->
    <!--        </el-table>-->
    <!--        <el-button-->
    <!--          slot="reference"-->
    <!--          style="margin-inline:10px; color: white; background: #2c2c2c"-->
    <!--          size="mini"-->
    <!--          icon="el-icon-search"-->
    <!--        >搜索-->
    <!--        </el-button>-->
    <!--      </el-popover>-->
    <!--    </div>-->
    <!-- >>>>>>> b44e00c8faee1082d524c57ae0f19f96ea1667fc -->
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
      searchProject_visible: false,
      search_visible: false,
      visible_search: false,
      loading: false,
      searchList: [],
      searchDocList: [],
      searchProjectList: [],
      searchAxureList: [],
      deprecatedList: [],
      keyword: null,
      keyword_project: null,
      keyword_search: null,
      form_getSearchProjectList: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        team_id: localStorage.getItem('team_id'),
        keyword: null
      },
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
      },
      form_getTeam: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: 0
      },
      options_search: [
        {
          value: 0,
          label: '项目'
        },
        {
          value: 1,
          label: '文档'
        },
        {
          value: 2,
          label: '原型'
        }
      ],
      value_search: 0
    }
  },
  methods: {
    toEditor(val) {
      this.toGroupFile(val)
      if (this.value_search === 0) {
        this.toProject(val)
      } else if (this.value_search === 1) {
        this.toDocEditor(val)
      } else if (this.value_search === 2) {
        this.toAxureEditor(val)
      }
    },
    toGroupFile(item) {
      localStorage.setItem('team_id', item.team_id)
      localStorage.setItem('team_name', item.team_name)
      localStorage.setItem('team_info', item.team_info)
      this.form_getTeam.teamId = item.team_id
      this.$axios.post('/team/getTeam', qs.stringify(this.form_getTeam))
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('prj_root_id', res.data.data[0].prj_root_id)
          localStorage.setItem('root_id', res.data.data[0].root_id)
          console.log(res.data.data[0].prj_root_id)
        }
      })
    },
    toProject(item) {
      localStorage.setItem('project_id', item.project_id)
      localStorage.setItem('project_name', item.project_name)
      localStorage.setItem('project_info', item.project_info)
      this.$router.push('/redirect/list/table-group-project')
    },
    toDocEditor(val) {
      if (val.type === 'documentation') {
        localStorage.setItem('flag', 'out')
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
              localStorage.setItem('doc_content', res.data.data[0].doc_content)
              this.$router.push('/redirect/editor/rich-text')
            } else {
              this.$message.error(res.data.message)
            }
          })
      }
    },
    toAxureEditor(val) {
      localStorage.setItem('axure_id', val.axure_id)
      localStorage.setItem('axure_name', val.axure_name)
      localStorage.setItem('axure_info', val.axure_info)
      localStorage.setItem('Token', getters.getToken(state))
      this.$router.push('/redirect/posterEditor')
    },
    getSearchList() {
      if (this.value_search === 0) {
        this.getSearchProjectList()
        this.searchList = this.searchProjectList
      } else if (this.value_search === 1) {
        this.getSearchDocList()
        this.searchList = this.searchDocList
      } else if (this.value_search === 2) {
        this.getSearchAxureList()
        this.searchList = this.searchAxureList
      }
    },
    getSearchProjectList() {
      this.loading = true
      this.searchProjectList = []
      this.$axios.get('/project/search', {
              params: {
                token: getters.getToken(state),
                user_id: getters.getUserId(state),
                keyword: this.keyword_search
              }
            })
        .then((res) => {
          if (res.data.success) {
            for (let i = 0; i < res.data.data.length; i++) {
              const projects = {
                project_id: 0,
                team_id: 0,
                project_name: '',
                project_info: '',
                team_name: null,
                team_info: null
              }
              projects.project_id = res.data.data[i].project_id
              projects.team_id = res.data.data[i].team_id
              projects.project_name = res.data.data[i].project_name
              projects.project_info = res.data.data[i].project_info
              projects.team_name = res.data.data[i].team_name
              projects.team_info = res.data.data[i].team_info
              if (!res.data.data[i].deprecated) { this.searchProjectList.push(projects) }
              // this.$message.success(res.data.message)
            }
          } else {
             // this.$message.error(res.data.message)
          }
           this.loading = false
         })
    },
    getSearchDocList() {
      this.loading = true
      this.searchDocList = []
      this.$axios.get('/doc/searchDoc', {
              params: {
                token: getters.getToken(state),
                keyword: this.keyword_search
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
                is_favorite: null,
                project_name: null,
                type: null,
                team_id: null,
                team_name: null,
                team_info: null
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
              docs.project_name = res.data.data[i].project_name
              docs.type = res.data.data[i].type
              docs.team_name = res.data.data[i].team_name
              docs.team_id = res.data.data[i].team_id
              docs.team_info = res.data.data[i].team_info
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
        this.loading = false
    },
    getSearchAxureList() {
      this.loading = true
      this.searchAxureList = []
      this.$axios.get('/axure/searchAxure', {
              params: {
                token: getters.getToken(state),
                keyword: this.keyword_search,
                team_id: localStorage.getItem('team_id')
              }
            })
        .then((res) => {
          if (res.data.success) {
            for (let i = 0; i < res.data.data.length; i++) {
              const axures = {
                axure_info: null,
                axure_id: null,
                project_id: null,
                axure_name: null,
                title: null,
                config: null,
                items: null,
                last_edit: null,
                create_user: null,
                isFavorite: null,
                team_id: null,
                team_name: null,
                team_info: null
              }
              axures.axure_info = res.data.data[i].axure_info
              axures.axure_id = res.data.data[i].axure_id
              axures.project_id = res.data.data[i].project_id
              axures.axure_name = res.data.data[i].axure_name
              axures.title = res.data.data[i].title
              axures.config = res.data.data[i].config
              axures.items = res.data.data[i].items
              axures.last_edit = res.data.data[i].last_edit
              axures.create_user = res.data.data[i].create_user
              axures.isFavorite = res.data.data[i].isFavorite === 1
              axures.team_id = res.data.data[i].team_id
              axures.team_name = res.data.data[i].team_name
              axures.team_info = res.data.data[i].team_info
              let flag = 0
              for (let i = 0; i < this.searchAxureList.length; i++) {
                if (this.searchAxureList[i].axure_id === axures.axure_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.searchAxureList.push(axures) }
              // this.$message.success(res.data.message)
            }
          } else {
             // this.$message.error(res.data.message)
          }
           this.loading = false
         })
    },
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
<style lang="scss">
    .search-input{
        .el-input__inner{
          height: 50px!important;
          border:none;
          background-color: rgba(62, 62, 61, 0.627) !important;
          color: azure !important;;
        }
        .el-input__inner:focus{
          border:important;
        }
    }
</style>

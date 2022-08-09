<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="left">
        <el-button
          slot="reference"
          class="back-button"
          float="left"
          @click="toProject()"
        >
          <i class="el-icon-back"></i>
        </el-button>
        <div style="float: right">
          <div id="projectName" class="projecttitle">
            {{ project_name }}
          </div>
          <div id="teamName" class="teamtitle">
            该项目属于团队{{ team_name }}
          </div>
        </div>
      </template>

      <template slot="right">
        <el-popover
          v-model="visible"
          placement="top"
          width="350"
        >
          <el-button
            slot="reference"
            class="button-style"
            style="border-color: #57b1ff"
            @click="dialogWordVisible = true"
          >创建文档
            <i class="el-icon-plus"></i>
          </el-button>
        </el-popover>

        <el-popover
          v-model="visible"
          placement="top"
          width="350"
          trigger="click"
        >
          <el-button
            slot="reference"
            class="button-style"
            style="border-color: #a15aff"
            @click="dialogPageVisible = true"
          >创建原型
            <i class="el-icon-plus"></i>
          </el-button>
        </el-popover>

        <el-popover
          v-model="visible"
          placement="top"
          width="350"
        >
          <el-button
            slot="reference"
            class="button-style"
            style="border-color: #ffd45c"
            @click="createUML()"
          >创建uml
            <i class="el-icon-plus"></i>
          </el-button>
        </el-popover>

        <el-popover
          v-model="visible"
          placement="top"
          width="350"
        >
          <el-button
            slot="reference"
            class="button-style"
          ><el-dropdown trigger="click" @command="onCommad">
            <div class="action-wrapper" style="font-size: 16px ;font-weight: bold">
              <i class="el-icon-setting"></i>
              设置
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                <el-button type="text" @click="form_updateProject.project_name = project_name, form_updateProject.project_info = project_info, dialogUpdateProjectVisible = true">修改项目信息</el-button>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout">
                <el-button type="text" style="color: red" @click="deleteProject">删除项目</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </el-button>
        </el-popover>
      </template>
    </TableHeader>

    <el-dialog title="创建文档" :visible.sync="dialogWordVisible">
      <el-form :model="form_word">
        <el-form-item label="文档名称" :label-width="formLabelWidth">
          <el-input v-model="form_word.doc_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogWordVisible = false; form_word.doc_name = '' ">取 消</el-button>
        <el-button @click="dialogWordVisible = false; createWord()">确 定</el-button>
      </div>
      <el-row>
        <el-col v-for="(o, index) in 2" :key="o" :span="8" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/work_logo.png" class="image" />
            <div style="padding: 14px;">
              <span>模板{{ index }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="创建原型" :visible.sync="dialogPageVisible">
      <el-form :model="form_page">
        <el-form-item label="原型名称" :label-width="formLabelWidth">
          <el-input v-model="form_createAxure.axure_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="原型简介（可不填）" :label-width="formLabelWidth">
          <el-input v-model="form_createAxure.axure_info" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPageVisible = false; form_page.page_name = '' ">取 消</el-button>
        <el-button @click="createAxure(), dialogPageVisible = false">确 定</el-button>
      </div>
      <el-row>
        <el-col v-for="(o, index) in 2" :key="o" :span="8" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/work_logo.png" class="image" />
            <div style="padding: 14px;">
              <span>模板{{ index }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">预览</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="修改项目信息" :visible.sync="dialogUpdateProjectVisible">
      <el-form :model="form_updateProject">
        <el-form-item label="项目新名称" :label-width="formLabelWidth">
          <el-input v-model="form_updateProject.project_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目新简介（可不填）" :label-width="formLabelWidth">
          <el-input v-model="form_updateProject.project_info" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateProjectVisible = false; form_updateProject.project_name = '' ">取 消</el-button>
        <el-button @click="updateProject(), dialogUpdateProjectVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改文档信息" :visible.sync="dialogUpdateDocInfoVisible">
      <el-form :model="form_updateDocInfo">
        <el-form-item label="文档新名称" :label-width="formLabelWidth">
          <el-input v-model="form_updateDocInfo.doc_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="文档新简介（可不填）" :label-width="formLabelWidth">
          <el-input v-model="form_updateDocInfo.doc_description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateDocInfoVisible = false">取 消</el-button>
        <el-button @click="updateDocInfo(), dialogUpdateDocInfoVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改原型信息" :visible.sync="dialogUpdateAxureInfoVisible">
      <el-form :model="form_updateDocInfo">
        <el-form-item label="原型新名称" :label-width="formLabelWidth">
          <el-input v-model="form_updateAxureInfo.axure_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="原型新简介（可不填）" :label-width="formLabelWidth">
          <el-input v-model="form_updateAxureInfo.axure_info" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateAxureInfoVisible = false">取 消</el-button>
        <el-button @click="updateAxureInfo(), dialogUpdateAxureInfoVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <TableBody ref="tableBody" class="temptablebody">
      <template>
        <el-tabs :tab-position="top" style="height: 200px;" class="messagecss">
          <el-tab-pane>
            <span slot="label" class="fontClass" style="font-size: large; color: #2c2c2c"><i class="el-icon-folder-opened"></i>文档</span>
            <el-table
              ref="table"
              v-loading="tableloading"
              class="table-custom"
              :data="docList"
              :header-cell-style="tableConfig.headerCellStyle"
              :cell-style="tableConfig.cellStyle"
              :size="tableConfig.size"
              @row-dblclick="toDocEditor"
            >
              <el-table-column
                width="20"
              />
              <el-table-column
                align="center"
                label="名称"
                prop="doc_name"
                width="375px"
                sortable
              />
              <el-table-column
                align="center"
                label="更新时间"
                prop="last_edit_time"
                width="250px"
                sortable
              />
              <el-table-column
                align="center"
                label="创建者"
                prop="creator_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-dropdown trigger="click" @command="onCommad">
                    <div class="action-wrapper">
                      <span class="nick-name el-dropdown-link">
                        <i class="el-icon-more"></i>
                      </span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="!scope.row.is_favorite" icon="el-icon-star-off" command="personalCenter">
                        <el-button type="text" @click="likeDoc(scope.row)">收藏</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.is_favorite" icon="el-icon-star-on" command="personalCenter">
                        <el-button type="text" @click="unlikeDoc(scope.row)">取消收藏</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                        <el-button type="text" @click="form_updateDocInfo.doc_id = scope.row.doc_id, dialogUpdateDocInfoVisible = true">重命名</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-switch-button" command="logout">
                        <el-button type="text" @click="form_deleteDoc.doc_id = scope.row.doc_id, deleteDoc()">删除文件</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="fontClass" style="font-size: large; color: #2c2c2c"><i class="el-icon-monitor"></i>原型</span>
            <el-table
              ref="table"
              v-loading="loading"
              class="table-custom"
              :data="axureList"
              :header-cell-style="tableConfig.headerCellStyle"
              :size="tableConfig.size"
              :cell-style="tableConfig.cellStyle"
              @row-dblclick="toAxureEditor"
            >
              <el-table-column
                width="20"
              />
              <el-table-column
                align="center"
                label="名称"
                prop="axure_name"
                width="375px"
                sortable
              />
              <el-table-column
                align="center"
                label="更新时间"
                prop="last_edit"
                width="250px"
                sortable
              />
              <el-table-column
                align="center"
                label="创建者"
                prop="create_user"
                width="200px"
              />
              <el-table-column
                align="center"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-dropdown trigger="click" @command="onCommad">
                    <div class="action-wrapper">
                      <span class="nick-name el-dropdown-link">
                        <i class="el-icon-more"></i>
                      </span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-if="!scope.row.isFavorite" icon="el-icon-star-off" command="personalCenter">
                        <el-button type="text" @click="likeAxure(scope.row)">收藏</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item v-if="scope.row.isFavorite" icon="el-icon-star-on" command="personalCenter">
                        <el-button type="text" @click="unlikeAxure(scope.row)">取消收藏</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                        <el-button type="text" @click="form_updateAxureInfo.axure_id = scope.row.axure_id, dialogUpdateAxureInfoVisible = true">重命名</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-switch-button" command="logout">
                        <el-button type="text" @click="deleteAxure(scope.row)">删除原型</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </TableBody>
    <TableBody ref="tableBody" class="rightside">
      <template>
        <div class="rightsidefont">
          About
        </div>
        <el-divider />
        <div>
          <span>{{ project_info }}</span>
          <el-divider />
        </div>
      </template>
    </TableBody>

    <!--    <TableFooter-->
    <!--      :page-size="pageModel.pageSize"-->
    <!--      :total-size="pageModel.totalSize"-->
    <!--      @pageSizeChanged="pageSizeChanged"-->
    <!--      @currentChanged="currentChanged"-->
    <!--      @onRefresh="doRefresh"-->
    <!--    />-->
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
import store from '@/layouts/store'
import qs from 'qs'
// import { mapActions, mapState } from 'poster/poster.vuex'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import router from '@/router'
export default {
  name: 'TableGroupMember',
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
      visible_setPerm: true,
      loading: false,
      form_likeAxure: {
        token: getters.getToken(state),
        axure_id: null
      },
      form_updateAxureInfo: {
        token: getters.getToken(state),
        axure_id: null,
        axure_name: null,
        axure_info: null
      },
      form_likeDoc: {
        token: getters.getToken(state),
        doc_id: null,
        undo: null
      },
      form_deleteAxure: {
        token: getters.getToken(state),
        axure_id: null
      },
      form_createAxure: {
        token: getters.getToken(state),
        axure_name: null,
        axure_info: null,
        project_id: localStorage.getItem('project_id')
      },
      form_getAxureList: {
        token: getters.getToken(state),
        project_id: localStorage.getItem('project_id')
      },
      form_deleteDoc: {
        token: getters.getToken(state),
        doc_id: null,
        recycle: false
      },
      form_updateDocInfo: {
        token: getters.getToken(state),
        doc_id: null,
        doc_name: null,
        doc_description: null
      },
      form_deleteProject: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        project_id: localStorage.getItem('project_id')
      },
      form_updateProject: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        project_id: localStorage.getItem('project_id'),
        project_name: '',
        project_info: ''
      },
      form_member: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id'))
      },
      project_info: localStorage.getItem('project_info'),
      visible: false,
      form_word: {
        token: getters.getToken(state),
        project_id: localStorage.getItem('project_id'),
        doc_name: '',
        doc_description: ''
      },
      form_page: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        page_name: '',
        team_id: Number(localStorage.getItem('team_id'))
      },
      form_getDocInfo: {
        token: getters.getToken(state),
        doc_id: localStorage.getItem('doc_id')
      },
      form_deleteMember: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id')),
        deleted_id: null
      },
      form_quitTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id'))
      },
      form_setPerm: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id')),
        member_id: 0,
        perm: null
      },
      project_name: localStorage.getItem('project_name'),
      team_name: localStorage.getItem('team_name'),
      dialogWordVisible: false,
      dialogPageVisible: false,
      dialogMethodVisible: false,
      dialogUpdateProjectVisible: false,
      dialogUpdateDocInfoVisible: false,
      dialogUpdateAxureInfoVisible: false,
      axureList: [],
      deleteMemberList: [],
      docList: [],
      powerOptions: [
        {
          value: 1,
          label: '队长'
        },
        {
          value: 2,
          label: '开发者'
        },
        {
          value: 3,
          label: '观察者'
        }
      ],
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
    this.getDocList()
    this.getAxureList()
    localStorage.setItem('flag', 'user')
    localStorage.setItem('enable', 'true')
  },
  methods: {
    likeAxure(item) {
      this.form_likeAxure.axure_id = item.axure_id
      item.isFavorite = true
      this.$axios.post('/axure/addFavoriteAxure', qs.stringify(this.form_likeAxure))
         .then((res) => {
           if (res.data.success) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
    unlikeAxure(item) {
      this.form_likeAxure.axure_id = item.axure_id
      item.isFavorite = false
      this.$axios.post('/axure/deleteFavoriteAxure', qs.stringify(this.form_likeAxure))
         .then((res) => {
           if (res.data.success) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
    updateAxureInfo() {
      this.$axios.post('/axure/updateInfo', qs.stringify(this.form_updateAxureInfo))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.getAxureList()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    likeDoc(item) {
      this.form_likeDoc.doc_id = item.doc_id
      this.form_likeDoc.undo = false
      item.is_favorite = true
      this.$axios.post('/user/favorite', qs.stringify(this.form_likeDoc))
         .then((res) => {
           if (res.data.success) {
             this.$message.success(res.data.message)
            //  this.getDocList()
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
    unlikeDoc(item) {
      this.form_likeDoc.doc_id = item.doc_id
      this.form_likeDoc.undo = true
      item.is_favorite = false
      this.$axios.post('/user/favorite', qs.stringify(this.form_likeDoc))
         .then((res) => {
           if (res.data.success) {
             this.$message.success(res.data.message)
            //  this.getDocList()
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
    deleteAxure(item) {
      this.$confirm('此操作将使您删除此原型' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.form_deleteAxure.axure_id = item.axure_id
      this.$axios.post('/axure/delete', qs.stringify(this.form_deleteAxure))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.getAxureList()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    toAxureEditor(val) {
      localStorage.setItem('axure_id', val.axure_id)
      localStorage.setItem('axure_name', val.axure_name)
      localStorage.setItem('axure_info', val.axure_info)
      localStorage.setItem('Token', getters.getToken(state))
      this.$router.push('/posterEditor')
    },
    createAxure() {
      this.$axios.post('/axure/create', qs.stringify(this.form_createAxure))
         .then((res) => {
           if (res.data.success) {
             this.$message.success(res.data.message)
             this.getAxureList()
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
    getAxureList() {
      this.loading = true
      this.axureList = []
      this.$axios.post('/axure/getAxureList', qs.stringify(this.form_getAxureList))
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
                isFavorite: null
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
              let flag = 0
              for (let i = 0; i < this.axureList.length; i++) {
                if (this.axureList[i].axure_id === axures.axure_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.axureList.push(axures) }
              // this.$message.success(res.data.message)
            }
          } else {
             // this.$message.error(res.data.message)
          }
           this.loading = false
         })
    },
    toDocEditor(val) {
      localStorage.setItem('flag', 'out')
      localStorage.setItem('doc_id', val.doc_id)
      localStorage.setItem('doc_name', val.doc_name)
      localStorage.setItem('is_favorite', val.is_favorite)
      this.$axios.get('/doc/getDocInfo', {
        params: {
          token: getters.getToken(state),
          doc_id: localStorage.getItem('doc_id')
        }
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem('doc_content', res.data.data[0].doc_content)
          this.$router.push('/editor/rich-text')
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    deleteDoc() {
      this.$confirm('此操作将使您删除此文档' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
      this.$axios.post('/doc/deleteDoc', qs.stringify(this.form_deleteDoc))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.getDocList()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    updateDocInfo() {
      this.$axios.post('/doc/updateDocInfo', qs.stringify(this.form_updateDocInfo))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.getDocList()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    deleteProject() {
      this.$confirm('此操作将使您删除此项目' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
      this.$axios.post('/project/delete', qs.stringify(this.form_deleteProject))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.toProject()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    updateProject() {
      // this.form_updateProject.project_id = item.project_id
      this.$axios.post('/project/update', qs.stringify(this.form_updateProject))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.project_name = this.form_updateProject.project_name
            this.project_info = this.form_updateProject.project_info
            localStorage.setItem('project_name', this.project_name)
            localStorage.setItem('project_info', this.project_info)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    getDocList() {
      this.docList = []
      this.$axios.get('/doc/getDocList', {
              params: {
                token: getters.getToken(state),
                project_id: localStorage.getItem('project_id')
              }
            })
            .then(res => {
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
              for (let i = 0; i < this.docList.length; i++) {
                if (this.docList[i].doc_id === docs.doc_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.docList.push(docs) }
              // this.$message.success(res.data.message)
            }
              } else {
                this.$message.error(res.data.message)
              }
            })
    },
    createUML() {
      router.push('/drawio')
      // window.open('https://www.draw.io/index.html', '_blank')
      // window.open = 'https://www.draw.io/index.html'
    },
    CreatePage() {
      this.$message.error('还没写接口哪！')
    },
    setPerm(item) {
      this.form_setPerm.member_id = item.id
      this.$axios.post('/team/set_perm', qs.stringify(this.form_setPerm))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 7) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getMemberList()
        })
    },
    deleteItem(item) {
      if (item.id === this.form_deleteMember.user_id) {
        this.$confirm('此操作将使您退出此团队' + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.quitTeam()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      } else {
        this.$confirm('此操作将踢出用户成员' + item.username + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.deleteMember(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      }
    },
    handleSelectionChange(items) {
      this.deleteMemberList = items
    },
    deleteMultiItem() {
      this.$confirm('此操作将踢出您选中的所有成员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.deleteMemberList.length; i++) {
          this.deleteMember(this.deleteMemberList[i])
        }
        this.getMemberList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消踢出'
          })
        })
    },
    deleteMember(item) {
      this.form_deleteMember.deleted_id = item.id
      // console.log(item.id)
      this.$axios.post('/team/delete_member', qs.stringify(this.form_deleteMember))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getMemberList()
        })
    },
    quitTeam() {
      this.$axios.post('/team/quit_team', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.onGroupSpace()
        })
    },
    onGroupSpace() {
      store.toGroupSpace && store.toGroupSpace()
    },
    clearList() {
      this.memberList = []
    },
    onFile() {
      this.$router.push('/list/table-group-file')
    },
    toProject() {
      this.$router.replace('/list/table-group-message')
    },
    createWord() {
      this.$axios.post('/doc/newDoc', qs.stringify(this.form_word))
         .then((res) => {
           if (res.data.success) {
             this.$message.success(res.data.message)
             this.getDocList()
           } else {
             this.$message.error(res.data.message)
           }
         })
    },
    onRichTextEditor() {
      store.toRichTextEditor && store.toRichTextEditor()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.fontClass {
  font-family: 等线;
  font-weight: bold;
  font-size: 20px;
}
.morebutton {
  padding: 5px;
  border: 0;
}
.button-style {
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
  border-width: 3px;
  color: black;
  height: 45px;
}
.back-button{
  margin-top: 20px;
  font-size: 26px;
  font-weight: bold;
  color: black;
  padding: 5px;
  border: 0;
}
.spcbutton-style {
  margin: 20px;
  font-size: 14px;
  font-weight: bold;
  color: black;
  height: 35px;
}
.projecttitle {
  font-size: 46px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  float: left;
  font-family: 等线;
}
.teamtitle {
  margin-top: 30px;
  margin-left: 20px;
  font-family: 黑体;
  font-size: 18px;
  color: #777777;
  float:right;
  white-space: nowrap;
}
.temptablebody{
  height: 500px;
  width: 75%;
  float: left;
}
.messagecss{
  width: 947px;
  margin: 10px;
}
.rightside{
  float: right;
  width: 23%;
  margin: 10px;
  height: 500px;
}
.rightsidefont{
  font-size: 25px;
  margin: 10px;
}
.image{
  width: 100px;
  height: 100px;
}
</style>

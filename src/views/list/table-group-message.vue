<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="left">
        <el-button
          slot="reference"
          class="back-button"
          float="left"
          @click="toProjectlist()"
        >
          <i class="el-icon-back"></i>
        </el-button>
        <p id="teamName" class="teamtitle" v-text="team_name">
          team_name
        </p>
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
            style="border-color: #ffd45c"
            @click="dialogInviteVisible = true"
          >邀请成员
            <i class="el-icon-user"></i>
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
            style="border-color: #57b1ff"
            @click="form_createProject.project_name = '', form_createProject.project_info = '', dialogCreateProjectVisible = true"
          >创建新项目
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
                <el-button type="text" @click="dialogRenameVisible = true">团队重命名</el-button>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                <el-button type="text" @click="quitTeam">退出团队</el-button>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" command="logout">
                <el-button type="text" style="color: red" @click="deleteTeam">删除团队</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </el-button>
        </el-popover>
      </template>
    </TableHeader>
    <el-dialog title="邀请成员" :visible.sync="dialogInviteVisible">
      <el-form :model="form_invite">
        <el-form-item label="成员邮箱" :label-width="formLabelWidth">
          <el-input v-model="form_invite.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInviteVisible = false; form_invite.email = '' ">取 消</el-button>
        <el-button @click="invite(),dialogInviteVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="团队重命名" :visible.sync="dialogRenameVisible">
      <el-form :model="form_rename">
        <el-form-item label="新的团队名称" :label-width="formLabelWidth">
          <el-input v-model="form_rename.teamName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRenameVisible = false; form_rename.teamName = '' ">取 消</el-button>
        <el-button @click="Rename">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="创建新项目" :visible.sync="dialogCreateProjectVisible">
      <el-form :model="form_project">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form_createProject.project_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="项目简介(可不填)" :label-width="formLabelWidth">
          <el-input v-model="form_createProject.project_info" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateProjectVisible = false; form_createProject.project_name = '' ">取 消</el-button>
        <el-button @click="createProject(), dialogCreateProjectVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改项目信息" :visible.sync="dialogUpdateProjectVisible">
      <el-form :model="form_project">
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
    <el-dialog title="设置权限" :visible.sync="dialogPerm" style="width: 1000px; margin: auto;">
      <el-form :model="form_power">
        <el-select v-model="form_power.userPerm" placeholder="请选择" autocomplete="off">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPerm = false; form_power.userPerm = '' ">取 消</el-button>
        <el-button @click="givePower">确 定</el-button>
      </div>
    </el-dialog>
    <TableBody ref="tableBody" class="temptablebody">
      <template>
        <el-tabs :tab-position="top" style="height: 200px;" class="messagecss">
          <el-tab-pane>
            <span slot="label" class="fontClass" style="font-size: large; color: #2c2c2c">项目</span>
            <el-table
              ref="table"
              v-loading="tableloading"
              class="table-custom"
              :data="projectList"
              :header-cell-style="tableConfig.headerCellStyle"
              :size="tableConfig.size"
              :cell-style="tableConfig.cellStyle"
              @row-dblclick="handleCurrentChange"
            >
              <el-table-column
                width="45"
              />
              <el-table-column
                align="center"
                label="名称"
                prop="project_name"
                width="300px"
              />
              <el-table-column
                align="center"
                label="简介"
                prop="project_info"
                width="400px"
              />
              <el-table-column
                align="center"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    slot="reference"
                    class="morebutton"
                  >
                    <el-dropdown trigger="click" @command="onCommad">
                      <div class="action-wrapper" style="font-size: 16px ;font-weight: bold">
                        <span class="nick-name el-dropdown-link">
                          <i class="el-icon-more"></i>
                        </span>
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                          <el-button type="text" @click="form_updateProject.project_id = scope.row.project_id, form_updateProject.project_name = scope.row.project_name, form_updateProject.project_info = scope.row.project_info,dialogUpdateProjectVisible = true">修改项目信息</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit-outline" command="logout">
                          <el-button type="text" @click="copyProject(scope.row)">创建项目副本</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" command="logout">
                          <el-button type="text" @click="deprecateProjectItem(scope.row)">弃置项目</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="fontClass" style="font-size: large; color: #2c2c2c">成员</span>
            <el-table
              ref="table"
              v-loading="loading"
              :data="memberList"
              :header-cell-style="tableConfig.headerCellStyle"
              :size="tableConfig.size"
              :cell-style="tableConfig.cellStyle"
            >
              <el-table-column
                width="45"
              />
              <el-table-column
                align="center"
                label="名称"
                prop="username"
                width="200px"
              />
              <el-table-column
                align="center"
                label="真实姓名"
                prop="real_name"
                width="200px"
              />
              <el-table-column
                align="center"
                label="电子邮箱"
                prop="email"
                width="250px"
              />
              <el-table-column
                align="center"
                label="身份"
                prop="user_perm"
                width="150px"
              />
              <el-table-column
                align="center"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    slot="reference"
                    class="spcbutton-style"
                  >
                    <el-dropdown trigger="click" @command="onCommad">
                      <div class="action-wrapper">
                        <span class="nick-name el-dropdown-link">
                          <i class="el-icon-more"></i>
                        </span>
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-circle-check" command="personalCenter">
                          <el-button type="text" @click="form_power.memberId = scope.row.user_id, form_power.userPerm = scope.row.user_perm, dialogPerm = true">赋予管理员权限</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-close" command="logout">
                          <el-button type="text" @click="deleteMemberItem(scope.row)">移出团队</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="fontClass" style="font-size: large; color: #2c2c2c">文档中心</span>
            <el-table
              ref="table"
              v-loading="loading"
              :data="tableData"
              :header-cell-style="tableConfig.headerCellStyle"
              :size="tableConfig.size"
              :cell-style="tableConfig.cellStyle"
              lazy
              row-key="dir_id"
              :expand-row-keys="expands"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              @row-dblclick="toDocEditor"
            >
              <el-table-column
                align="center"
                label="名称"
                width="450"
              >
                <template slot-scope="scope">
                  <i v-if="scope.row.type === 'documentation'" class="el-icon-document"></i>
                  <i v-if="scope.row.type != 'documentation'" class="el-icon-folder"></i>
                  <span style="margin-left: 10px">{{ scope.row.dir_name }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="创建时间"
                prop="dir_createTime"
                width="200px"
              />
              <el-table-column
                align="center"
                label="操作"
                width="260"
              >
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.type === 'dir' && scope.row.dir_id !== prj_root_id && scope.row.dir_parent_id !== prj_root_id"
                    slot="reference"
                    class="morebutton"
                  ><el-dropdown trigger="click">
                    <div class="action-wrapper" style="font-size: 16px ;font-weight: bold">
                      <i class="el-icon-more"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-document-add" command="logout">
                        <el-button type="text" style="color: green" @click="form_createDoc.dest_folder_id = scope.row.dir_id, dialogCreateDoc = true">创建团队文件</el-button>
                      </el-dropdown-item>
                      <el-dropdown-item icon="el-icon-folder-add" command="logout">
                        <el-button type="text" style="color: green" @click="form_createDir.dest_folder_id = scope.row.dir_id, dialogCreateDir = true">创建文件夹</el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" class="fontClass" style="font-size: large; color: #2c2c2c">回收站</span>
            <el-table
              ref="table"
              v-loading="tableloading"
              class="table-custom"
              :data="deprecatedList"
              :header-cell-style="tableConfig.headerCellStyle"
              :size="tableConfig.size"
              :cell-style="tableConfig.cellStyle"
              @row-dblclick="handleCurrentChange"
            >
              <el-table-column
                width="45"
              />
              <el-table-column
                align="center"
                label="名称"
                prop="project_name"
                width="300px"
              />
              <el-table-column
                align="center"
                label="简介"
                prop="project_info"
                width="400px"
              />
              <el-table-column
                align="center"
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    slot="reference"
                    class="morebutton"
                  >
                    <el-dropdown trigger="click" @command="onCommad">
                      <div class="action-wrapper" style="font-size: 16px ;font-weight: bold">
                        <span class="nick-name el-dropdown-link">
                          <i class="el-icon-more"></i>
                        </span>
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-edit-outline" command="personalCenter">
                          <el-button type="text" @click="form_updateProject.project_id = scope.row.project_id, form_updateProject.project_name = scope.row.project_name, form_updateProject.project_info = scope.row.project_info,dialogUpdateProjectVisible = true">修改项目信息</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit-outline" command="logout">
                          <el-button type="text" @click="unDeprecateProject(scope.row)">恢复项目</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" command="logout">
                          <el-button type="text" @click="deleteProjectItem(scope.row)">删除项目</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-button>
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
          <span>{{ teamInfo }}</span>
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
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
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
      expands: ['2'],
      tableData: [],
      visible_setPerm: true,
      loading: false,
      dialogRenameVisible: false,
      dialogPerm: false,
      dialogCreateDoc: false,
      dialogCreateDir: false,
      form_createDir: {
        token: getters.getToken(state),
        dict_name: '',
        dest_folder_id: ''
      },
      form_createDoc: {
        token: getters.getToken(state),
        doc_name: '',
        team_id: localStorage.getItem('team_id'),
        dest_folder_id: ''
      },
      form_member: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: localStorage.getItem('team_id')
      },
      teamInfo: localStorage.getItem('team_info'),
      form_power: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: localStorage.getItem('team_id'),
        memberId: '',
        userPerm: ''
      },
      form_getProjectList: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        team_id: localStorage.getItem('team_id')
      },
      form_createProject: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        team_id: localStorage.getItem('team_id'),
        project_name: '',
        project_info: ''
      },
      form_deleteProject: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        project_id: 0
      },
      form_copyProject: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        team_id: localStorage.getItem('team_id'),
        project_id: 0
      },
      form_deprecateProject: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        project_id: 0,
        deprecated: true
      },
      form_unDeprecateProject: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        project_id: 0,
        deprecated: false
      },
      form_updateProject: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        project_id: 0,
        project_name: '',
        project_info: ''
      },
      form_getTeam: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: Number(localStorage.getItem('team_id'))
      },
      visible: false,
      form_invite: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: Number(localStorage.getItem('team_id')),
        email: ''
      },
      form_project: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        project_name: '',
        team_id: Number(localStorage.getItem('team_id'))
      },
      form_deleteMember: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        teamId: Number(localStorage.getItem('team_id')),
        memberId: null
      },
      form_rename: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: Number(localStorage.getItem('team_id')),
        teamName: ''
      },
      form_quitTeam: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        teamId: Number(localStorage.getItem('team_id'))
      },
      form_setPerm: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id')),
        member_id: 0,
        perm: null
      },
      team_name: localStorage.getItem('team_name'),
      prj_root_id: localStorage.getItem('prj_root_id'),
      dialogInviteVisible: false,
      dialogCreateProjectVisible: false,
      dialogUpdateProjectVisible: false,
      dialogMethodVisible: false,
      memberList: [],
      projectList: [],
      deprecatedList: [],
      deleteMemberList: [],
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
      },
      options: [{
          value: '0',
          label: '超管'
        }, {
          value: '1',
          label: '管理员'
        }, {
          value: '2',
          label: '成员'
        }
      ],
      value: ''
    }
  },
  created() {
    localStorage.setItem('flag', 'user')
    this.getMemberList()
    this.getProjectList()
    this.getDoc()
  },
  methods: {
    CreateDoc() {
      this.$axios.post('/doc/newDoc', qs.stringify(this.form_createDoc))
      .then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
        this.getDoc()
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
          this.getDoc()
        })
    },
    getDoc() {
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
              this.tableData = res.data.data
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    copyProject(item) {
      this.form_copyProject.project_id = item.project_id
      this.$axios.post('/project/copy', qs.stringify(this.form_copyProject))
      .then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message)
          this.getProjectList()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    toDocEditor(val) {
      if (val.type === 'documentation') {
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
            } else {
              this.$message.error(res.data.message)
            }
          })
        this.$router.push('/editor/rich-text')
      }
    },
    unDeprecateProject(item) {
      this.form_unDeprecateProject.project_id = item.project_id
      this.$axios.post('/project/deprecate', qs.stringify(this.form_unDeprecateProject))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getProjectList()
        })
    },
    deprecateProjectItem(item) {
      this.$confirm('此操作将使您弃置此项目使其进入回收站' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deprecateProject(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    deprecateProject(item) {
      this.form_deprecateProject.project_id = item.project_id
      this.$axios.post('/project/deprecate', qs.stringify(this.form_deprecateProject))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getProjectList()
        })
    },
    givePower() {
      // /*if (this.form_power.userPerm === '管理员') {
      //   this.form_power.userPerm = 1
      // } else if (this.form_power.userPerm === '成员') {
      //   this.form_power.userPerm = 2
      // } else {
      //   this.form_power.userPerm = 0
      // }*/
      this.$axios.post('/team/setPerm', qs.stringify(this.form_power))
      .then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message)
        } else {
          this.$message.error(res.data.message)
        }
        this.dialogPerm = false
        this.getMemberList()
      })
    },
    getProjectList() {
      this.loading = true
      this.projectList = []
      this.deprecatedList = []
      this.$axios.post('/project/getProjectList', qs.stringify(this.form_getProjectList))
        .then((res) => {
          if (res.data.success) {
            for (let i = 0; i < res.data.data.length; i++) {
              const projects = {
                project_id: 0,
                team_id: 0,
                project_name: '',
                project_info: ''
              }
              projects.project_id = res.data.data[i].project_id
              projects.team_id = res.data.data[i].team_id
              projects.project_name = res.data.data[i].project_name
              projects.project_info = res.data.data[i].project_info
              if (!res.data.data[i].deprecated) { this.projectList.push(projects) } else { this.deprecatedList.push(projects) }
              // this.$message.success(res.data.message)
            }
          } else {
             // this.$message.error(res.data.message)
          }
           this.loading = false
         })
    },
    getMemberList() {
      this.loading = true
      this.memberList = []
      this.$axios.post('/team/getMemberList', qs.stringify(this.form_member))
        .then((res) => {
          if (res.data.success) {
            for (let i = 0; i < res.data.data.length; i++) {
              const members = {
                user_id: 0,
                username: '',
                email: '',
                user_perm: '',
                real_name: ''
              }
              members.user_id = res.data.data[i].user_id
              members.real_name = res.data.data[i].real_name
              members.email = res.data.data[i].email
              members.username = res.data.data[i].username
              if (res.data.data[i].user_perm === 0) {
                members.user_perm = '超管'
              } else if (res.data.data[i].user_perm === 1) {
                members.user_perm = '管理员'
              } else if (res.data.data[i].user_perm === 2) {
                members.user_perm = '成员'
              }
              let flag = 0
              for (let i = 0; i < this.memberList.length; i++) {
                if (this.memberList[i].user_id === members.user_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.memberList.push(members) }
              // this.$message.success(res.data.message)
            }
          } else {
             this.$message.error(res.data.message)
          }
           this.loading = false
         })
    },
    createProject() {
      this.$axios.post('/project/create', qs.stringify(this.form_createProject))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getProjectList()
        })
    },
    Rename() {
      this.$axios.post('/team/update', qs.stringify(this.form_rename))
      .then(res => {
          if (res.data.success === true) {
            this.team_name = this.form_rename.teamName
            this.$message.success(res.data.message)
            this.dialogRenameVisible = false
            this.form_rename.teamName = ''
          } else {
            this.$message.error(res.data.message)
            this.dialogRenameVisible = false
            this.form_rename.teamName = ''
          }
      })
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
    deleteProjectItem(item) {
      this.$confirm('此操作将使您删除此项目' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
      this.deleteProject(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    deleteProject(item) {
      this.form_deleteProject.project_id = item.project_id
      this.$axios.post('/project/delete', qs.stringify(this.form_deleteProject))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getProjectList()
        })
    },
    updateProject() {
      // this.form_updateProject.project_id = item.project_id
      this.$axios.post('/project/update', qs.stringify(this.form_updateProject))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getProjectList()
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
    deleteMemberItem(item) {
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
    },
    deleteMember(item) {
      this.form_deleteMember.memberId = item.user_id
      // console.log(item.id)
      this.$axios.post('/team/deleteMember', qs.stringify(this.form_deleteMember))
        .then((res) => {
          // console.log(5)
          if (res.data.success) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getMemberList()
        })
    },
    quitTeam() {
      this.$confirm('此操作将使您退出该团队' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
      this.$axios.post('/team/quitTeam', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.onGroupSpace()
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
    deleteTeam() {
      this.$confirm('此操作将使您删除该团队' + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
      this.$axios.post('/team/delete', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message)
            this.onGroupSpace()
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
    handleCurrentChange(val) {
      this.toProject(val)
    },
    onGroupSpace() {
      store.toGroupSpace && store.toGroupSpace()
    },
    clearList() {
      this.memberList = []
    },
    toProject(item) {
      localStorage.setItem('project_id', item.project_id)
      localStorage.setItem('project_name', item.project_name)
      localStorage.setItem('project_info', item.project_info)
      this.$router.push('/list/table-group-project')
    },
    toProjectlist() {
      this.$router.replace('/list/table-group')
    },
    invite() {
      this.$axios.post('/team/inviteMember', qs.stringify(this.form_invite))
         .then((res) => {
           if (res.data.success) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
           this.getMemberList()
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
.table-custom {
  width: 1000px;
}
.teamtitle {
  font-size: 50px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  float: right;
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
</style>

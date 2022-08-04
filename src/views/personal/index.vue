<template>
  <div class="main-container">
    <div class="content-wrapper margin-top">
      <el-card
        :body-style="{padding: 0}"
        shadow="hover"
      >
        <div class="flex justify-between padding-sm solid-bottom">
          <el-link :underline="false">基本信息</el-link>
        </div>
        <el-form
          v-model="baseInfoModel"
          label-width="80px"
          class="form-wrapper"
          size="small"
          label-position="right"
        >
          <el-col :span="24">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="http://101.42.171.88:8090/user/uploadFile?token=<getters.getToken(state)>"
                :on-success="handleChange"
                :before-upload="beforeUpload"
                :show-file-list="false"
              >
                <img v-if="personalInformation.avatar" :src="personalInformation.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="名称">
              <el-input
                v-model="personalInformation.username"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="真实姓名">
              <el-input
                v-model="personalInformation.real_name"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="ID">
              <el-input
                v-model="personalInformation.user_id"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="邮箱">
              <el-input
                v-model="personalInformation.email"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="密码">
              <el-input
                v-model="baseInfoModel.password"
                :disabled="true"
              />
              <el-button
                size="mini"
                type="Placeholder"
                :underline="false"
                @click="dialogVisible_changePassword = true"
              >修改</el-button>
              <el-dialog title="修改密码" :visible.sync="dialogVisible_changePassword" width="40%" center>
                <el-form :model="form_changePassword">
                  <el-form-item label="原密码" :label-width="formLabelWidth">
                    <el-input v-model="form_changePassword.old_password" autocomplete="off" type="password" />
                  </el-form-item>
                  <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="form_changePassword.password1" autocomplete="off" type="password" />
                  </el-form-item>
                  <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="form_changePassword.password2" autocomplete="off" type="password" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_changePassword = false, clearPassword()">取 消</el-button>
                  <el-button @click="changePassword(), dialogVisible_changePassword = false, clearPassword()">确 定</el-button>
                </div>
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col style="margin-left: 40px">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              style="margin-bottom: 20px"
              :underline="false"
              @click="logOff_1"
            >注销账号</el-button>
          </el-col>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import store from '@/layouts/store/index'
export default {
  name: 'Personal',
  data() {
    return {
      dialogVisible_changePassword: false,
      loading: false,
      file: '',
      personalInformation: {
        username: null,
        email: null,
        sex: null,
        avatar: null,
        user_id: null
      },
      form_getPersonalInformation: {
        authorization: getters.getToken(state),
        username: getters.getUserName(state)
      },
      form_deleteUser: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        password: ''
      },
      form_changePassword: {
        mode: 1,
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        old_password: null,
        password1: null,
        password2: null
      },
      imageUrl: '',
      baseInfoModel: {
        name: '',
        id: '',
        real_name: '',
        email: '',
        password: ''
      },
      formLabelWidth: 180
    }
  },
  created() {
    this.getPersonalInformation()
  },
  methods: {
    handleChange(res, file) {
      console.log(res.data.message)
      if (res.data.success) {
        this.$message.success(res.data.message)
      } else {
        this.$message.error(res.data.message)
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    },
    clearPassword() {
      this.form_changePassword.old_password = ''
      this.form_changePassword.password1 = ''
      this.form_changePassword.password2 = ''
    },
    logOff_1() {
      this.$confirm('此操作将删除此账户,请确定是否是用户本人操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.logOff_2()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          })
        })
    },
    logOff_2() {
      this.$confirm('此操作将彻底删除此账户,并且会删除所有个人文件，退出所有团队，是否继续?(注意，如果有身为队长的团队则无法继续注销）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.logOff_3()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          })
        })
    },
    logOff_3() {
      this.$confirm('真的要离开我们吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.logOff()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          })
        })
    },
    deleteUser() {
      this.$axios.post('/user/delete_user', qs.stringify(this.form_deleteUser))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 3) {
            this.$message.success('非常感谢您对墨书的支持，希望下次再会!')
            // this.$router.push('/login')
            store.logout()
            store.onLogout && store.onLogout()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    getPersonalInformation() {
      this.loading = true
      this.$axios.get('/user/selectUserByUserId', {
        params: {
          user_id: getters.getUserId(state)
        }
      })
        .then((res) => {
          // console.log(5)
          if (res.data.success === true) {
            this.personalInformation.username = res.data.data.username
            this.personalInformation.email = res.data.data.email
            this.personalInformation.real_name = res.data.data.real_name
            this.personalInformation.avatar = res.data.data.avatar
            this.personalInformation.user_id = res.data.data.user_id
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
    },
    logOff() {
      this.$prompt('请输入原密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.form_deleteUser.password = value
          this.deleteUser()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消注销'
          })
        })
    },
    changePassword() {
      this.$axios.post('/user/changePassword', qs.stringify(this.form_changePassword))
        .then((res) => {
          // console.log(5)
          if (res.data.success === true) {
            this.$message.success(res.data.message)
            store.logout()
            store.onLogout && store.onLogout()
            // this.$router.push('/login')
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.content-wrapper {
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    .form-wrapper {
      margin-top: 2%;
      width: 98%;
      padding-left: 4%;
    }
  }
  @media screen and (min-width: 768px) {
    .form-wrapper {
      margin-top: 2%;
      width: 50%;
      padding-left: 4%;
    }
  }
}
</style>

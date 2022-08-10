<template>
  <div class="main-container" style="font-family: 等线">
    <el-row style="background: #2f2f2f; min-height: 40px">
      <el-col :span="8">
        <el-button class="backbutton" style="margin-left: 20px; margin-top: 3px" @click="back">
          <i class="el-icon-back" style="font-size: x-large"></i>
        </el-button>
      </el-col>
      <el-col :span="8" style="text-align: center; margin-top: 12px">
        <div style="font-size: 16px; color: #ececec" contenteditable="true">
          {{ axure_name }}
        </div>
        <div>
          <!--          <el-button style="padding: 5px; background: #2f2f2f; border: 0">-->
          <!--            <i class="el-icon-more" style="font-size: large; color: #ececec"></i>-->
          <!--          </el-button>-->
        </div>
      </el-col>
    </el-row>
    <el-dialog title="创建原型" :visible.sync="dialogPageVisible">
      <el-form :model="form_createAxure">
        <el-form-item label="原型名称" :label-width="formLabelWidth">
          <el-input v-model="form_createAxure.axure_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="原型简介（可不填）" :label-width="formLabelWidth">
          <el-input v-model="form_createAxure.axure_info" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPageVisible = false; form_createAxure.axure_name = '' ">取消</el-button>
        <el-button @click="createAxure(), form_createAxure.axure_name = '',dialogPageVisible = false">空模板创建</el-button>
      </div>
      <el-row>
        <el-col v-for="(o, index) in 4" :key="o" :span="8" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <span v-if="index === 0">登录模板</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button" @click="flag=index+1, toPreview()">预览</el-button>
                <el-button type="text" class="button" @click="form_createAxure.axure_template_id = index + 1, createAxure(), dialogPageVisible = false">创建</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="修改原型信息" :visible.sync="dialogUpdateAxureInfoVisible">
      <el-form :model="form_updateAxureInfo">
        <el-form-item label="原型新名称" :label-width="formLabelWidth">
          <el-input v-model="form_updateAxureInfo.axure_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="原型新简介（可不填）" :label-width="formLabelWidth">
          <el-input v-model="form_updateAxureInfo.axure_info" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateAxureInfoVisible = false, form_updateAxureInfo.axure_name = '',form_updateAxureInfo.axure_info = ''">取 消</el-button>
        <el-button @click="updateAxureInfo(), dialogUpdateAxureInfoVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="poster-editor" :class="{ 'init-loading': initLoading }">
      <div class="base">
        <!-- 左侧添加组件栏 -->
        <left-side />
        <!-- 主要操作区域 -->
        <main-component ref="main" />
        <!-- 常用功能栏 -->
        <extend-side-bar />
        <!-- 组件编辑区域 -->
        <control-component />
      </div>
      <!-- 图层面板 -->
      <transition name="el-zoom-in-top">
        <layer-panel v-show="layerPanelOpened" />
      </transition>
    </div>
    <div id="drag" v-drag:#drag class="drag-box">
      <div>
        <el-button icon="el-icon-circle-plus-outline" circle style="float:right" @click="dialogPageVisible = true" />
      </div>
      <el-table
        ref="table"
        v-loading="loading"
        :data="axureList"
        style="margin-top:0px"
        header-cell-style="color: #000000"
        @row-dblclick="toAxureEditor"
      >
        <el-table-column
          align="left"
          label="页面列表"
          prop="axure_name"
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
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from './poster.vuex'
import controlComponent from './control/index'
import mainComponent from './main/index'
import leftSide from './leftSide/index'
import extendSideBar from './extendSideBar'
import layerPanel from './extendSideBar/layerPanel'
import store from '@/store'
import posterModule from '@/store/modules/poster/poster'
import router from '@/router'
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import { drag } from 'poster/poster.directives'

const DELETE_KEY = 8 // delete
const COPY_KEY = 67 // c
const PASTE_KEY = 86 // v
const LAYER_PANEL_KEY = 76 // l
const REFERENCE_LINE_KEY = 72 // h
const UNDO_KEY = 90 // z
const BACKUP_KEY = 83 // s
const SELECT_ALL_KEY = 65 // a

export default {
  components: {
    controlComponent,
    mainComponent,
    leftSide,
    extendSideBar,
    layerPanel
  },
  directives: { drag },
  data() {
    return {
      flag: '',
      form_update: {
        token: localStorage.getItem('Token'),
        axure_id: localStorage.getItem('axure_id')
      },
      axure_name: localStorage.getItem('axure_name'),
      pageConfig: {
        pageConfigId: '',
        config: '',
        items: ''
      },
      form_createAxure: {
        token: getters.getToken(state),
        axure_name: null,
        axure_info: null,
        project_id: localStorage.getItem('project_id'),
        axure_template_id: 0
      },
      form_updateAxureInfo: {
        token: getters.getToken(state),
        axure_id: null,
        axure_name: null,
        axure_info: null
      },
      form_deleteAxure: {
        token: getters.getToken(state),
        axure_id: null
      },
      initLoading: false,
      dialogPageVisible: false,
      dialogUpdateAxureInfoVisible: false,
      axureList: [],
      loading: false,
      form_getAxureList: {
        token: getters.getToken(state),
        project_id: localStorage.getItem('project_id')
      }
    }
  },
  computed: {
    ...mapState([
      'posterItems',
      'layerPanelOpened',
      'activeItems',
      'copiedWidgets',
      'referenceLineOpened',
      'isUnsavedState'
    ]),
    ...mapGetters(['activeItemIds'])
  },
  watch: {
    pageConfig: {
      handle (newName, oldName) {
        console.log('改改改')
      },
      deep: true
    }
  },
  beforeRouteLeave(to, from, next) {
      next()
  },
  beforeCreate() {
    if (!store.hasModule('poster')) {
      /** 注册poster-vuex模块 */
      store.registerModule('poster', posterModule)
    }
  },
  async created() {
    this.getAxureList()
    this.initLoading = true
    // if (!store.hasModule('poster')) return
    const loading = this.$loading({
      lock: true,
      text: '正在初始化编辑器',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.6)'
    })
    await this.resetState()
    await this.updatePage()
    loading.close()
    this.initLoading = false
  },
  async mounted() {
    await this.$store.dispatch('backup/recover', null)
    document.addEventListener('keydown', this.keydownHandle)
    this.body = document.body
    this.mainPanelRef = this.$refs.main.$refs.mainPanel
    // 初始化websocket
    // this.initWebSocket()
    // this.$nextTick(() => {
    //   setInterval(this.save, 1000)
    // })
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydownHandle)
    this.killAutoSaveTask()
  },
  destroyed: function () { // 离开页面生命周期函数
    // this.websocketclose();
  },
  methods: {
    toPreview() {
      if (this.flag === 1) {
        window.open('http://101.42.171.88:8090/file/1/2022-08-10_17:50:41.606_dcc3626135d50ed9d2c3c52a7a8678c.jpg')
      }
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
      this.$router.push('/redirect/posterEditor')
    },
    ...mapActions([
      'replacePosterItems',
      'replaceActiveItems',
      'pasteWidget',
      'copyWidget',
      'setLayerPanel',
      'setReferenceLineVisible',
      'resetState',
      'updatePageConfig'
    ]),
    ...mapActions({
      undo: 'history/undo',
      redo: 'history/redo',
      backupInit: 'backup/init',
      killAutoSaveTask: 'backup/killAutoSaveTask',
      backupInvoker: 'backup/invoker'
    }),
    save() {
      /*
      const requestData = {
            items: [
                {
                    type: poster.state.background.type,
                    content: '',
                    config: JSON.stringify(poster.state.background)
                },
                ...poster.state.posterItems.map((item, index) => {
                    return {
                        type: item.type,
                        content: '',
                        config: JSON.stringify({
                            ...item,
                            _sort: index + 1
                        })
                    }
                })
            ]
        }
        */
      console.log('test>>>')
      // console.log(JSON.stringify(requestData))
      // console.log(poster.getters.posterItems)
      console.log('<<<test')
      const res = this.$store.dispatch('poster/saveActivityPageConfig', null)
      res.then(r => {
        this.websock.send(JSON.stringify({
          type: 'axure',
          id: localStorage.getItem('axure_id'),
          config: r.config,
          items: r.items,
          name: '',
          content: ''
      }))
      })
    },
    back() {
      router.push('/list/table-group-project')
    },
    // getConfig () {
    //   this.$axios.post('/axure/getAxureInfo', qs.stringify(this.form_update))
    //     .then(res => {
    //       if (res.data.success) {
    //         this.pageConfig.pageConfigId = res.data.data.config_id
    //           this.pageConfig.config = JSON.parse(res.data.data.config)
    //           this.pageConfig.items.JSON.parse(res.data.data.items)
    //       }
    //       })
    //
    //         console.log(this.pageConfig)
    // },
    updatePage() {
      this.$axios.post('/axure/getAxureInfo', qs.stringify(this.form_update))
        .then(res => {
          if (res.data.success) {
            let pageConfig = {}
            pageConfig = {
              pageConfigId: res.data.data[0].config_id,
              config: JSON.parse(res.data.data[0].config),
              items: JSON.parse(res.data.data[0].items),
              title: res.data.data[0].title
            }
            this.$store.dispatch('poster/updatePageConfig', pageConfig)
          }
        })
    },
    keydownHandle(e) {
      if (e.target !== this.body) {
        return
      }
      const keyCode = e.keyCode
      const ctrl = e.ctrlKey || e.metaKey
      const shift = e.shiftKey
      switch (true) {
        case keyCode === DELETE_KEY:
          if (this.activeItemIds.length > 0) {
            this.replacePosterItems(
              this.posterItems.filter(
                item => !this.activeItemIds.includes(item.id)
              )
            )
          }
          break
        case keyCode === PASTE_KEY && ctrl:
          if (this.copiedWidgets) {
            this.pasteWidget()
          }
          break
        case keyCode === COPY_KEY && ctrl:
          if (this.activeItems.length > 0) {
            // const copiedWidgets = []
            // const widgetRefs = this.mainPanelRef.$refs
            // this.activeItemIds.forEach((itemId) => {
            // const widgetRef = widgetRefs[itemId][0]
            // copiedWidgets.push(getCopyData(widgetRef.item, widgetRef._self))
            // })
            const copiedWidgets = [...this.activeItems].map(item => {
              item._copyFrom = 'command'
              return item
            })
            this.copyWidget(copiedWidgets)
          }
          break
        case keyCode === LAYER_PANEL_KEY && ctrl:
          e.preventDefault()
          this.setLayerPanel(!this.layerPanelOpened)
          break
        case keyCode === REFERENCE_LINE_KEY && ctrl:
          e.preventDefault()
          this.setReferenceLineVisible(!this.referenceLineOpened)
          break
        case keyCode === UNDO_KEY && ctrl && shift:
          this.redo()
          break
        case keyCode === UNDO_KEY && ctrl:
          this.undo()
          break
        case keyCode === BACKUP_KEY && ctrl:
          e.preventDefault()
          this.backupInvoker()
          break
        case keyCode === SELECT_ALL_KEY:
          e.preventDefault()
          this.replaceActiveItems(this.posterItems)
          break
        default:
          break
      }
    }, /*,    initWebSocket: function () { // 建立连接
        // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
        // var url = " ws://101.42.171.88:8090/ws"
        var url = " ws://localhost:8090/ws"
        this.websock = new WebSocket(url);
        this.websock.onopen = this.websocketonopen;
        // this.websock.send = this.websocketsend;
        this.websock.onerror = this.websocketonerror;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
      },
    // 连接成功后调用
    websocketonopen: function () {
      this.websock.send(JSON.stringify({
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        type: "axure",
        id: localStorage.getItem('axure_id')
      }))
      console.log("WebSocket连接成功");
    },
    // 发生错误时调用
    websocketonerror: function () {
      console.log("WebSocket连接发生错误");
    },
    // 给后端发消息时调用
    websocketsend: function () {
      console.log("WebSocket连接发生错误");
    },
    // 接收后端消息
    // vue 客户端根据返回的cmd类型处理不同的业务响应
    websocketonmessage: function (e) {
      let pageConfig = {}
      const res = JSON.parse(e.data)
      // console.log(res.items)
      pageConfig = {
        pageConfigId: 0,
        config: JSON.parse(res.config),
        items: JSON.parse(res.items)
      }
      this.$store.dispatch('poster/updatePageConfig', pageConfig)
    },
    // 关闭连接时调用
    websocketclose: function (e) {
      console.log("connection closed (" + e.code + ")");
    }*/
    sendMsg() {
      // this.websock.send(JSON.stringify({
      //   type: "axure",
      //   id: localStorage.getItem('axure_id'),
      //   config: this.pageConfig.config,
      //   items: this.pageConfig.items,
      //   config_id: this.pageConfig.pageConfigId
      // }))
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .title {
  color: #2c2c2c;
  background-color: #2c2c2c;
}
.drag-box {
  position: absolute;
  top: 45%;
  left: 2.8%;
  width: 195px;
  height: 400px;
  background: #ececec;
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
.head {
  background: #2c2c2c;
  min-height: 5%;
}
.poster-editor {
  width: 100%;
  min-width: 900px;
  height: 96%;
  background-color: #fff;
  position: fixed;
  &.init-loading {
    filter: blur(6px);
  }
  .base {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
  }
  .left-side {
    height: 100%;
  }
  .poster-editor-main {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
  }
  .extend-side-bar {
    width: 50px;
    height: 100%;
    border-left: 1px solid $colorBorder;
  }
  .poster-editor-control {
    width: 200px;
    height: 100%;
    box-sizing: border-box;
    border-left: 1px solid $colorBorder;
  }
}
</style>

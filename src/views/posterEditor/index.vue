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
          {{ axure_name }}
        </div>
        <div>
          <!--          <el-button style="padding: 5px; background: #2f2f2f; border: 0">-->
          <!--            <i class="el-icon-more" style="font-size: large; color: #ececec"></i>-->
          <!--          </el-button>-->
        </div>
      </el-col>
    </el-row>
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
import * as poster from '@/store/modules/poster/poster'

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
  data() {
    return {
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
      initLoading: false
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
        console.log("改改改")
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
    this.initLoading = true
    // if (!store.hasModule('poster')) return
    const loading = this.$loading({
      lock: true,
      text: '正在初始化编辑器',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.6)'
    })
    await this.resetState()
    await this.nothing()
    // await this.updatePage()
    loading.close()
    this.initLoading = false
  },
  async mounted() {
    await this.$store.dispatch('backup/recover', null)
    document.addEventListener('keydown', this.keydownHandle)
    this.body = document.body
    this.mainPanelRef = this.$refs.main.$refs.mainPanel
    //初始化websocket
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
    this.websocketclose();
  },
  methods: {
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
      console.log("test>>>")
      // console.log(JSON.stringify(requestData))
      // console.log(poster.getters.posterItems)
      console.log("<<<test")
      const res = this.$store.dispatch('poster/saveActivityPageConfig', null)
      res.then(r => {
        this.websock.send(JSON.stringify({
          type: "axure",
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
    //         console.log(this.pageConfig)
    // },
    nothing() {
      this.$store.dispatch('poster/nothing')
    },
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
    }/*,
    initWebSocket: function () { // 建立连接
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
    }*/,
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

<template>
  <div class="extend-side-bar">
    <div class="list">
      <el-tooltip
        effect="dark"
        content="撤销 ctrl+z"
        placement="left"
        transition="el-zoom-in-center"
      >
        <div class="item" :class="{ disabled: !couldUndo }" @click="undo">
          <i class="icon-undo"></i>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="恢复 ctrl+shift+z"
        placement="left"
        transition="el-zoom-in-center"
      >
        <div
          style="transform:rotateY(180deg)"
          class="item"
          :class="{ disabled: !couldRedo }"
          @click="redo"
        >
          <i class="icon-undo"></i>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="图层面板 ctrl+L"
        placement="left"
        transition="el-zoom-in-center"
      >
        <div
          class="item"
          :class="{ active: layerPanelOpened }"
          @click="openLayer"
        >
          <i class="icon-layer"></i>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="参考线 ctrl+h"
        placement="left"
        transition="el-zoom-in-center"
      >
        <el-popover
          placement="left"
          title="参考线"
          width="200"
          trigger="click"
          transition="el-zoom-in-center"
        >
          <reference-line />
          <div slot="reference" class="item">
            <i class="icon-grid"></i>
          </div>
        </el-popover>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="导出PDF"
        placement="left"
        transition="el-zoom-in-center"
      >
        <div class="item" @click="exportPdf">
          <i class="el-icon-upload2"></i>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="导出图片"
        placement="left"
        transition="el-zoom-in-center"
      >
        <div class="item" @click="createImg">
          <i class="icon-poster"></i>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="生成预览"
        placement="left"
        transition="el-zoom-in-center"
      >
        <div class="item" @click="getImage">
          <i class="el-icon-monitor"></i>
        </div>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="快捷键参考"
        placement="left"
        transition="el-zoom-in-center"
      >
        <div class="item" @click="openSettingCenter('shortcut')">
          <i class="el-icon-thumb"></i>
        </div>
      </el-tooltip>
    </div>
    <el-dialog
      :visible.sync="settingCenterVisible"
      title="设置"
      width="600px"
      append-to-body
      transition="el-zoom-in-center"
    >
      <setting-center ref="settingCenter" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'poster/poster.vuex'
import referenceLine from './referenceLine'
import settingCenter from './settingCenter'
import Vue from 'vue'
import ExportService from 'poster/service/exportService'
import { pluginMap, pluginWrap } from '../plugins'
import html2canvas from 'html2canvas'
import store from '@/store'
import { getters, state } from '@/store/modules/user'
import qs from 'qs'

const pluginComponents = {}
const plugins = []
for (const [pluginName, options] of Object.entries(pluginMap.extendSideBar)) {
  const { component } = options
  pluginComponents[pluginName] = pluginWrap(component)
  plugins.push(options)
}

export default {
  components: { referenceLine, settingCenter },
  data() {
    return {
      settingCenterVisible: false
    }
  },
  computed: {
    ...mapState([
      'posterItems',
      'canvasSize',
      'background',
      'assistWidgets',
      'pageTitle'
    ]),
    ...mapState({
      layerPanelOpened: 'layerPanelOpened',
      couldRedo: state => state.history.nextStack.length > 0,
      couldUndo: state => state.history.preStack.length > 0,
      useBackup: state => state.backup.useBackup
    }),
    plugins() {
      return Object.freeze(plugins)
    }
  },
  methods: {
    ...mapActions({
      undo: 'history/undo',
      redo: 'history/redo'
    }),
    exportPdf() {
      this.getPdf('pdfDom', 'pdf-export')
    },
    base64ToFile(urlData, fileName) {
      const arr = urlData.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bytes = atob(arr[1]) // 解码base64
      let n = bytes.length
      const ia = new Uint8Array(n)
      while (n--) {
        ia[n] = bytes.charCodeAt(n)
      }
      return new File([ia], fileName, { type: mime })
    },
    getImage() {
      const domName = 'mainPanel'
      const imageDom = document.getElementById(domName)
      const canvasSize = store.state.poster.canvasSize
      window.pageYoffset = 0 // 滚动置顶
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      html2canvas(imageDom, {
        windowWidth: canvasSize.width,
        windowHeight: canvasSize.height,
        // width: canvasSize.width, // canvas画板的宽度 一般都是要保存的那个dom的宽度
        // height: canvasSize.height, // canvas画板的高度  同上
        useCORS: true,
        scale: 1
      }).then((canvas) => {
        const base64Url = canvas.toDataURL('image/png', 1)
        const file = this.base64ToFile(base64Url, localStorage.getItem('axure_id') + '.png')
        this.exportFile(file)
      })
    },
    exportFile (file) {
      const fd = new FormData()
      console.log('file', file)
      fd.append('file', file.file)
      fd.append('token', getters.getToken(state))
      this.$axios('/axure/uploadAxure', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: fd
      })
    },
    createImg() {
      const domName = 'mainPanel'
      const imageDom = document.getElementById(domName)
      const canvasSize = store.state.poster.canvasSize
      window.pageYoffset = 0 // 滚动置顶
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      html2canvas(imageDom, {
        windowWidth: canvasSize.width,
        windowHeight: canvasSize.height,
        // width: canvasSize.width, // canvas画板的宽度 一般都是要保存的那个dom的宽度
        // height: canvasSize.height, // canvas画板的高度  同上
        useCORS: true,
        scale: 1
      }).then((canvas) => {
        const base64Url = canvas.toDataURL('image/png', 1)
        this.fileDownload(base64Url)
      })
    },
    fileDownload(downloadUrl) {
      const aLink = document.createElement('a')
      aLink.style.display = 'none'
      aLink.href = downloadUrl
      // aLink.download = 'export.png'
      aLink.download = localStorage.getItem('axure_id') + '.png'
      // 触发点击-然后移除
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink)
    },
    exportPoster() {
      ExportService.exportPoster()
    },
    // 打开图层面板
    openLayer() {
      this.$store.dispatch('poster/setLayerPanel', !this.layerPanelOpened)
    },
    openSettingCenter(tab) {
      this.settingCenterVisible = true
      this.$nextTick(() => {
        if (typeof tab === 'string' && this.$refs.settingCenter) {
          Vue.set(this.$refs.settingCenter, 'activeTab', tab)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  .item {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    /* transition: 0.2s; */
    border-radius: 4px;
    i {
      font-size: 18px;
      &.icon-undo {
        font-size: 14px;
      }
      &.el-icon-set-up {
        font-size: 22px;
      }
    }
    &:hover,
    &.active {
      color: $colorTheme;
    }
    &.disabled {
      color: #999;
    }
  }
}
</style>

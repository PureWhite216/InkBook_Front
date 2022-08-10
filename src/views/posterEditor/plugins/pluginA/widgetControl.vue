<template>
  <div class="plugin-a">
    <setting-content>
      <setting-item label="文本">
        <el-input v-model="text" type="text" />
      </setting-item>
      <setting-item label="边框半径">
        <el-input v-model="radius" type="text" />
      </setting-item>
      <setting-item label="高度">
        <el-input v-model="height" type="text" />
      </setting-item>
      <setting-item label="背景颜色">
        <el-color-picker v-model="Background" size="small" />
      </setting-item>
      <setting-item label="字体颜色">
        <el-color-picker v-model="Color" size="small" />
      </setting-item>
    </setting-content>
  </div>
</template>

<script>
import { controlMixin } from '../helpers'
export default {
  mixins: [controlMixin],
  computed: {
    height: {
      get() {
        return this.wState.style.height
      },
      set(val) {
        this.updateStyle('height', val)
      }
    },
    radius: {
      get() {
        return this.wState.style.borderRadius
      },
      set(val) {
        this.updateStyle('borderRadius', val)
      }
    },
    text: {
      get() {
        return this.wState.text
      },
      set(val) {
        this.updateWidgetState({
          keyPath: 'text',
          value: val,
          widgetId: this.item.id
        })
      }
    },
    Background: {
      get() {
        return this.style.background
      },
      set(val) {
        this.updateStyle('background', val)
      }
    },
    Color: {
      get() {
        return this.wState.style.color
      },
      set(val) {
        this.updateWidgetState({
          keyPath: 'style.color',
          value: val,
          widgetId: this.item.id
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.plugin-a {
  box-sizing: border-box;
  padding: 10px;
}
</style>

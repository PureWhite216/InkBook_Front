<template>
  <div class="plugin-icon">
    <setting-content>
      <setting-item label="文本">
        <el-input v-model="text" type="text" />
      </setting-item>
      <setting-item label="背景颜色">
        <el-color-picker v-model="BackgroundColor" size="small" />
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
    BackgroundColor: {
      get() {
        return this.style.backgroundColor
      },
      set(val) {
        this.updateStyle('backgroundColor', val)
      }
    },
    Color: {
      get() {
        return this.style.color
      },
      set(val) {
        this.updateStyle('color', val)
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

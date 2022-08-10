<template>
  <div class="plugin-icon">
    <setting-content>
      <setting-item label="大小">
        <el-input v-model="FontSize" type="text" />
      </setting-item>
      <setting-item label="颜色">
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
    FontSize: {
      get() {
        return this.wState.size.fontSize
      },
      set(val) {
        this.updateWidgetState({
          keyPath: 'size.fontSize',
          value: val,
          widgetId: this.item.id
        })
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
.plugin-icon {
  box-sizing: border-box;
  padding: 10px;
}
</style>

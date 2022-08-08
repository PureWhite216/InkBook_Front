<template>
  <div class="plugin-input">
    <el-form>
      <el-form-item label="按钮数量">
        <el-input v-model="buttonCount" type="text" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { controlMixin } from '../helpers'
export default {
  mixins: [controlMixin],
  computed: {
    buttonCount: {
      get() {
        return this.wState.buttonCount
      },
      set(val) {
        this.$pluginHelpers.updateWidgetState({
          keyPath: 'buttonCount',
          value: val,
          widgetId: this.item.id
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.plugin-input {
  box-sizing: border-box;
  padding: 10px;
}
</style>

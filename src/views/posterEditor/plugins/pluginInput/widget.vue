<template>
  <div class="plugin-input">
    <el-input v-model="input" placeholder="请输入内容"/>
    <portal v-if="isActive" :to="$data.$controlTarget">
      <widget-control :item="item" />
    </portal>
  </div>
</template>

<script>
import PluginInput from './constructor'
import widgetControl from './widgetControl'
import { pluginWrap } from '../helpers'
export default {
  components: { widgetControl: pluginWrap(widgetControl) },
  mixins: [PluginInput.widgetMixin()],
  data() {
    return {
      input: ''
    }
  },
  methods: {
    executeContextCommand(command) {
      this.$message.success('插件测试命令')
    },
    getMenuList() {
      return [
        {
          label: '插件测试',
          command: 'test'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.plugin-input {
  width: 100%;
  height: 100%;
  color: #000;
  /* position: relative; */
  /* z-index: 2; */
  display: flex;
  button {
    flex: 1;
    height: 100%;
    padding: 0;
    box-sizing: border-box;
  }
}
</style>

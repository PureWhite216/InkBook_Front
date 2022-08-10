<template>
  <div class="plugin-input">
    <el-input v-model="input" :style="wState.style" placeholder="请输入内容"/>
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
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      input: ''
    }
  },
  computed: {
    wState() {
      return this.item.wState
    }
  },
  watch: {
    isEditing(newVal) {
      this.$emit('draggableChange', !newVal)
    }
  },
  created() {
    this.updateDragInfo({
      w: 160,
      h: 36,
      x: 0,
      y: 200
    })
  },
  methods: {
    executeContextCommand(command) {
      this.$message.success('Input')
    },
    getMenuList() {
      return [
        {
          label: '输入框',
          command: 'input'
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

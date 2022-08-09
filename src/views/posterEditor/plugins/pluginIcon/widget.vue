<template>
  <div class="plugin-a">
    <div :style="wState.size">
      <i :class="wState.class" :style="wState.style"></i>
    </div>
    <portal v-if="isActive" :to="$data.$controlTarget">
      <widget-control :item="item" />
    </portal>
  </div>
</template>

<script>
import PluginIcon from './constructor'
import widgetControl from './widgetControl'
import { pluginWrap } from '../helpers'
export default {
  components: { widgetControl: pluginWrap(widgetControl) },
  mixins: [PluginIcon.widgetMixin()],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
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
      w: 30,
      h: 30,
      x: 0,
      y: 200
    })
  },
  methods: {
    executeContextCommand(command) {
      this.$message.success('插件测试命令')
    },
    getMenuList() {
      return [
        {
          label: '按钮',
          command: 'button'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.plugin-a {
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

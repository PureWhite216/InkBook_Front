<template>
  <div class="add-text-widget">
    <ul>
      <el-button
        v-for="(item, index) in buttonList"
        :key="index"
        :style="item.style"
        @click="add(item)"
      >Click</el-button>
    </ul>
    <el-button size="mini" @click="add">插件测试</el-button>
  </div>
</template>

<script>
import PluginA from './constructor'
export default {
  data() {
    return {
      buttonList: [
        {
          text: 'Click',
          style: {
            color: 'white',
            background: '#22abf5',
            width: '80px',
            height: '36px'
          }
        },
        {
          text: 'Click',
          style: {
            color: 'white',
            background: '#f52249',
            width: '80px',
            height: '36px'
          }
        }
      ]
    }
  },
  methods: {
    add(item) {
      console.log(this)
      if (item) {
        this.$pluginHelpers.addWidget(
          new PluginA({
            wState: item
          })
        )
      } else {
        this.$pluginHelpers.addWidget(new PluginA())
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-text-widget {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  .presupposition-item {
    padding: 12px 0 !important;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: $colorTheme !important;
    }
  }
  .add-text {
    width: 100%;
    margin-top: 20px;
  }
}
</style>

<template>
  <div style="height: 200px; width: 200px; margin-top: 50px; margin-left: 20px">
    <el-button
      v-for="(item, index) in buttonList"
      :key="index"
      :style="item.style"
      style="margin: auto"
      @click="add(item)"
    >Click</el-button>
  </div>
</template>

<script>
import PluginA from './constructor'
export default {
  data() {
    return {
      buttonList: [
        {
          text: '按钮',
          style: {
            color: 'white',
            background: '#22abf5',
            width: '80px',
            height: '36px'
          }
        },
        {
          text: '按钮',
          style: {
            color: 'white',
            background: '#f52249',
            width: '80px',
            height: '36px'
          }
        },
        {
          text: '按钮',
          style: {
            color: 'white',
            background: '#f54922',
            width: '80px',
            height: '36px'
          }
        },
        {
          text: '按钮',
          style: {
            color: 'black',
            background: '#ffffff',
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

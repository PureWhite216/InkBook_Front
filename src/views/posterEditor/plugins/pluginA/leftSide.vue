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
          style: {
            color: '#ffffff',
            background: '#22abf5'
          }
        },
        {
          style: {
            color: '#ffffff',
            background: '#f52249'
          }
        },
        {
          style: {
            color: '#ffffff',
            background: '#f54922'
          }
        },
        {
          style: {
            color: 'black',
            background: '#ffffff',
            border: 1
          }
        },
        {
          style: {
            color: '#ffffff',
            background: '#22abf5',
            borderRadius: '20px'
          }
        },
        {
          style: {
            color: '#ffffff',
            background: '#f52249',
            borderRadius: '20px'
          }
        },
        {
          style: {
            color: '#ffffff',
            background: '#f54922',
            borderRadius: '20px'
          }
        },
        {
          style: {
            color: 'black',
            background: '#ffffff',
            border: 1,
            borderRadius: '20px'
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

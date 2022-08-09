<template>
  <div style="height: 200px; width: 200px; margin-top: 50px; margin-left: 20px">
    <el-input
      v-for="(item, index) in inputList"
      :key="index"
      v-model="input"
      :style="item.style"
      placeholder="请输入内容"
      @click="add()"
    />
    <el-button
      size="large"
      type="plain"
      @click="add(null)"
    >添加输入框</el-button>
  </div>
</template>

<script>
import PluginInput from './constructor'
export default {
  data() {
    return {
      inputList: [
        {
          style: {
            width: '160px',
            height: '36px'
          }
        }
      ]
    }
  },
  methods: {
    add() {
      console.log(this)
      this.$pluginHelpers.addWidget(new PluginInput())
    }
  }
}
</script>

<style></style>

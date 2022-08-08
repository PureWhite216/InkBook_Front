<template>
  <div class="left-side-test">
    <el-button size="small" @click="add">插件测试</el-button>
  </div>
</template>

<script>
import PluginInput from './constructor'
export default {
  methods: {
    add() {
      console.log(this)
      this.$pluginHelpers.addWidget(new PluginInput())
    }
  }
}
</script>

<style></style>

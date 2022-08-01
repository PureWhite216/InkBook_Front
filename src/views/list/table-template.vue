<template>
  <div class="main-container">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="模板选择"
        name="first"
        lazy
        class="wrapper"
      >
        <GoodsList />
      </el-tab-pane>
    </el-tabs>
    <el-backtop
      target=".main-container"
      :visibility-height="100"
    />
  </div>
</template>

<script>
import GoodsList from './components/GoodsList'
export default {
  name: 'TableTemplate',
  components: { GoodsList },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__header {
  margin-bottom: 5px;
  padding: 0 10px;
}
.wrapper {
  position: relative;
}
</style>

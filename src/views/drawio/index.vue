<template>
  <div style="height: 100%">
    <el-row style="background: #2f2f2f; height: 4%">
      <el-col :span="8">
        <el-button class="backbutton" style="margin-left: 20px; margin-top: 2px" @click="back">
          <i class="el-icon-back" style="font-size: x-large"></i>
        </el-button>
      </el-col>
      <el-col :span="8" style="text-align: center; margin-top: 12px">
        <div style="font-size: 16px; color: #ececec" contenteditable="true">
          UML编辑
        </div>
      </el-col>
    </el-row>
    <div id="iframe-container" style="height: 100%">
      <iframe
        id="drawio"
        title="drawio"
        width="100%"
        height="96%"
        src="static/drawio/localstorage.html"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  methods: {
    back() {
      router.push('/list/table-group-project')
    }
  }
}
</script>

<style lang="scss" scoped>
.backbutton {
  color: white;
  background: #2c2c2c;
  height: 30px;
  border: 0;
  margin-top: 5px;
  padding: 5px;
}
.backbutton:hover {
  color: white;
  background: #000000;
  height: 35px;
}
.backbutton:focus {
  color: white;
  background: #000000;
  height: 35px;
}
.head {
  background: #2c2c2c;
  max-height: 35px;
}
</style>

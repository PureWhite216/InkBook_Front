<template>
  <div class="logo-wrapper">
    <transition
      v-if="showTitle"
      name="el-fade-in-linear"
    >
      <span
        v-show="!state.isCollapse || alwaysShow"
        class="logo-title"
      >InkBook</span>
    </transition>
  </div>
</template>

<script>
import store from '../store/index'
export default {
  name: 'Logo',
  props: {
    showTitle: {
      type: Boolean,
      default: true
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    alwaysShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: store.state
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
.logo-wrapper {
  background: #2c2c2c;
  height: $logoHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .logo-img {
    width: 30px;
  }
  .logo-title {
    color: white;
    margin-left: 5px;
    font-weight: normal;
    font-size: 26px;
    font-family: Choplin,sans-serif
  }
}
</style>

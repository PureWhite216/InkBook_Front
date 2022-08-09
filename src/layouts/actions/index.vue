<template>
  <div class="action-items-wrapper">
    <el-popover
      v-if="state.actionItem.showMessage"
      class="action-item"
      trigger="click"
      @after-enter="onPopoverAfterEnter"
    >
      <el-badge
        slot="reference"
        :value="unlookMessageCount"
      >
        <span class="iconfont action-item">&#xe646;</span>
      </el-badge>
      <MessageContent
        ref="messageContent"
        @clear-num="clearNum"
      />
    </el-popover>
<!--    <span-->
<!--      v-if="state.actionItem.showRefresh"-->
<!--      class="iconfont action-item"-->
<!--      @click="onRefrehRoute"-->
<!--    >&#xe6a8;</span>-->
<!--    <span-->
<!--      v-if="state.actionItem.showFullScreen && state.device !== 'mobile'"-->
<!--      class="iconfont action-item"-->
<!--      @click="onScreenFull"-->
<!--    >&#xe655;</span>-->
    <div
      v-if="state.actionItem.showSearch && state.device !== 'mobile'"
      class="input-wrapper"
      :class="{'is-active': showSearchContent}"
    >
      <el-input
        ref="searchContent"
        v-model="searchContent"
        placeholder="Search"
        clearable
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import store from '../store/index'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'
export default {
  name: 'ActionItems',
  data() {
    return {
      showSearchContent: false,
      searchContent: '',
      nums: 3,
      state: store.state,
      unlookMessageCount: localStorage.getItem('unlook_message_count'),
      form_getUnlookMessageCount: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state)
      }
    }
  },
  created() {
    this.getUnlookMessageCount()
    this.unlookMessageCount = localStorage.getItem('unlook_message_count')
  },
  mounted() {
  },
  methods: {
    getUnlookMessageCount() {
      if (getters.getToken(state) != null) {
        this.form_getUnlookMessageCount.token = getters.getToken(state)
        this.form_getUnlookMessageCount.username = getters.getUserName(state)
        this.form_getUnlookMessageCount.user_id = getters.getUserId(state)
        this.$axios.post('/user/get_unlook_message', qs.stringify(this.form_getUnlookMessageCount))
         .then((res) => {
           if (res.data.result === 2) {
             localStorage.setItem('unlook_message_count', res.data.unlook_message_count)
             this.unlookMessageCount = res.data.unlook_message_count
            //  this.$message.success(res.data.message)
           } else {
            //  this.$message.error(res.data.message)
           }
         })
      }
    },
    onShowSearch() {
      this.showSearchContent = !this.showSearchContent
      this.searchContent = ''
      if (this.showSearchContent) {
        this.$refs.searchContent.focus()
      } else {
        this.$refs.searchContent.blur()
      }
    },
    onChange(content) {
      if (!content) {
        return
      }
      window.open('https://www.baidu.com/s?wd=' + content)
    },
    onScreenFull() {
      if (!screenfull.isEnabled) {
        this.$errorMsg('当前浏览器不支持全屏操作')
        return false
      }
      screenfull.toggle()
    },
    onRefrehRoute() {
      this.$router.replace({ path: '/redirect' + this.$route.path })
    },
    onPopoverAfterEnter() {
      this.$refs.messageContent.update()
    },
    clearNum(num) {
      this.nums = Math.max(0, this.nums - num)
    }
  }
}
</script>

<style lang="scss" scoped>
.action-items-wrapper {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  color: currentColor;
  z-index: 1;
  .action-item {
    min-width: 40px;
  }
  .input-wrapper {
    position: absolute;
    top: 6px;
    bottom: 3px;
    left: 0;
    width: 0;
    z-index: -1;
    transform: translateX(0);
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &.is-active {
      width: 100%;
      transform: translateX(-100%);
      transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }
}
::v-deep {
  .el-input {
    border: none;
    border-bottom: 1px solid currentColor;
  }
  .el-input__inner {
    border: none !important;
    height: 35px;
    line-height: 35px;
    color: currentColor !important;
    background-color: transparent !important;
  }
}
</style>

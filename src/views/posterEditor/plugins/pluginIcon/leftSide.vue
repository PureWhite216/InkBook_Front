<template>
  <div style="height: 250px; width: 150px; margin-top: 10px; margin-left: 20px">
    <i
      v-for="(item, index) in iconList"
      :key="index"
      :style="item.style"
      :class="item.class"
      style="margin-inline: 10px; margin-top: 10px"
      @click="add(item)"
    ></i>
  </div>
</template>

<script>
import PluginIcon from './constructor'
export default {
  data() {
    return {
      iconList: [
        {
          class: 'el-icon-star-on'
        },
        {
          class: 'el-icon-star-off'
        },
        {
          class: 'el-icon-info'
        },
        {
          class: 'el-icon-more'
        },
        {
          class: 'el-icon-circle-plus-outline'
        },
        {
          class: 'el-icon-remove-outline'
        },
        {
          class: 'el-icon-circle-close'
        },
        {
          class: 'el-icon-more-outline'
        },
        {
          class: 'el-icon-setting'
        },
        {
          class: 'el-icon-plus'
        },
        {
          class: 'el-icon-right'
        },
        {
          class: 'el-icon-folder'
        },
        {
          class: 'el-icon-search'
        },
        {
          class: 'el-icon-document'
        },
        {
          class: 'el-icon-delete'
        },
        {
          class: 'el-icon-user'
        },
        {
          class: 'el-icon-picture'
        },
        {
          class: 'el-icon-upload'
        },
        {
          class: 'el-icon-bell'
        },
        {
          class: 'el-icon-s-fold'
        },
        {
          class: 'el-icon-camera'
        },
        {
          class: 'el-icon-s-comment'
        },
        {
          class: 'el-icon-menu'
        },
        {
          class: 'el-icon-d-arrow-right'
        },
        {
          class: 'el-icon-refresh-left'
        },
        {
          class: 'el-icon-date'
        },
        {
          class: 'el-icon-takeaway-box'
        },
        {
          class: 'el-icon-paperclip'
        },
        {
          class: 'el-icon-printer'
        },
        {
          class: 'el-icon-headset'
        },
        {
          class: 'el-icon-reading'
        },
        {
          class: 'el-icon-mouse'
        },
        {
          class: 'el-icon-pie-chart'
        },
        {
          class: 'el-icon-house'
        },
        {
          class: 'el-icon-link'
        },
        {
          class: 'el-icon-position'
        },
        {
          class: 'el-icon-microphone'
        },
        {
          class: 'el-icon-alarm-clock'
        },
        {
          class: 'el-icon-water-cup'
        },
        {
          class: 'el-icon-apple'
        }
      ]
    }
  },
  methods: {
    add(item) {
      console.log(this)
      if (item) {
        this.$pluginHelpers.addWidget(
          new PluginIcon({
            wState: item
          })
        )
      } else {
        this.$pluginHelpers.addWidget(new PluginIcon())
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

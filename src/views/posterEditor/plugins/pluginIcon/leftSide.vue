<template>
  <div style="height: 250px; width: 150px; margin-top: 50px; margin-left: 20px; display: flex; flex-direction: column">
    <i
      v-for="(item, index) in iconList"
      :key="index"
      :style="item.style"
      :class="item.class"
      style="margin: auto"
      @click="add(item)"
    ></i>
<!--    <el-button-->
<!--      size="large"-->
<!--      type="plain"-->
<!--      @click="add(null)"-->
<!--    >添加图标</el-button>-->
  </div>
</template>

<script>
import PluginIcon from './constructor'
export default {
  data() {
    return {
      iconList: [
        {
          class: 'el-icon-setting',
          size: {
            fontSize: '24px'
          },
          style: {
            color: 'black'
          }
        },
        {
          class: 'el-icon-plus',
          size: {
            fontSize: '24px'
          },
          style: {
            color: 'black'
          }
        },
        {
          class: 'el-icon-right',
          size: {
            fontSize: '24px'
          },
          style: {
            color: 'black'
          }
        },
        {
          class: 'el-icon-folder',
          size: {
            fontSize: '24px'
          },
          style: {
            color: 'black'
          }
        },
        {
          class: 'el-icon-search',
          size: {
            fontSize: '24px'
          },
          style: {
            color: 'black'
          }
        },
        {
          class: 'el-icon-document',
          size: {
            fontSize: '24px'
          },
          style: {
            color: 'black'
          }
        },
        {
          class: 'el-icon-delete',
          size: {
            fontSize: '24px'
          },
          style: {
            color: 'black'
          }
        },
        {
          class: 'el-icon-user',
          size: {
            fontSize: '24px'
          },
          style: {
            color: 'black'
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

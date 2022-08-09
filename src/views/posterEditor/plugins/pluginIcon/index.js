import leftSide from './leftSide'
import widget from './widget'
import PluginIcon from './constructor'
import widgetControl from './widgetControl'
import bottomBar from './bottomBar'
import extendSideBar from './extendSideBar'

export default {
    leftSide: {
        icon: 'el-icon-news',
        name: 'button',
        component: leftSide
    },
    widget: {
        component: widget,
        constructor: PluginIcon
    },
    controlPanel: {
        component: widgetControl
    },
    bottomBar: {
        component: bottomBar
    },
    extendSideBar: {
        icon: 'el-icon-star-off',
        name: '插件测试',
        component: extendSideBar
    }
}
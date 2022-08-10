import leftSide from './leftSide'
import widget from './widget'
import PluginInput from './constructor'
import widgetControl from './widgetControl'
import bottomBar from './bottomBar'
import extendSideBar from './extendSideBar'

export default {
    leftSide: {
        icon: 'el-icon-edit-outline',
        name: '输入框',
        component: leftSide
    },
    widget: {
        component: widget,
        constructor: PluginInput
    },
    controlPanel: {
        component: widgetControl
    },
    bottomBar: {
        component: bottomBar
    },
    extendSideBar: {
        icon: 'el-icon-star-off',
        name: '输入框',
        component: extendSideBar
    }
}

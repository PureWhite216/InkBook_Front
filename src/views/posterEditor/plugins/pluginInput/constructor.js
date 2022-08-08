import { Widget } from 'poster/widgetConstructor'
import _merge from 'lodash/merge'

export default class PluginA extends Widget {
    constructor(config) {
        config = _merge({
            type: 'pluginInput',
            typeLabel: '插件测试',
            componentName: 'plugin-pluginInput',
            icon: 'el-icon-input',
            replicable: false,
            wState: {
                buttonCount: 3
            }
        }, config)
        super(config)
    }
}

import { Widget } from 'poster/widgetConstructor'
import _merge from 'lodash/merge'

export default class PluginIcon extends Widget {
    constructor(config) {
        config = _merge({
            type: 'pluginIcon',
            typeLabel: '插件测试',
            componentName: 'plugin-pluginIcon',
            icon: 'el-icon-news',
            replicable: false,
            wState: {
                class: 'el-icon-setting',
                size: {
                  fontSize: '24px'
                },
                style: {
                  color: 'black'
                }
            }
        }, config)
        super(config)
    }
}

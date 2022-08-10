import { Widget } from 'poster/widgetConstructor'
import _merge from 'lodash/merge'

export default class PluginA extends Widget {
    constructor(config) {
        config = _merge({
            type: 'pluginA',
            typeLabel: '按钮',
            componentName: 'plugin-pluginA',
            icon: 'el-icon-news',
            replicable: false,
            wState: {
                text: 'button',
                style: {
                  color: 'black',
                  background: 'white',
                  width: '80px',
                  height: '32px'
                }
            }
        }, config)
        super(config)
    }
}

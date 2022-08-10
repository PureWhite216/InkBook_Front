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
                text: 'Click',
                style: {
                  color: '#000000',
                  background: '#ffffff',
                  width: '80px',
                  height: '32px',
                  border: 0,
                  borderColor: '#000000',
                  borderRadius: '5px'
                }
            }
        }, config)
        super(config)
    }
}

import { Widget } from 'poster/widgetConstructor'
import _merge from 'lodash/merge'

export default class PluginInput extends Widget {
    constructor(config) {
        config = _merge({
            type: 'pluginInput',
            typeLabel: '输入框',
            componentName: 'plugin-pluginInput',
            icon: 'el-icon-edit-outline',
            replicable: false,
            wState: {
              style: {
                width: '400px'
              }
            }
        }, config)
        super(config)
    }
}

import { usePlugin } from './helpers'
export { pluginMap, pluginWrap, pluginConstructorMap } from './helpers'

import pluginA from './pluginA'
import pluginInput from './pluginInput'
import pluginIcon from './pluginIcon'

usePlugin('pluginA', pluginA)
usePlugin('pluginInput', pluginInput)
usePlugin('pluginIcon', pluginIcon)


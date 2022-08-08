import { usePlugin } from './helpers'
export { pluginMap, pluginWrap, pluginConstructorMap } from './helpers'

import pluginA from './pluginA'
import pluginInput from './pluginInput'

usePlugin('pluginA', pluginA)
usePlugin('pluginInput', pluginInput)


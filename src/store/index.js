import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import logger from 'vuex/dist/logger'

Vue.use(Vuex)

const modulesFile = require.context('./modules', true, /\.js$/)

const modules = modulesFile.keys().reduce((acc, cur) => {
  const key = cur.replace(/(.\/|.js$)/g, '')
  acc[key] = modulesFile(cur).default
  return acc
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  plugins: process.env.NODE_ENV !== 'production' ? [logger()] : []
})

export default store

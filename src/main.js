import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import './icons'
import './utils'
import '@/styles/index.scss'
import './api/http'
import '@/components/common'
import LayoutStore from '@/layouts/index'
import { resetRouter } from './router/index'
import Cookies from 'js-cookie'

import VueAddition from '@/addition'
import PortalVue from 'portal-vue'
import router from './router'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://101.42.171.88:8090/'
axios.defaults.withCredentials = true

Vue.use(VueAddition)
Vue.use(PortalVue)
Vue.use(LayoutStore, {
  state: {
    isFixedNavBar: true,
    layoutMode: 'ttb',
    themeColor: 'theme_color_blue',
    theme: 'light'
  },
  actions: {
    toGroupMessage() {
      router.push('/list/table-group-message')
    },
    onLogout() {
      resetRouter()
      Cookies.remove('admin-token')
      router.replace({ name: 'login' })
    },
    toTableCreate() {
      router.push('/list/table-created')
    },
    toTableLatest() {
      router.push('/list/table-latest')
    },
    toPersonalCenter() {
      router.push('/personal/center')
    },
    toRichTextEditor() {
      router.push('/editor/rich-text')
    },
    toRichTextReadOnly() {
      router.push('/editor/rich-text-readonly')
    },
    toGroupRichTextEditor() {
      router.push('/editor/rich-text-group')
    },
    toChooseTemplate() {
      router.push('/list/table-template')
    },
    toGroupFile() {
      router.push('/list/table-group-file')
    },
    toGroup() {
      router.push('/list/table-group')
    },
    toGroupMember() {
      router.push('/list/table-group-member')
    },
    toGroupSpace() {
      router.push('/list/table-group')
    },
    toGroupRecover() {
      router.push('/list/table-group-recover')
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

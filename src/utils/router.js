import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import LayoutStore from '@/layouts/index'
import { routes as constantRoutes } from '@/router'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'

NProgress.configure({ showSpinner: false })

const whiteList = ['login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.includes(to.name)) {
    next()
    NProgress.done()
  } else if (to.name !== 'login' && !getters.getToken(state) && to.name !== 'register' && to.name !== 'forget' && to.name !== 'start' && to.name !== 'share') {
    alert('请先登录！')
    next({ name: 'login' })
    NProgress.done()
  } else {
    const isEmptyRoute = LayoutStore.isEmptyPermissionRoute()
    if (isEmptyRoute) {
      // 加载路由
      const accessRoutes = []
      accessRoutes.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })
      LayoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
      next({ ...to, replace: true })
      // getRoutes().then(async routes => {
      //   accessRoutes.push(...routes)
      //   accessRoutes.push({
      //     path: '*',
      //     redirect: '/404',
      //     hidden: true
      //   })
      //   LayoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
      //   router.addRoutes(accessRoutes)
      //   next({ ...to, replace: true })
      // })
    } else {
      next()
    }
        next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

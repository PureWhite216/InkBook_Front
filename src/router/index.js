import Vue from 'vue'
import VueRouter from 'vue-router'

import { Layout } from '@/layouts/index'

import NextPageInfo from './next-page/routes'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
  ...NextPageInfo,
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/posterEditor',
    name: 'posterEditor',
    component: () => import('@/views/posterEditor'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/forget'),
    hidden: true
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('@/views/share'),
    hidden: true
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'center',
        name: 'personalCenter',
        component: () => import('@/views/personal'),
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'rich-text',
        name: 'richText',
        component: () => import('@/views/editor/rich-text'),
        meta: {
          title: '文档编辑'
        }
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'rich-text-group',
        name: 'richTextGroup',
        component: () => import('@/views/editor/rich-text-group'),
        meta: {
          title: '团队文档编辑'
        }
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'rich-text-readonly',
        name: 'richTextReadOnly',
        component: () => import('@/views/editor/rich-text-readonly'),
        meta: {
          title: '只读文档'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-template',
        name: 'tableTemplate',
        component: () => import('@/views/list/table-template'),
        meta: {
          title: '模板选择'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-latest',
        name: 'tableLatest',
        component: () => import('@/views/list/table-latest'),
        meta: {
          title: '最近浏览文件'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-like',
        name: 'tableLike',
        component: () => import('@/views/list/table-like'),
        meta: {
          title: '最近收藏文件'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-created',
        name: 'tableCreated',
        component: () => import('@/views/list/table-created'),
        meta: {
          title: '个人文件'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-share',
        name: 'tableShare',
        component: () => import('@/views/list/table-share'),
        meta: {
          title: '共享给我'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-group',
        name: 'tableGroup',
        component: () => import('@/views/list/table-group'),
        meta: {
          title: '团队空间'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-group-file',
        name: 'tableGroupFile',
        component: () => import('@/views/list/table-group-message'),
        meta: {
          title: '团队信息'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-group-message',
        name: 'tableGroupMessage',
        component: () => import('@/views/list/table-group-message'),
        meta: {
          title: '团队信息'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-group-project',
        name: 'tableGroupProject',
        component: () => import('@/views/list/table-group-project'),
        meta: {
          title: '项目信息'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-recentvisit',
        name: 'tableRecentvisit',
        component: () => import('@/views/list/table-recentvisit'),
        meta: {
          title: '最近浏览'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-favorite',
        name: 'tableFavorite',
        component: () => import('@/views/list/table-favorite'),
        meta: {
          title: '收藏'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-group-member',
        name: 'tableGroupMember',
        component: () => import('@/views/list/table-group-member'),
        meta: {
          title: '团队成员'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-recover',
        name: 'tableRecover',
        component: () => import('@/views/list/table-recover'),
        meta: {
          title: '个人文件回收站'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-group-recover',
        name: 'tableGroupRecover',
        component: () => import('@/views/list/table-group-recover'),
        meta: {
          title: '团队文件回收站'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'root',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/index/main',
    name: 'main',
    redirect: '/list/table-group',
    hidden: true
  }
]

const createRouter = () => new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router

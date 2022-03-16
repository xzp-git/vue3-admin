import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Layout from '@/components/layout/index.vue'

//看作是异步获取路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        name: 'Documentation',
        component: () => import('@/views/documentation/index.vue'),
        meta: {
          title: 'Documentation',
          icon: 'documentation',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        name: 'Guide',
        component: () => import('@/views/guide/index.vue'),
        meta: {
          title: 'Guide',
          icon: 'guide',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      icon: 'lock',
      hidden: false
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user.vue'),
        meta: {
          title: 'User Management',
          icon: 'list',
          hidden: false
        }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu.vue'),
        meta: {
          title: 'Menu Management',
          icon: 'list',
          hidden: true
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role.vue'),
        meta: {
          title: 'Role Management',
          icon: 'list',
          hidden: false
        }
      }
    ]
  },
  {
    // 外链路由
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com/',
        redirect: '/',
        meta: {
          title: 'External Link',
          icon: 'link',
          hidden: false
        }
      }
    ]
  }
]

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        }
      }
    ]
  }
]
export const routes = [...constantRoutes, ...asyncRoutes]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

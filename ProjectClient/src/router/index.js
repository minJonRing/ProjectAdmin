import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/child',
    name: 'Child',
    component: () => import('@/views/child/index.vue'),
    meta: {
      title: '我的'
    },
    children: [
      {
        path: 'profession',
        name: 'Profession',
        component: () => import('@/views/child/profession/index.vue'),
        meta: {
          title: '职业史'
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
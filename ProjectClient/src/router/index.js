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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '用户'
    },
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '文章'
    },
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/article/index.vue'),
        meta: {
          title: '添加文章'
        }
      },
      {
        path: 'add',
        name: 'ArticleAdd',
        component: () => import('@/views/article/add.vue'),
        meta: {
          title: '添加文章'
        }
      },
      {
        path: 'edit',
        name: 'ArticleEdit',
        component: () => import('@/views/article/edit.vue'),
        meta: {
          title: '编辑文章'
        }
      },
      {
        path: 'see',
        name: 'ArticleSee',
        component: () => import('@/views/article/see.vue'),
        meta: {
          title: '查看文章'
        }
      }
    ]
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import('@/views/index.vue'),
    meta: {
      title: '项目'
    },
    children: [
      {
        path: 'list',
        name: 'ProjectList',
        component: () => import('@/views/project/index.vue'),
        meta: {
          title: '添加项目'
        }
      },
      {
        path: 'add',
        name: 'ProjectAdd',
        component: () => import('@/views/project/add.vue'),
        meta: {
          title: '添加项目'
        }
      },
      {
        path: 'edit',
        name: 'ProjectEdit',
        component: () => import('@/views/project/edit.vue'),
        meta: {
          title: '编辑项目'
        }
      },
      {
        path: 'see',
        name: 'ProjectSee',
        component: () => import('@/views/project/see.vue'),
        meta: {
          title: '查看项目'
        }
      }
    ]
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
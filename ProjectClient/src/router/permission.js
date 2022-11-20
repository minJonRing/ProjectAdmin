import router from './index'
import store from '../store'
import {
  getToken,
  setToken
} from '@/utils/token' // get token from cookie

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import ajax from "@/request";
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasRoles = store.getters.userInfo.name
      if (hasRoles) {
        next()
      } else {
        try {
          const userInfo = await new Promise((resolve, reject) => {
            ajax({
                url: `/userinfo`,
                type: "get",
              })
              .then(({
                data
              }) => {
                resolve(data)
              }).catch(() => {
                resolve()
              })
          })
          store.dispatch('user/getUserInfo', userInfo)
          if (!userInfo) {
            // store.dispatch('user/resetToken')
            // next({
            //   path: '/'
            // })
            next()
          } else {
            next({
              ...to,
              replace: true
            })
          }
          NProgress.done()
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    if (['/login', '/dome'].includes(to.path)) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
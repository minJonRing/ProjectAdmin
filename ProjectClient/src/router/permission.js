import router from './index'
import store from '../store'
import { getToken } from '@/utils/token' // get token from cookie

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import ajax from "@/request";
NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.userInfo.name
      if (hasRoles) {
        next()
      } else {
        try {
          await new Promise((resolve, reject) => {
            ajax({
              url: `/userinfo`,
              type: "get",
            })
              .then(({ data }) => {
                store.dispatch('user/getUserInfo', data)
                resolve()
              })
          })
          console.log(123)
          next({ ...to, replace: true })
        } catch (error) {
          console
          await store.dispatch('user/resetToken')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    if (['/login'].includes(to.path)) {
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

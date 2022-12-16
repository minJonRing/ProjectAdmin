import axios from 'axios'
import {
  ElMessage
} from 'element-plus'
import store from '@/store'
import {
  getToken
} from '@/utils/token'

const service = axios.create({
  baseURL: '/api'
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    if (store.getters.token) {
      config.headers['token'] = `Bearer ${getToken()}`
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.status !== 200) {
      ElMessage({
        message: res.msg || "错误代码:" + res.status,
        type: 'error',
        showClose: true,
        duration: 5 * 1000
      })
      return Promise.reject(res.msg || "错误代码:" + res.code)
    } else {
      return res
    }
  },
  error => {
    let _message = "";
    try {
      const {
        response,
        message
      } = error;
      const {
        data
      } = response || {}
      const dataMessage = data.message
      _message = dataMessage || message || (response ? '网络错误，请联系管理员。' : '请求超时')
    } catch (error) {
      _message = "网络错误，请联系管理员。"
    }
    // 网络不通，提示信息
    ElMessage({
      type: 'error',
      message: _message || '网络错误，请联系管理员。',
      showClose: true,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
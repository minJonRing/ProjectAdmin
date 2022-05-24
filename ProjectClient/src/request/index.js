import axios from 'axios'
import { ElMessage } from 'element-plus'


const service = axios.create({
  baseURL: '/api'
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
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
        message: res.message || "错误代码" + res.status,
        type: 'error',
        showClose: true,
        duration: 5 * 1000
      })
      return Promise.reject(res.message || "错误代码" + res.code)
    } else {
      return res
    }
  },
  error => {
    const { response } = JSON.parse(JSON.stringify(error));
    const { data } = response || {}
    const { message, status } = data
    // 网络不通，提示信息
    ElMessage({
      type: 'error',
      message: message || '网络错误，请联系管理员。',
      showClose: true,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

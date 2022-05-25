import ajax from '@/request'
import global from '@/global'
import { ElNotification } from 'element-plus'
const useDetail = (url) => {

  const handleDetail = (id) => {
    global.loading = true
    return new Promise((r, j) => {
      ajax({
        url: `${url}/${id}`,
        method: 'get',
      }).then(({ data }) => {
        r(data)
      }).finally(() => {
        global.loading = false
      })
    })

  }

  const submit = (data) => {
    global.loading = true
    const { id } = data
    return new Promise((r, j) => {
      ajax({
        url: id ? `${url}/${id}` : url,
        method: id ? 'put' : 'post',
        data
      }).then(({ data }) => {
        ElNotification.success('成功')
        r(data)
      }).finally(() => {
        global.loading = false
      })
    })
  }

  return {
    handleDetail,
    submit
  }
}

export default useDetail
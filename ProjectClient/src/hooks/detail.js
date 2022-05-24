import { ref } from "vue";
import ajax from '@/request'
import global from '@/global'
import { ElNotification } from 'element-plus'
const useDetail = (url) => {
  let detail = ref({})
  const handleDetail = (data) => {
    global.loading = true
    ajax({
      url,
      method: 'get',
      data
    }).then(({ data }) => {
      detail = data
    }).finally(() => {
      global.loading = false
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
    detail,
    handleDetail,
    submit
  }
}

export default useDetail
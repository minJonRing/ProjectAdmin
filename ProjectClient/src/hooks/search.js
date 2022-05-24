import { reactive, ref, watch, onMounted } from "vue";
import ajax from '@/request'
import global from '@/global'
import { isArray } from 'lodash'
import { ElNotification } from 'element-plus'
const useSearch = (param) => {
  const { url, searchParam, pages, autoSearch } = {
    searchParam: {},
    pages: {
      currentPage: 1,
      pageSize: 10,
      pageTotal: 0,
    },
    autoSearch: true, ...param
  }
  let search = reactive(searchParam)
  let pagination = reactive(pages)
  let table = ref([])
  onMounted(() => {
    autoSearch && handleSearch()
  })
  // 查询
  const handleSearch = () => {
    global.loading = true
    return new Promise((r, j) => {
      ajax({
        url,
        method: 'get',
        data: { ...search, ...pagination }
      }).then(({ data }) => {
        let { list, total } = data || {};
        if (isArray(data)) {
          table.value = data
          total = data.length
        } else {
          table.value = list
        }
        pagination.pageTotal = total
        r(data)
      }).finally(() => {
        global.loading = false
      })
    })
  }

  // 重置
  const handleReset = () => {
    let keys = Object.keys(searchParam)
    keys.map(key => search[key] = '')
  }

  // 分页-改变当前页
  const handleCurrentChange = (i) => {
    pagination.currentPage = i
    handleSearch()
  }

  // 分页-改变每页显示条数
  const handleSizeChange = (i) => {
    pagination.currentPage = 1
    pagination.pageSize = i
    handleSearch()
  }

  return {
    search,
    handleSearch,
    handleReset,
    table,
    pagination,
    handleCurrentChange,
    handleSizeChange
  }
}

export default useSearch
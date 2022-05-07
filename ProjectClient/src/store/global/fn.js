import { ajax } from '@/api/ajax';
import { arrToJsonFlat } from '@/utils/dictionary'
// 字典名称
export const zdName = 'zd'

// 获取字典的方法
export const getZd = (state, attr, option = {}) => {
  const _option = { isFilter: false, before: true, transformValue: 'code', transformLabel: 'name', ...option }
  const { url, isFilter, before, transformValue, transformLabel, json } = _option
  let param = state[zdName][attr];
  if (param && param.length === 0) {
    ajax({
      url: before ? `/zd${url}` : url,
      type: 'get',
    }).then(({ data }) => {
      if (isFilter) {
        let list = filterArray(data, _option)
        state[zdName][attr] = list
        json ? state[zdName][json] = arrToJsonFlat(list) : ''
      } else {

        let list = data.map(i => ({
          ...i, value: i[transformValue], label: i[transformLabel]
        }))
        state[zdName][attr] = list
        json ? state[zdName][json] = arrToJsonFlat(list, 'value', 'label') : ''
      }
    }).catch(() => {
    })
  }
  return param
}
// 数据处理
export const filterArray = (arr, option = {}) => {
  let _option = { ...option }
  const { transformValue, transformLabel } = _option
  return arr.map(i => {
    let obj = { ...i }
    if (obj.children) {
      obj.children = filterArray(obj.children, { ..._option })
    }
    return { ...obj, value: i[transformValue], label: i[transformLabel] }
  })
}
// 生成state
export const generateState = (store) => {
  const states = {}
  const keys = Object.keys(store)
  for (const i in keys) {
    const key = keys[i]
    const { initValue, type } = store[key]
    if (type === 'get') {
      states[key] = {}
    } else {
      states[key] = initValue
    }
  }
  return states
}

// 生成getters
export const generateGetters = (store) => {
  const getters = {}
  const keys = Object.keys(store)
  for (const i in keys) {
    const key = keys[i]
    const { option, type } = store[key]
    if (type === 'get') {
      getters[key] = state => state[zdName][key]
    } else {
      getters[key] = state => getZd(state, key, option)
    }
  }
  return getters
}
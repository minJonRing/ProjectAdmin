/**
 * 
 * ** areaAll {   定义的一个全局数据
 * 
 * **** initValue   数据的初始值
 * **** option      配置项
 * **** error       重复时提示的内容
 * 
 * ** }
 * }
 */
import { generateState, generateGetters } from './fn'
// 字典名称

// 字典集合
export const store = {

  // 地区
  areaCode: {
    initValue: [],
    option: { url: '/areaCode', isFilter: true, },
    error: ''
  },
  // 经济类型
  economicType: {
    initValue: [],
    option: { url: '/economicType', isFilter: true, },
    error: ''
  },
  // 企业规模
  scaleCode: {
    initValue: [],
    option: { url: '/scaleCode', },
    error: ''
  },
  // 行业
  industryCode: {
    initValue: [],
    option: { url: '/industryCode', isFilter: true, },
    error: ''
  },
  // 
  // 危害因素
  hazardCode: {
    initValue: [],
    option: { url: '/hazardCode', isFilter: true, json: 'hazardJson' },
    error: ''
  },
  hazardJson: {
    type: 'get'
  },
  // 自己所在地区字典
  selfArea: {
    initValue: [],
    option: { url: '/inspectedRegAreaCode', isFilter: true, },
    error: ''
  },

}

// state getters
const state = generateState(store)
const getters = generateGetters(store)
// 导出
export {
  getters,
  state
}
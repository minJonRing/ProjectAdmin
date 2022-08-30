import { setToken, getToken } from '@/utils/token'

interface State {
  token: String,
  userInfo: Object
}

const userInfo: any = {
  name: '',
  type: '',
  avatar: ''
}

const state = {
  token: getToken(),
  userInfo: {
    ...userInfo
  },
}

const mutations = {
  SET_USER_INFO: (state: State, data: any) => {
    state.userInfo = { ...userInfo, ...data };
  },
  RESET_TOKEN: (state: State) => {
    state.userInfo = {
      ...userInfo
    }
    setToken('')
  },
}

const actions = {
  getUserInfo({ commit }: any, data: Object) {
    commit('SET_USER_INFO', data)
  },
  resetToken({ commit }: any, data: Object) {
    commit('RESET_TOKEN')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

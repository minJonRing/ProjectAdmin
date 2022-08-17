import { setToken, getToken } from '@/utils/token'

interface State {
  token: String,
  userInfo: Object
}

const state = {
  token: getToken(),
  userInfo: {
    name: '',
    type: '',
    avatar: ''
  },
}

const mutations = {
  SET_USER_INFO: (state: State, data: any) => {
    console.log(data)
    state.userInfo = data;
  },
  RESET_TOKEN: (state: State, data: any) => {
    state.userInfo = {}
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

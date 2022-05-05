

interface State {
  userInfo: Object
}

const state = {
  userInfo: {
    name: '赖亚楠'
  },
}

const mutations = {
  SET_USER_INFO: (state: State, data: Object) => {
    state.userInfo = data
  },
}

const actions = {
  login({ commit }: any, data: Object) {
    commit('SET_USER_INFO', data)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

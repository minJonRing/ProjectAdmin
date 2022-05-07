

interface State {
  userInfo: Object
}

const state = {
  userInfo: {
    name: '涂乔荣',
    type: 3,
    avatar: '/upload/image/9062b0dc7c8186caf43fc5101'
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



interface State {
  loading: Boolean
}

const state = {
  loading: false
}

const mutations = {
  SET_LOADING: (state: State, data: Boolean) => {
    state.loading = data
  },
}

const actions = {
  setLoading({ commit }: any, data: Boolean) {
    commit('SET_LOADING', data)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

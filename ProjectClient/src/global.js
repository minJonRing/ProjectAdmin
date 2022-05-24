import store from './store'

let global = {
  loading: false
}

Object.defineProperty(global, 'loading', {
  set: function (value) {
    store.dispatch('system/setLoading', value)
  },
  get: function () {
    return store.getters.loading
  }
})

export default global
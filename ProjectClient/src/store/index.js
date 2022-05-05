import Vuex from 'vuex'
import getters from './getters'

const modulesFiles = import.meta.globEager('./modules/*.ts')
let modules = {};
for (let path in modulesFiles) {
  const key = path.replace(/.+(?=\/)|(\/)|(\.ts)/g, '')
  modules[key] = modulesFiles[path].default
}

const store = new Vuex.Store({
  modules,
  getters
})

export default store


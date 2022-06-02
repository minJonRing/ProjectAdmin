const KEY: string = 'token'

const setToken = (token: any) => {
  sessionStorage.setItem(KEY, token)
}

const getToken = () => {
  sessionStorage.getItem(KEY)
}

const deleteToken = () => {
  sessionStorage.removeItem(KEY)
}

export {
  setToken,
  getToken,
  deleteToken
}
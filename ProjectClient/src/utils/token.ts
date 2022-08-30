const KEY: string = 'token'

const setToken = (token: any) => {
  return new Promise((r) => {
    sessionStorage.setItem(KEY, token)
    r(token)
  })
}

const getToken = () => {
  return sessionStorage.getItem(KEY)
}

const deleteToken = () => {
  return new Promise((r) => {
    sessionStorage.removeItem(KEY)
    r()
  })
}

export {
  setToken,
  getToken,
  deleteToken
}
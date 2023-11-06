import config from '../../config/config'

const sessionConfig = config.session

const saveSession = userData => {
  userData.token.expiresOn = new Date().getTime() + userData.token.expiresIn
  sessionStorage.setItem(sessionConfig.key, JSON.stringify(userData))
}

const getSession = () => {
  return JSON.parse(sessionStorage.getItem(sessionConfig.key))
}

const deleteSession = () => {
  return sessionStorage.removeItem(sessionConfig.key)
}

export default {
  saveSession,
  getSession,
  deleteSession
}

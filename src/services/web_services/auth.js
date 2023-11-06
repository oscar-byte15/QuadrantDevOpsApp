import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

const login = (email, password) => {
  return axios.post(webServicesConfig.AUTH.LOGIN, {
    email: email,
    password: password
  })
}

const changePassword = (oldPassword, newPassword) =>
  axios.post(webServicesConfig.AUTH.CHANGE_PASSWORD, {
    oldPassword: oldPassword,
    newPassword: newPassword
  })

const refreshToken = (email, refreshToken) => {
  return axios.post(webServicesConfig.AUTH.REFRESH_TOKEN, {
    email: email,
    refreshToken: refreshToken
  })
}

const getMobileAuthCode = () => axios.get(webServicesConfig.AUTH.GET_MOBILE_AUTH_CODE)

const dummy = () => {
  axios
    .get(webServicesConfig.URL + 'users/listUsers', {})
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

export default {
  login,
  refreshToken,
  changePassword,
  dummy,
  getMobileAuthCode
}

import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

const listUsers = () => {
  return axios.get(webServicesConfig.USERS.LIST_USERS)
}

export const telegramAuth = chatId => axios.post(webServicesConfig.USERS.TELEGRAM_AUTH, { chatId })

export default {
  listUsers
}

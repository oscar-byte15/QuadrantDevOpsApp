import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

export const addLanguage = (name, code) => {
  return axios.post(webServicesConfig.LANGUAGES.ADD_LANGUAGE, {
    name: name,
    code: code
  })
}
export const listLanguages = () => axios.get(webServicesConfig.LANGUAGES.LIST_LANGUAGES)

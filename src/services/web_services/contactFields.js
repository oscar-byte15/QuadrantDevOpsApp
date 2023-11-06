import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServicesV2

export const getDefaultContactFields = () =>
  axios.get(webServicesConfig.CONTACT_FIELD.GET_DEFAULT_LIST)

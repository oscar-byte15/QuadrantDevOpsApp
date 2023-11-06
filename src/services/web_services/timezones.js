import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

const addTimezone = (name, gmtNumber) => {
  return axios.post(webServicesConfig.ADMIN.ADD_TIMEZONE, {
    name: name,
    gmtNumber: gmtNumber
  })
}

const listTimezones = () => {
  return axios.get(webServicesConfig.TIMEZONES.LIST_TIMEZONES)
}

export default {
  addTimezone,
  listTimezones
}

import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

const addCountry = name => {
  return axios.post(webServicesConfig.COUNTRIES.ADD_COUNTRY, {
    name: name
  })
}

const listCountries = () => {
  return axios.get(webServicesConfig.COUNTRIES.LIST_COUNTRIES)
}

export default {
  addCountry,
  listCountries
}

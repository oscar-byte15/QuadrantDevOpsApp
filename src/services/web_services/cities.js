import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

const addCity = name => {
  return axios.post(webServicesConfig.CITIES.ADD_CITY, {
    name: name
  })
}

const listCities = countryId => {
  if (countryId) return axios.get(webServicesConfig.CITIES.LIST_CITIES + `/${countryId}`)
  else return axios.get(webServicesConfig.CITIES.LIST_CITIES)
}

export default {
  addCity,
  listCities
}

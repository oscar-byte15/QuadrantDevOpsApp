import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

export const addScale = (name, variant, scale) => {
  return axios.post(webServicesConfig.CSAT_SCALES.ADD_SCALE, {
    name: name,
    variant: variant,
    scale: scale
  })
}

export const listScales = () => {
  return axios.get(webServicesConfig.CSAT_SCALES.LIST_SCALES)
}

import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices.BRAND

export const getBrandsByQuadrantClientId = quadrantId => axios.get(webServicesConfig.GET_BRAND+ quadrantId)

export const createBrand = config => axios.post(webServicesConfig.CREATE_BRAND, config)

export const updateBrand = (brandId, data) =>
  axios.put(webServicesConfig.UPDATE_BRAND + `/${brandId}`, data)

  export const deleteBrand =(brandId)=>{
    axios.delete(webServicesConfig.DELETE_BRAND+ `/${brandId}`)
  }
export default {
  getBrandsByQuadrantClientId,
  updateBrand,
  createBrand
}

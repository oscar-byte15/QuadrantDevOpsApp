import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices.DAYPART

export const createDayParts = dayparts => axios.post(webServicesConfig.CREATE_DATEPART, dayparts)

export const deleteDayparts = id => {
  return axios.delete(webServicesConfig.DELETE_DATEPART + `/${id}`)
}

export const getDayparts = () => axios.get(webServicesConfig.GET_ALL_DATEPART)
export default {
  createDayParts,
  deleteDayparts,
  getDayparts
}

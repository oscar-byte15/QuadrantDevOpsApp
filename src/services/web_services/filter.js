import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServicesV2

export const listSurveys = () => axios.get(webServicesConfig.SURVEYS.LIST)
export const listEvaluationGroups = () => axios.get(webServicesConfig.EVALUATION_GROUPS.LIST)

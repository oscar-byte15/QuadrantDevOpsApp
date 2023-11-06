import axios from './axios/axios'
import config from '../../config/config'

const notifications = config.webServicesV2.NOTIFICATION

export const getEvaluationGroups = () => axios.get(notifications.GET_EVALUATION_GROUPS)

export const saveConfiguration = config => axios.post(notifications.SAVE_CONFIGURATION, config)

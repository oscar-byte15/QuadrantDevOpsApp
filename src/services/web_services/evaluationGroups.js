import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices
const webServicesConfigV2 = config.webServicesV2

export const saveEvaluationGroup = ({
  name,
  timezone,
  country,
  city,
  district,
  address,
  contactName,
  contactPhone,
  contactEmail
}) =>
  axios.post(webServicesConfig.EVALUATION_GROUPS.ADD_EVALUATION_GROUP, {
    name,
    timezone,
    country,
    city,
    district,
    address,
    contactName,
    contactPhone,
    contactEmail
  })

export const updateEvaluationGroup = (
  id,
  name,
  timezone,
  country,
  city,
  district,
  address,
  contactName,
  contactPhone,
  contactEmail,
  surveyList
) =>
  axios.post(webServicesConfig.EVALUATION_GROUPS.EDIT_EVALUATION_GROUP, {
    id: id,
    name: name,
    timezone: timezone,
    country: country,
    city: city,
    district: district,
    address: address,
    contactName: contactName,
    contactPhone: contactPhone,
    contactEmail: contactEmail,
    surveyList: surveyList
  })

export const listEvaluationGroups = () =>
  axios.get(webServicesConfig.EVALUATION_GROUPS.LIST_EVALUATION_GROUPS)

export const getEvaluationGroup = id =>
  axios.get(webServicesConfig.EVALUATION_GROUPS.GET_EVALUATION_GROUP + id)

export const getEvaluationGroups = page =>
  axios.get(webServicesConfigV2.EVALUATION_GROUPS.GET_EVALUATION_GROUPS + '?page=' + page)

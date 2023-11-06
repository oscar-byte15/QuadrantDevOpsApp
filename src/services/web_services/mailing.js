import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

export const sendImageSurveyBatch = data => {
  return axios.post(webServicesConfig.MAILING.SEND_IMAGE_SURVEY_BATCH, {
    ...data,
    participantsEmail: 'dummy'
  })
}

export const getMailingState = () => axios.get(webServicesConfig.MAILING.GET_MAILING_STATE)

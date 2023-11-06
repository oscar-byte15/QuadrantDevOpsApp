import axios from './axios/axios'
import config from '../../config/config'

const { COMMENT_BOX } = config.webServicesV2

export const getCommentBoxAnalysis = data => axios.post(`${COMMENT_BOX.TEXT_ANALYSIS}`, data)

export const getComments = filter => axios.post(COMMENT_BOX.GET_COMMENTS, { filter })

export const createRecord = (surveyAnswerId, ticketBody, state, recordType) =>
  axios.post(COMMENT_BOX.CREATE_RECORD, {
    surveyAnswerId,
    ticketBody,
    state,
    recordType
  })

export const getTicketLogs = surveyAnswerId =>
  axios.post(COMMENT_BOX.GET_TICKET_LOG, {
    surveyAnswerId
  })

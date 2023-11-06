import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices
const webServicesV2Config = config.webServicesV2

export const getCsatScore = (
  startDate,
  endDate,
  evaluationGroupIds = null,
  channel = ['getAll'],
  surveyIds = null
) => {
  return axios.post(webServicesConfig.DASHBOARD.GET_CSAT_SCORE, {
    startDate,
    endDate,
    evaluationGroupIds,
    channel,
    surveyIds
  })
}

export const getNpsScore = (
  startDate,
  endDate,
  evaluationGroupIds = null,
  channel = ['getAll'],
  surveyIds = null
) => {
  return axios.post(webServicesConfig.DASHBOARD.GET_NPS_SCORE, {
    startDate,
    endDate,
    evaluationGroupIds,
    channel,
    surveyIds
  })
}

const getAnswerCountByEvaluationGroup = (startDate, endDate) => {
  return axios.post(webServicesConfig.DASHBOARD.GET_ANSWER_COUNT_BY_EVALUATION_GROUP, {
    startDate: startDate,
    endDate: endDate
  })
}

const getNpsAnswerDistributionsByEvaluationGroup = (startDate, endDate) => {
  return axios.post(webServicesConfig.DASHBOARD.GET_NPS_ANSWER_DISTRIBUTION_BY_EVALUATION_GROUP, {
    startDate: startDate,
    endDate: endDate
  })
}

const getExperienceTrendValuesPerDay = (startDate, endDate) => {
  return axios.post(webServicesConfig.DASHBOARD.GET_EXPERIENCE_TREND_VALUES, {
    startDate: startDate,
    endDate: endDate
  })
}

const getCsatAnswersDistributionByEvaluationGroup = (surveyId, startDate, endDate) => {
  return axios.post(
    webServicesConfig.DASHBOARD.GET_CSAT_DISTRIBUTION_BY_EVALUATION_GROUP + `/${surveyId}`,
    {
      startDate: startDate,
      endDate: endDate
    }
  )
}

// NEW HOME SERVCES

export const getTrend = (
  startDate,
  endDate,
  agrupation,
  type,
  evaluationGroupIds = ['getAll'],
  selectedChannels = ['getAll'],
  selectedDayparts = ['getAll'],
  surveyIds = ['getAll']
) => {
  return axios.post(webServicesV2Config.DASHBOARD.GET_TREND, {
    agrupation,
    startDate,
    endDate,
    type,
    evaluationGroupIds,
    surveyIds,
    channel: selectedChannels,
    dayparts: selectedDayparts
  })
}
export const getExperienceByGroup = ({
  startDate,
  endDate,
  evaluationGroups = ['getAll'],
  channel,
  surveys = ['getAll'],
  dayparts = ['getAll']
}) => {
  return axios.post(webServicesV2Config.DASHBOARD.GET_EXPERIENCE_BY_GROUP, {
    startDate,
    endDate,
    evaluationGroups,
    channel,
    surveys,
    dayparts
  })
}
export const getNpsTrend = ({
  startDate,
  endDate,
  evaluationGroups = ['getAll'],
  channel,
  surveys = ['getAll'],
  dayparts = ['getAll']
}) => {
  return axios.post(webServicesV2Config.DASHBOARD.GET_NPS_TREND, {
    startDate,
    endDate,
    evaluationGroups,
    channel,
    surveys,
    dayparts
  })
}
export const getCsatTrend = ({
  startDate,
  endDate,
  type,
  evaluationGroups = ['getAll'],
  dayparts = ['getAll'],
  surveys = ['getAll'],
  channel
}) => {
  return axios.post(webServicesV2Config.DASHBOARD.GET_CSAT_TREND, {
    startDate,
    endDate,
    type,
    evaluationGroups,
    surveys,
    dayparts,
    channel
  })
}
export const getSummaryCardsInfo = ({
  startDate,
  endDate,
  evaluationGroups = ['getAll'],
  channel,
  surveys = ['getAll'],
  dayparts = ['getAll']
}) => {
  return axios.post(webServicesV2Config.DASHBOARD.GET_SUMMARY_CARDS_INFO, {
    startDate,
    endDate,
    evaluationGroups,
    channel,
    surveys,
    dayparts
  })
}
const getGauge = (startDate, endDate, type = 'getAll') => {
  return axios.get(webServicesV2Config.DASHBOARD.GET_GAUGE, {
    params: {
      startDate,
      endDate,
      type
    }
  })
}

export const getDistribution = ({
  startDate,
  endDate,
  type = 'getAll',
  selectedGroups = ['getAll'],
  channel: channel,
  selectedSurveys = ['getAll']
}) => {
  return axios.post(webServicesV2Config.DASHBOARD.GET_DISTRIBUTION, {
    startDate,
    endDate,
    type,
    selectedGroups,
    channel: channel,
    selectedSurveys
  })
}

export const getDaypartsTrend = ({
  startDate,
  endDate,
  type,
  evaluationGroups = ['getAll'],
  surveys = ['getAll'],
  dayparts = ['getAll'],
  channel
}) => {
  return axios.post(webServicesV2Config.DASHBOARD.GET_DAYPARTS_TREND, {
    startDate,
    endDate,
    type,
    evaluationGroups,
    surveys,
    dayparts,
    channel: channel
  })
}

// ANALYSIS/REPORTS SERVICES
export const getCsatScoreTable = data =>
  axios.post(webServicesV2Config.DASHBOARD.GET_CSAT_TABLE, { ...data })

export const getNpsScoreTable = data =>
  axios.post(webServicesV2Config.DASHBOARD.GET_NPS_TABLE, { ...data })

export default {
  getCsatScore,
  getNpsScore,
  getAnswerCountByEvaluationGroup,
  getNpsAnswerDistributionsByEvaluationGroup,
  getExperienceTrendValuesPerDay,
  getCsatAnswersDistributionByEvaluationGroup,
  getGauge
}

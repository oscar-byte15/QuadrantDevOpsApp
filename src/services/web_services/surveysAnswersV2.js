import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServicesV2

export const getCsatDistributionBySurvey = (
  startDate,
  endDate,
  evaluationGroupIds = null,
  selectedChannels = ['getAll'],
  surveyIds = null
) =>
  axios.post(webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_SURVEY, {
    startDate,
    endDate,
    evaluationGroupIds,
    channel: selectedChannels,
    surveyIds
  })

export const getCsatDistributionBySurveyAndQuestion = (surveyId, startDate, endDate, channel = ['getAll']) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_SURVEY_AND_QUESTION, {
    params: {
      surveyId,
      startDate,
      endDate,
      channel
    }
  })

export const getCsatDistributionBySurveyAndQuestionAndEvaluationGroup = (
  surveyId,
  questionId,
  startDate,
  endDate,
  channel = ['getAll']
) =>
  axios.get(
    webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_SURVEY_AND_QUESTION_AND_EVALUATION_GROUP,
    {
      params: {
        surveyId,
        questionId,
        startDate,
        endDate,
        channel
      }
    }
  )

export const getCsatDistributionByEvaluationGroup = (
  startDate,
  endDate,
  evaluationGroupIds = null,
  selectedChannels = ['getAll'],
  surveyIds = null
) =>
  axios.post(webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_EVALUATION_GROUP, {
    startDate,
    endDate,
    evaluationGroupIds,
    channel: selectedChannels,
    surveyIds
  })

export const getCsatDistributionByEvaluationGroupAndSurvey = (
  evaluationGroupId,
  selectedChannels,
  startDate,
  endDate
) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY, {
    params: {
      evaluationGroupId,
      channel : selectedChannels,
      startDate,
      endDate
    }
  })

export const getCsatDistributionByEvaluationGroupAndSurveyAndQuestion = (
  evaluationGroupId,
  surveyId,
  channel,
  startDate,
  endDate
) =>
  axios.get(
    webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY_AND_QUESTION,
    {
      params: {
        evaluationGroupId,
        surveyId,
        channel,
        startDate,
        endDate
      }
    }
  )

export const getNpsDistributionByEvaluationGroup = (
  startDate,
  endDate,
  evaluationGroupIds = null,
  channel = ['getAll'],
  surveyIds = null
) =>
  axios.post(webServicesConfig.SURVEY_ANSWERS.NPS_DISTRIBUTION_BY_EVALUATION_GROUP, {
    startDate,
    endDate,
    evaluationGroupIds,
    channel,
    surveyIds
  })

export const getNpsDistributionByEvaluationGroupAndSurvey = (
  evaluationGroupId,
  //channel = ['getAll'],
  startDate,
  endDate
) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.NPS_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY, {
    params: {
      evaluationGroupId,
      //channel,
      startDate,
      endDate
    }
  })

//CUSTOM SANTANDER++++++++++++++
//
export const getCsatDistributionByExecutive = (
  startDate,
  endDate,
  evaluationGroups,
  executivesGroup
) => {
  return axios.post(webServicesConfig.CUSTOM.CSAT_DISTRIBUTION_BY_EXECUTIVE, {
    startDate,
    endDate,
    evaluationGroups,
    executivesGroup
  })
}

export const getNpsDistributionByExecutive = (
  startDate,
  endDate,
  evaluationGroups,
  executivesGroup
) => {
  return axios.post(webServicesConfig.CUSTOM.NPS_DISTRIBUTION_BY_EXECUTIVE, {
    startDate,
    endDate,
    evaluationGroups,
    executivesGroup
  })
}

export const getNpsDistributionByAllExecutives = (startDate, endDate, evaluationGroups) => {
  return axios.post(webServicesConfig.CUSTOM.NPS_DISTRIBUTION_BY_ALL_EXECUTIVES, {
    startDate,
    endDate,
    evaluationGroups
  })
}

export const getCsatDistributionByQuestionAnswer = (
  startDate,
  endDate,
  questionAnswer,
  evaluationGroups
) => {
  return axios.post(webServicesConfig.CUSTOM.CSAT_DISTRIBUTION_BY_QUESTION_ANSWER, {
    startDate,
    endDate,
    questionAnswer,
    evaluationGroups
  })
}

export const getNpsDistributionByQuestionAnswer = (
  startDate,
  endDate,
  questionAnswer,
  evaluationGroups
) => {
  return axios.post(webServicesConfig.CUSTOM.NPS_DISTRIBUTION_BY_QUESTION_ANSWER, {
    startDate,
    endDate,
    questionAnswer,
    evaluationGroups
  })
}

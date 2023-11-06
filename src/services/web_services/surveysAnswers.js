import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

const getNumberOfAnswers = (startDate, endDate) =>
  axios.post(webServicesConfig.SURVEY_ANSWERS.GET_ANSWERS_QUANTITY, {
    startDate: startDate,
    endDate: endDate
  })

export const downloadExcel = (startDate, endDate) =>
  axios.get(
    webServicesConfig.SURVEY_ANSWERS.DOWNLOAD_SUMMARY,
    {
      responseType: 'blob',
      params: {
        startDate: startDate,
        endDate: endDate
      }
    },
    { timeout: 10000 }
  )

const getCsatDistributionBySurvey = (startDate, endDate) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_SURVEY, {
    params: {
      startDate: startDate,
      endDate: endDate
    }
  })

const getCsatDistributionBySurveyAndQuestion = (surveyId, startDate, endDate) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_SURVEY_AND_QUESTION, {
    params: {
      surveyId: surveyId,
      startDate: startDate,
      endDate: endDate
    }
  })

const getCsatDistributionBySurveyAndQuestionAndEvaluationGroup = (
  surveyId,
  questionId,
  startDate,
  endDate
) =>
  axios.get(
    webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_SURVEY_AND_QUESTION_AND_EVALUATION_GROUP,
    {
      params: {
        surveyId: surveyId,
        questionId: questionId,
        startDate: startDate,
        endDate: endDate
      }
    }
  )

const getCsatDistributionByEvaluationGroup = (startDate, endDate) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_EVALUATION_GROUP, {
    params: {
      startDate: startDate,
      endDate: endDate
    }
  })

const getCsatDistributionByEvaluationGroupAndSurvey = (evaluationGroupId, startDate, endDate) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY, {
    params: {
      evaluationGroupId: evaluationGroupId,
      startDate: startDate,
      endDate: endDate
    }
  })

const getCsatDistributionByEvaluationGroupAndSurveyAndQuestion = (
  evaluationGroupId,
  surveyId,
  startDate,
  endDate
) =>
  axios.get(
    webServicesConfig.SURVEY_ANSWERS.CSAT_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY_AND_QUESTION,
    {
      params: {
        evaluationGroupId: evaluationGroupId,
        surveyId: surveyId,
        startDate: startDate,
        endDate: endDate
      }
    }
  )

const getNpsDistributionByEvaluationGroup = (startDate, endDate) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.NPS_DISTRIBUTION_BY_EVALUATION_GROUP, {
    params: {
      startDate: startDate,
      endDate: endDate
    }
  })

const getNpsDistributionByEvaluationGroupAndSurvey = (evaluationGroupId, startDate, endDate) =>
  axios.get(webServicesConfig.SURVEY_ANSWERS.NPS_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY, {
    params: {
      evaluationGroupId: evaluationGroupId,
      startDate: startDate,
      endDate: endDate
    }
  })

export default {
  getNumberOfAnswers,
  downloadExcel,
  getCsatDistributionBySurvey,
  getCsatDistributionBySurveyAndQuestion,
  getCsatDistributionBySurveyAndQuestionAndEvaluationGroup,
  getCsatDistributionByEvaluationGroup,
  getCsatDistributionByEvaluationGroupAndSurvey,
  getCsatDistributionByEvaluationGroupAndSurveyAndQuestion,
  getNpsDistributionByEvaluationGroup,
  getNpsDistributionByEvaluationGroupAndSurvey
}

let baseUrl = ''
switch (process.env.REACT_APP_WS_ENV) {
  case 'prd':
    baseUrl = process.env.REACT_APP_WS_PRD_URL
    break
  case 'pp':
    baseUrl = process.env.REACT_APP_WS_PP_URL
    break
  case 'devip':
    baseUrl = process.env.REACT_APP_WS_LOCAL_IP_URL
    break
  case 'dev':
  default:
    baseUrl = process.env.REACT_APP_WS_LOCAL_URL
}
const version = 'v2/'

export const URL = baseUrl + version

const SUMMARY_URL = URL + 'summary/'
const SURVEY_ANSWERS_URL = URL + 'surveyAnswer/'
const SURVEY_URL = URL + 'survey/'
const COMMENT_BOX_URL = URL + 'commentBox/'
const EVALUATION_GROUP_URL = URL + 'evaluationGroup/'
const NOTIFICATION_URL = URL + 'notification/'
const NPS_FOLLOWUP = URL + 'npsFollowUp/'

export default {
  webServicesV2: {
    NOTIFICATION: {
      GET_EVALUATION_GROUPS: NOTIFICATION_URL + 'getEvaluationGroups',
      SAVE_CONFIGURATION: NOTIFICATION_URL + 'saveConfiguration'
    },
    COMMENT_BOX: {
      GET_COMMENTS: COMMENT_BOX_URL + 'getComments',
      TEXT_ANALYSIS: COMMENT_BOX_URL + 'textAnalysis',
      CREATE_RECORD: COMMENT_BOX_URL + 'createRecord',
      GET_TICKET_LOG: COMMENT_BOX_URL + 'getTicketLog'
    },
    DASHBOARD: {
      GET_TREND: SUMMARY_URL + 'getTrend',
      GET_EXPERIENCE_BY_GROUP: SUMMARY_URL + 'getExperienceByGroups',
      GET_GAUGE: SUMMARY_URL + 'getGauge',
      GET_DISTRIBUTION: SUMMARY_URL + 'getDistribution',
      GET_NPS_TREND: SUMMARY_URL + 'getNpsTrend',
      GET_CSAT_TREND: SUMMARY_URL + 'getCsatTrend',
      GET_CSAT_TABLE: SUMMARY_URL + 'getCsatScoreTable',
      GET_NPS_TABLE: SUMMARY_URL + 'getNpsScoreTable',
      GET_SUMMARY_CARDS_INFO: SUMMARY_URL + 'getSummaryCardsInfo',
      GET_DAYPARTS_TREND: SUMMARY_URL + 'getDaypartsTrend'
    },
    CUSTOM: {
      CSAT_DISTRIBUTION_BY_EXECUTIVE: URL + 'surveyAnswer/getCsatDistributionByExecutive',
      NPS_DISTRIBUTION_BY_EXECUTIVE: URL + 'surveyAnswer/getNpsDistributionByExecutive',
      NPS_DISTRIBUTION_BY_ALL_EXECUTIVES: URL + 'surveyAnswer/getNpsDistributionByAllExecutives',
      CSAT_DISTRIBUTION_BY_QUESTION_ANSWER:
        URL + 'surveyAnswer/getCsatDistributionByQuestionAnswer',
      NPS_DISTRIBUTION_BY_QUESTION_ANSWER: URL + 'surveyAnswer/getNpsDistributionByQuestionAnswer'
    },
    CONTACT_FIELD: {
      GET_DEFAULT_LIST: SURVEY_URL + 'contactFields/getDefaultList'
    },
    SURVEYS: {
      LIST: SURVEY_URL + 'listSurveys',
      GET_SURVEY: SURVEY_URL + 'getSurvey/',
      GET_SURVEYS: SURVEY_URL + 'getSurveys',
      UPDATE_SURVEY_ENABLED: SURVEY_URL + 'updateSurveyEnabled'
    },
    EVALUATION_GROUPS: {
      LIST: EVALUATION_GROUP_URL + 'listEvaluationGroups',
      GET_EVALUATION_GROUPS: EVALUATION_GROUP_URL + 'getEvaluationGroups'
    },
    NPS_FOLLOWUP: {
      GET_NPS_FOLLOWUP_URL: NPS_FOLLOWUP+ 'getNpsFollowUp'
    },
    SURVEY_ANSWERS: {
      CSAT_DISTRIBUTION_BY_SURVEY: SURVEY_ANSWERS_URL + 'csat/distributionBySurvey',
      CSAT_DISTRIBUTION_BY_SURVEY_AND_QUESTION:
        SURVEY_ANSWERS_URL + 'csat/distributionBySurveyAndQuestion',
      CSAT_DISTRIBUTION_BY_SURVEY_AND_QUESTION_AND_EVALUATION_GROUP:
        SURVEY_ANSWERS_URL + 'csat/distributionBySurveyAndQuestionAndEvaluationGroup',
      CSAT_DISTRIBUTION_BY_EVALUATION_GROUP:
        SURVEY_ANSWERS_URL + 'csat/distributionByEvaluationGroup',
      CSAT_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY:
        SURVEY_ANSWERS_URL + 'csat/distributionByEvaluationGroupAndSurvey',
      CSAT_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY_AND_QUESTION:
        SURVEY_ANSWERS_URL + 'csat/distributionByEvaluationGroupAndSurveyAndQuestion',
      NPS_DISTRIBUTION_BY_EVALUATION_GROUP:
        SURVEY_ANSWERS_URL + 'nps/distributionByEvaluationGroup',
      NPS_DISTRIBUTION_BY_EVALUATION_GROUP_AND_SURVEY:
        SURVEY_ANSWERS_URL + 'nps/distributionByEvaluationGroupAndSurvey'
    }
  }
}

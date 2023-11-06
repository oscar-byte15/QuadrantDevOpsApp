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
const version = 'v1/'

const URL = baseUrl + version

const AUTH_URL = URL + 'auth/'
const USERS_URL = URL + 'users/'
const CLIENTS_URL = URL + 'clients/'
const ADMIN_URL = URL + 'admin/'
const TIMEZONES_URL = URL + 'timezones/'
const COUNTRIES_URL = URL + 'countries/'
const CITIES_URL = URL + 'cities/'
const EVALUATION_GROUPS_URL = URL + 'evaluationGroups/'
const SURVEYS_URL = URL + 'surveys/'
const SURVEY_ANSWERS_URL = URL + 'surveyAnswer/'
const LANGUAGES_URL = URL + 'languages/'
const CSAT_URL = URL + 'csat/'
const CSAT_SCALE_URL = CSAT_URL + 'scales/'
const QUESTIONS_URL = URL + 'questions/'
const QUESTION_BANKS_URL = QUESTIONS_URL + 'questionBanks/'
const LINKS_URL = URL + 'links/'
const UNIQUE_LINK_URL = URL + 'uniqueLink/'
const SUMMARY_URL = URL + 'summary/'
const MAILING_URL = URL + 'mailing/'
const QUADRANT_REPORT_URL = URL + 'customReports/'
const BRAND_URL = URL + 'brands/'
const DATEPART_URL = URL + 'dayparts/'

export default {
  webServices: {
    URL: URL,
    QUADRANT_REPORT: {
      GET_REPORT: QUADRANT_REPORT_URL,
      GET_REPORT_PINKBERRY: QUADRANT_REPORT_URL + 'pinkberryReport',
      GET_TOTAL_DATA_PINKBERRY: QUADRANT_REPORT_URL + 'totalDataPinkberry',
      GET_TOTAL_DATA: QUADRANT_REPORT_URL + 'totalData',
      GET_DATA_PER_QUESTION: QUADRANT_REPORT_URL + 'getDataPerQuestion'
    },
    AUTH: {
      LOGIN: AUTH_URL + 'login',
      REFRESH_TOKEN: AUTH_URL + 'refreshToken',
      CHANGE_PASSWORD: AUTH_URL + 'changePassword',
      GET_MOBILE_AUTH_CODE: AUTH_URL + 'getMobileAuthCode'
    },
    USERS: {
      CREATE_USER: USERS_URL,
      UPDATE_USER: USERS_URL,
      LIST_USERS: USERS_URL + 'listUsers',
      TELEGRAM_AUTH: USERS_URL + 'telegramAuth'
    },
    CLIENTS: {
      GET_USERS: CLIENTS_URL + 'users',
      USERS: CLIENTS_URL + 'users'
    },
    ADMIN: {
      ADD_TIMEZONE: ADMIN_URL + 'addTimezone',
      CREATE_QUADRANT_CLIENT: ADMIN_URL + 'quadrantClients',
      GET_QUADRANT_CLIENTS: ADMIN_URL + 'quadrantClients',
      UPDATE_QUADRANT_CLIENT: ADMIN_URL + 'quadrantClients',
      GET_USERS: ADMIN_URL + 'users',
      UPDATE_USER_PASSWORD: ADMIN_URL + 'users/password'
    },
    TIMEZONES: {
      LIST_TIMEZONES: TIMEZONES_URL + 'listTimezones'
    },
    LANGUAGES: {
      ADD_LANGUAGE: LANGUAGES_URL + 'addLanguage',
      LIST_LANGUAGES: LANGUAGES_URL + 'listLanguages'
    },
    COUNTRIES: {
      ADD_COUNTRY: COUNTRIES_URL + 'addCountry',
      LIST_COUNTRIES: COUNTRIES_URL + 'listCountries'
    },
    CITIES: {
      ADD_CITY: CITIES_URL + 'addCity',
      LIST_CITIES: CITIES_URL + 'listCities'
    },
    CSAT_SCALES: {
      ADD_SCALE: CSAT_SCALE_URL + 'addScale',
      LIST_SCALES: CSAT_SCALE_URL + 'listScales'
    },
    QUESTION_BANKS: {
      ADD_BANK: QUESTION_BANKS_URL + 'addQuestionBank',
      LIST_BANKS: QUESTION_BANKS_URL + 'listQuestionBanks'
    },
    EVALUATION_GROUPS: {
      ADD_EVALUATION_GROUP: EVALUATION_GROUPS_URL + 'addEvaluationGroup',
      EDIT_EVALUATION_GROUP: EVALUATION_GROUPS_URL + 'editEvaluationGroup',
      LIST_EVALUATION_GROUPS: EVALUATION_GROUPS_URL + 'listEvaluationGroups',
      GET_EVALUATION_GROUP: EVALUATION_GROUPS_URL + 'getEvaluationGroup/'
    },
    SURVEYS: {
      ADD_SURVEY: SURVEYS_URL + 'addSurvey',
      LIST_SURVEYS: SURVEYS_URL + 'listSurveys',
      GET_SURVEY_DETAIL: SURVEYS_URL + 'getSurveyDetail/',
      REVALIDATE: SURVEYS_URL + 'revalidate/',
      GET_ALL_SURVEYS: SURVEYS_URL + 'getAllSurveys'
    },
    LINKS: {
      LIST_LINKS: LINKS_URL + 'listLinks'
    },
    SURVEY_ANSWERS: {
      GET_ANSWERS_QUANTITY: SURVEYS_URL + 'getSurveyAnswersQty',
      DOWNLOAD_SUMMARY: SUMMARY_URL + 'getSummary',
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
    },
    DASHBOARD: {
      GET_CSAT_SCORE: SUMMARY_URL + 'csat/score',
      GET_NPS_SCORE: SUMMARY_URL + 'nps/score',
      GET_EXPERIENCE_TREND_VALUES: SUMMARY_URL + 'experienceTrend',
      GET_CSAT_DISTRIBUTION_BY_EVALUATION_GROUP: CSAT_URL + 'answerDistributionByEvaluationGroup',
      GET_NPS_ANSWER_DISTRIBUTION_BY_EVALUATION_GROUP: SUMMARY_URL + 'nps/distributions',
      GET_ANSWER_COUNT_BY_EVALUATION_GROUP: SUMMARY_URL + 'evaluationGroups/answersQty'
    },
    MAILING: {
      SEND_IMAGE_SURVEY_BATCH: MAILING_URL + 'sendImageSurveyBatchWeb',
      GET_MAILING_STATE: MAILING_URL + 'getMailingState'
    },
    RATING: {
      SAVE_PRODUCT: URL + 'rating/product',
      GET_PRODUCTS: URL + 'rating/product',
      GET_PRODUCTS_REPORT: URL + 'rating/getProductsReport',
      GET_PRODUCT_DETAILED_REPORT: URL + 'rating/getPRoductDetailedReport',
      GET_PRODUCT_DISTRIBUTION: URL + 'rating/getProductDistribution'
    },
    UNIQUE_LINK: {
      CREATE: UNIQUE_LINK_URL + 'createWeb/',
      LIST: UNIQUE_LINK_URL + 'list',
      GET_STATE: UNIQUE_LINK_URL + 'uniqueLinksState',
      GET_EXCEL_WITH_UNIQUE_LINKS: UNIQUE_LINK_URL + 'excelBatchCreateUniqueLinks'
    },
    BRAND: {
      CREATE_BRAND: BRAND_URL + 'create',
      GET_BRAND: BRAND_URL,
      UPDATE_BRAND: BRAND_URL,
      DELETE_BRAND: BRAND_URL
    },
    DAYPART: {
      CREATE_DATEPART: DATEPART_URL,
      DELETE_DATEPART: DATEPART_URL + 'delete',
      GET_ALL_DATEPART: DATEPART_URL + 'listDaypartsByQuadrantClient'
    }
  }
}

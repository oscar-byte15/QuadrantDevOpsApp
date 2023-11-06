import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices
const webServicesConfigV2 = config.webServicesV2

let defaultNPSQuestion =
  'En una escala de 0 al 10 ¿Que tan probable es que nos recomiendes con tus amigos o familiares?'

const addSurvey = survey => {
  const {
    traceability,
    welcome,
    csat,
    nps,
    contact,
    farewell,
    redirect,
    commentBox,
    brand,
    ...rest
  } = survey
  let contactModule = { enabled: contact.enabled, tyc: { enabled: false } }

  if (contact.enabled) {
    contactModule = { ...contact }
    contactModule.tyc = contact.tyc.enabled ? { ...contact.tyc } : { enabled: false }

    contactModule.contactFields.forEach(field => {
      field.requiredFor = Object.keys(field.requiredFor).filter(value => field.requiredFor[value])
      field.contactField = field.contactField.id
    })
  }

  const aboutSelectToArray = value => {
    if (Array.isArray(value)) return value.map(option => option.trim())
    else if (typeof value === 'string') return value.split(',').map(option => option.trim())
    else return []
  }

  let commentBoxAux = { ...commentBox }
  commentBoxAux.questionList = commentBoxAux.questionList.map(question => {
    question.aboutSelect = {
      ...question.aboutSelect,
      options: aboutSelectToArray(question.aboutSelect.options)
    }
    return question
  })

  let npsAux = {
    enabled: nps.enabled ?? false,
    followup: {
      enabled: nps.followup?.enabled ?? false,
      ...(nps.followup.id && { id: nps.followup.id }),
      questionList: {
        detractors: {
          enabled: nps.followup.questionList.detractors.enabled ?? false,
          ...(nps.followup.questionList.detractors.id && {
            id: nps.followup.questionList.detractors.id
          }),
          question:
            typeof nps.followup.questionList.detractors.question == 'undefined'
              ? '¿En qué fallamos?'
              : nps.followup.questionList.detractors.question
        },
        neutrals: {
          enabled: nps.followup.questionList.neutrals.enabled ?? false,
          ...(nps.followup.questionList.neutrals.id && {
            id: nps.followup.questionList.neutrals.id
          }),
          question:
            typeof nps?.followup?.questionList?.neutrals?.question == 'undefined'
              ? '¿Cómo podríamos mejorar?'
              : nps?.followup?.questionList?.neutrals?.question
        },
        promoters: {
          enabled: nps.followup.questionList.promoters.enabled ?? false,
          ...(nps.followup.questionList.promoters.id && {
            id: nps.followup.questionList.promoters.id
          }),
          question:
            typeof nps?.followup?.questionList?.promoters?.question == 'undefined'
              ? '¿Cómo podríamos mejorar?'
              : nps?.followup?.questionList?.promoters?.question
        }
      }
    },
    question: nps.question ?? { question: defaultNPSQuestion }
  }

  let csatModule = csat.enabled ? { ...csat } : { enabled: false }
  const data = {
    ...rest,
    traceability: traceability.enabled ? { ...traceability } : { enabled: false },
    welcome: welcome.enabled ? { ...welcome } : { enabled: false },
    csat: csatModule,
    nps: { ...npsAux },
    contact: contactModule,
    farewell: farewell.enabled ? { ...farewell } : { enabled: false },
    redirect: redirect.enabled ? { ...redirect } : { enabled: false },
    commentBox: commentBox.enabled && contact.enabled ? { ...commentBoxAux } : { enabled: false }
  }
  if (brand) data.brand = brand
  return axios.post(webServicesConfig.SURVEYS.ADD_SURVEY, { ...data })
}

export const listSurveys = () => axios.get(webServicesConfig.SURVEYS.LIST_SURVEYS)
export const getAllSurveys = () => axios.get(webServicesConfig.SURVEYS.GET_ALL_SURVEYS)

const getSurveys = page => axios.get(webServicesConfigV2.SURVEYS.GET_SURVEYS + '?page=' + page)

const getSurveyDetail = id => axios.get(webServicesConfig.SURVEYS.GET_SURVEY_DETAIL + id)

export const getSurveyRegenerated = id => axios.get(webServicesConfig.SURVEYS.REVALIDATE + id)

const getSurvey = id => axios.get(webServicesConfigV2.SURVEYS.GET_SURVEY + id)

export default {
  addSurvey,
  listSurveys,
  getSurveyDetail,
  getSurveyRegenerated,
  getSurvey,
  getSurveys,
  getAllSurveys
}

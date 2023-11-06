import axios from './axios/axios'
import config from '../../config/config'

const webServicesV1Config = config.webServices


export const getData = (startDate, endDate, surveyId) => {
    return axios.post(webServicesV1Config.QUADRANT_REPORT.GET_REPORT, {
      startDate,
      endDate,
      surveyId
    })
    }

export const getPinkberryData = (startDate, endDate, surveyId) => {
    return axios.post(webServicesV1Config.QUADRANT_REPORT.GET_REPORT_PINKBERRY, {
        startDate,
        endDate,
        surveyId
    })
    }

export const getTotalDataPinkberry = (startDate, endDate, surveyId) => {
    return axios.post(webServicesV1Config.QUADRANT_REPORT.GET_TOTAL_DATA_PINKBERRY, {
        startDate,
        endDate,
        surveyId
    })
    }
        

export const getTotalData = (startDate, endDate, surveyId) => {
    
    return axios.post(webServicesV1Config.QUADRANT_REPORT.GET_TOTAL_DATA, {
        startDate,
        endDate,
        surveyId
    })
}

export const getDPQ = (startDate, endDate, surveyId) => {
    return axios.post(webServicesV1Config.QUADRANT_REPORT.GET_DATA_PER_QUESTION, {
        startDate,
        endDate,
        surveyId
    })
}

export const listSurveys = () => {
    return axios.get(webServicesV1Config.SURVEYS.LIST_SURVEYS)
}

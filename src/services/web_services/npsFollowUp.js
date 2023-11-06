import axios from './axios/axios'
import config from '../../config/config'

const nps = config.webServicesV2.NPS_FOLLOWUP

export const getNpsFollowUp = (startDate, endDate, selectedGroups, selectedSurveys) => axios.post(nps.GET_NPS_FOLLOWUP_URL, { 
    startDate: startDate,
    endDate: endDate,
    selectedGroups: selectedGroups,
    selectedSurveys: selectedSurveys
 })


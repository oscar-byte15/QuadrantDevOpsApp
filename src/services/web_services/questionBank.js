import axios from './axios/axios'
import config from '../../config/config'

const webServicesConfig = config.webServices

export const addQuestionBank = (name, questionList) => {
  return axios.post(webServicesConfig.QUESTION_BANKS.ADD_BANK, {
    name: name,
    questionList: questionList
  })
}

export const listQuestionBanks = () => axios.get(webServicesConfig.QUESTION_BANKS.LIST_BANKS)

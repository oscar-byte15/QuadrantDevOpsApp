import axios from './axios/axios'
import config from '../../config/config'

const { LINKS, UNIQUE_LINK } = config.webServices

export const listLinks = (page, search_query = '') =>
  axios.get(LINKS.LIST_LINKS, {
    params: {
      page,
      search_query,
      limit: 500
    }
  })

export const createUniqueLink = data => axios.post(`${UNIQUE_LINK.CREATE}`, data)

export const listUniqueLinks = data => axios.post(UNIQUE_LINK.LIST, data)

export const uniqueLinksState = () => axios.post(UNIQUE_LINK.GET_STATE)

export const getExcelWithUniqueLinks = async data => {
  const response = await axios.post(UNIQUE_LINK.GET_EXCEL_WITH_UNIQUE_LINKS, data, {
    responseType: 'arraybuffer',
    headers: {
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    timeout: 300000
  })

  const blob = new Blob([response], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = 'BatchUniqueLinks.xlsx'
  link.click()
}

export default {
  listLinks
}

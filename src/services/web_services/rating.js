import axios from './axios/axios'
import config from 'config/config'

const RATING = config.webServices.RATING

export const saveProduct = data => axios.post(RATING.SAVE_PRODUCT, data)
export const getProducts = () => axios.get(RATING.GET_PRODUCTS)
export const getProductsReport = (startDate, endDate, surveyId, evaluationPoint) =>
  axios.post(RATING.GET_PRODUCTS_REPORT, { startDate, endDate, surveyId, evaluationPoint })
export const getProductDetailedReport = (product, page, minRating) =>
  axios.get(
    RATING.GET_PRODUCT_DETAILED_REPORT +
      `?product=${product}&page=${page}` +
      (minRating ? `&minRating=${minRating}` : '')
  )
export const getProductDistribution = product =>
  axios.get(RATING.GET_PRODUCT_DISTRIBUTION + `?product=${product}`)

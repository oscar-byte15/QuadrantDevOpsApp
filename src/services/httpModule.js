import axios from 'axios'
import HttpStatus from 'http-status-codes'
import { store } from 'redux/store'
import refreshToken from 'services/web_services/axios/refreshToken'

const endpoints = {
  prd: process.env.REACT_APP_WS_PRD_URL || 'https://qudrnt.com/api/',
  pp: process.env.REACT_APP_WS_PP_URL,
  devip: process.env.REACT_APP_WS_LOCAL_IP_URL,
  dev: process.env.REACT_APP_WS_LOCAL_URL || 'http://localhost:3001/api'
}

const httpModule = axios.create({
  baseURL: endpoints[process.env.REACT_APP_WS_ENV]
})

httpModule.interceptors.request.use(
  config => {
    let state = store.getState()
    if (
      !state.auth ||
      !state.auth.token ||
      !state.auth.token.token ||
      !state.auth.token.refreshToken
    )
      return config
    let userInfo = state.auth
    config.headers.authorization = 'Bearer ' + userInfo.token.token
    config.headers.quadrant_api_key = userInfo.quadrantClient.apiKey
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

httpModule.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    const error = {
      statusCode: null,
      message: null
    }

    if (!err.response) {
      error.statusCode = 'NETWORK_ERROR'
      error.message = 'No se pudo conectar con el servidor'
    } else {
      let response = err.response
      error.statusCode = response.status

      if (response.status === HttpStatus.UNAUTHORIZED) {
        error.message = 'Requiere autenticación'
        if (refreshToken.isTokenExpiredError(response)) {
          return refreshToken.resetTokenAndReattemptRequest(err)
        }
      }

      error.message = response.data.message || 'Oops!, Algo salió mal'
    }
    return Promise.reject(error)
  }
)

export default httpModule

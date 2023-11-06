import axios from 'axios'
import HttpStatus from 'http-status-codes'
import SERVER_ERROR_CODES from '../server_errors/errorCodes'
import { store } from '../../../redux/store'
import refreshToken from './refreshToken'

axios.interceptors.request.use(
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
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  response => {
    return response.data
  },
  err => {
    let error = {
      statusCode: null,
      error: null,
      message: null,
      serverMessage: null
    }
    if (!err.response) {
      error.statusCode = 'NETWORK_ERROR'
      error.message = 'No se pudo conectar con el servidor'
      error.serverMessage = 'Network error'
    } else {
      let response = err.response
      error.statusCode = response.status
      error.serverMessage = response.data.message

      //if (response.status === 401) return refreshToken.resetTokenAndReattemptRequest(err)
      switch (response.status) {
        case HttpStatus.BAD_REQUEST:
          switch (response.data.code) {
            case SERVER_ERROR_CODES.FIELD_EXISTS.code:
              error.message = response.data.description
              break
            case SERVER_ERROR_CODES.REPEATED_PASSWORD.code:
              error.message = 'La nueva contraseña no puede ser igual a la anterior'
              break
            default:
              error.message = response.data?.description || 'Campos incorrectos'
          }
          break
        case HttpStatus.UNAUTHORIZED:
          error.message = 'Requiere autenticación'
          if (refreshToken.isTokenExpiredError(response)) {
            return refreshToken.resetTokenAndReattemptRequest(err)
          }
          switch (response.data.code) {
            case SERVER_ERROR_CODES.WRONG_EMAIL_PASSWORD.code:
              error.message = 'Usuario o contraseña incorrectos'
              break
            case SERVER_ERROR_CODES.WRONG_PASSWORD.code:
              error.message = 'La antigua contraseña es incorrecta'
              break
            case SERVER_ERROR_CODES.UNAUTHORIZED_QUADRANT_CLIENT.code:
              error.message = 'Parece que el usuario no cuenta con una suscripción activa'
          }
          break
        default:
          error.message = response.data?.description || 'Oops!, Algo salió mal'
      }
    }
    return Promise.reject(error)
  }
)

export default axios

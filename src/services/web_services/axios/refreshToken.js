import axios from './axios'
import { updateToken } from '../../../redux/actions/auth/actionDispatcher'
import ServerErrorCodes from '../server_errors/errorCodes'
import { store } from '../../../redux/store'
import authServices from '../../web_services/auth'

let isAlreadyFetchingAccessToken = false
let subscribers = []

const isTokenExpiredError = response => {
  if (response.data.code === ServerErrorCodes.TOKEN_EXPIRED.code) return true
  return false
}

async function resetTokenAndReattemptRequest(error) {
  try {
    const response = error.response
    let state = store.getState()
    let userInfo = state.auth
    const retryOriginalRequest = new Promise(resolve => {
      addSubscriber(() => {
        resolve(axios(response.config))
      })
    })
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true
      const refreshResponse = await authServices
        .refreshToken(userInfo.email, userInfo.token.refreshToken)
        .then(res => {
          return res.data
        })
        .catch(refreshTokenError => {
          return Promise.reject(refreshTokenError)
        })
      if (!refreshResponse) {
        return Promise.reject(error)
      }
      store.dispatch(updateToken(refreshResponse))
      isAlreadyFetchingAccessToken = false
      onAccessTokenFetched()
    }
    return retryOriginalRequest
  } catch (err) {
    return Promise.reject(err)
  }
}

const onAccessTokenFetched = () => {
  subscribers.forEach(callback => callback())
  subscribers = []
}

const addSubscriber = callback => {
  subscribers.push(callback)
}

export default {
  isTokenExpiredError,
  resetTokenAndReattemptRequest
}

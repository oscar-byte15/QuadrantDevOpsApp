import { SIGN_IN, CHECK_AUTH, SIGN_OUT } from '../types'
import { selectOption } from '../menu/actionDispatcher'
import sessionManager from '../../../services/session/sessionManager'
import ADMIN_OPTIONS from '../../../components/menu/menuAdminOptions'

export const signIn = data => dispatch => {
  sessionManager.saveSession(data)
  dispatch({
    type: SIGN_IN,
    payload: data
  })
  if (data.isSuperAdmin) selectOption(ADMIN_OPTIONS.USERS.id)
}

export const updateToken = tokenObject => dispatch => {
  let userInfo = sessionManager.getSession()
  userInfo.token.token = tokenObject.token
  userInfo.token.expiresIn = tokenObject.expiresIn
  sessionManager.saveSession(userInfo)
  dispatch({
    type: SIGN_IN,
    payload: userInfo
  })
}

export const isAuth = () => dispatch => {
  var userInfo = sessionManager.getSession()
  if (!userInfo) {
    return dispatch({
      type: SIGN_OUT
    })
  }
  dispatch({
    type: CHECK_AUTH,
    payload: userInfo
  })
}

export const signOut = onSuccess => dispatch => {
  sessionManager.deleteSession()
  dispatch({
    type: SIGN_OUT
  })
  onSuccess()
}

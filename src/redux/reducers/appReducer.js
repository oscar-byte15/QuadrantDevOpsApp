import { IS_DESKTOP, IS_MOBILE, SIGN_OUT } from '../actions/types'

const initState = {
  isMobile: false
}

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case IS_MOBILE:
      return Object.assign({}, state, {
        isMobile: true
      })
    case IS_DESKTOP:
      return Object.assign({}, state, {
        isMobile: false
      })
    case SIGN_OUT:
      return Object.assign({}, initState)
    default:
      return state
  }
}

export default appReducer

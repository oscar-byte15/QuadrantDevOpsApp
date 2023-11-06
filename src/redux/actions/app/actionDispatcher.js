import { IS_DESKTOP, IS_MOBILE } from '../types'

export const isMobile = () => dispatch => {
  dispatch({
    type: IS_MOBILE,
    payload: null
  })
}

export const isDesktop = () => dispatch => {
  dispatch({
    type: IS_DESKTOP,
    payload: null
  })
}

import { CHANGE_BACKDROP_OPTIONS, TOGGLE_BACKDROP } from '../types'

export const toggle = () => dispatch =>
  dispatch({
    type: TOGGLE_BACKDROP,
    payload: null
  })

export const changeBackdropOptions =
  ({ ...args }) =>
  dispatch => {
    return dispatch({
      type: CHANGE_BACKDROP_OPTIONS,
      payload: { ...args }
    })
  }

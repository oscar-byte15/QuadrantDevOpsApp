import { SET_SNACKBAR } from '../types'

export const setSnackbar = ({ show = false, message }) => {
  const payload = { show }
  if (message) payload.message = message
  return {
    type: SET_SNACKBAR,
    payload
  }
}

export const newSnackbarMessage = (message, type) => {
  return {
    type: SET_SNACKBAR,
    payload: {
      show: true,
      message: message,
      type: type
    }
  }
}

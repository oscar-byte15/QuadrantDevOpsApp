import { SET_SNACKBAR } from '../actions/types'

const initState = {
  show: false,
  message: ''
}

const snackbarReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { payload } = action
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}

export default snackbarReducer

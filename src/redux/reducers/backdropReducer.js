import { CHANGE_BACKDROP_OPTIONS, TOGGLE_BACKDROP } from '../actions/types'
const initState = {
  open: false,
  showLoader: false
}

const backdropReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_BACKDROP:
      return {
        ...state,
        open: !state.open
      }
    case CHANGE_BACKDROP_OPTIONS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default backdropReducer

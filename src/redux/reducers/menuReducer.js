import { TOGGLE_MENU, SIGN_OUT, SELECT_OPTION_MENU } from '../actions/types'
import MENU_OPTIONS from '../../components/menu/menuSections'

const initState = {
  open: false,
  selectedOption: MENU_OPTIONS.GROUPS
}

const menuReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        open: !state.open
      })
    case SELECT_OPTION_MENU:
      return Object.assign({}, state, {
        selectedOption: action.payload
      })
    case SIGN_OUT:
      return Object.assign({}, initState)
    default:
      return state
  }
}

export default menuReducer

import { TOGGLE_MENU, SELECT_OPTION_MENU } from '../types'
import { store } from '../../store'
import MENU_OPTIONS from '../../../components/menu/menuSections'
import ADMIN_OPTIONS from '../../../components/menu/menuAdminOptions'

export const menuToggle = () => dispatch => {
  dispatch({
    type: TOGGLE_MENU,
    payload: null
  })
}

export const selectOption = selectedOptionId => dispatch => {
  if (selectedOptionId === store.getState().menu.selectedOption.id) return
  for (let value in MENU_OPTIONS) {
    let option = MENU_OPTIONS[value]
    if (option?.id === selectedOptionId) {
      return dispatch({
        type: SELECT_OPTION_MENU,
        payload: option
      })
    }
    if (option?.subMenu) {
      for (let sm in option.subMenu) {
        let smOption = option.subMenu[sm]
        if (smOption.id === selectedOptionId) {
          return dispatch({
            type: SELECT_OPTION_MENU,
            payload: smOption
          })
        }
      }
    }
  }
  for (let value in ADMIN_OPTIONS) {
    let option = ADMIN_OPTIONS[value]
    if (option.id === selectedOptionId) {
      return dispatch({
        type: SELECT_OPTION_MENU,
        payload: option
      })
    }
  }
}

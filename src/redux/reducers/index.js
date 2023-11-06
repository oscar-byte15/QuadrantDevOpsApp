import { combineReducers } from 'redux'

import authReducer from './authReducer'
import menuReducer from './menuReducer'
import appReducer from './appReducer'
import filterReducer from './filterReducer'
import backdropReducer from './backdropReducer'
import snackbarReducer from './snackbarReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  app: appReducer,
  filter: filterReducer,
  backdrop: backdropReducer,
  snackbar: snackbarReducer
})

export default rootReducer

import {
  CHANGE_FILTER_OPTIONS,
  CHANGE_MONTH,
  FILTER_CLEAN_VISIBILITY,
  FILTER_IN_HOME_SCREEN,
  FILTER_IN_VALORATION_SCREEN,
  FILTER_IN_REPORT_SCREEN,
  FILTER_IN_LINKS_LIST_SCREEN,
  FILTER_IN_INDICATORS_SCREEN,
  FILTER_IN_GROUPS_LIST_SCREEN,
  FILTER_IN_SURVEYS_LIST_SCREEN,
  FILTER_IN_TEXT_ANALYSIS_SCREEN,
  FILTER_IN_COMMENT_MANAGEMENT_SCREEN,
  FILTER_APPLY_FILTER,
  FILTER_CLEAR_FILTER,
  FILTER_IN_UNIQUE_LINKS_LIST_SCREEN,
  TOGGLE_FILTER
} from '../actions/types'
import moment from 'moment'
import 'moment/locale/es'

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
const getMonth = month => ({
  startDate: month.startOf('month').toISOString(),
  endDate: month.endOf('month').toISOString(),
  label: capitalize(month.format('MMMM YYYY'))
})
const commentBoxFilter = {
  commentBoxType: 'Any'
}

const startDate = moment().subtract(30, 'days')
const endDate = moment()

const initState = {
  open: false,
  commentBoxFilter,
  startDate: startDate,
  endDate: endDate,
  evaluationGroups: [],
  surveys: [],
  selectedGroups: ['getAll'],
  selectedSurveys: ['getAll'],
  selectedChannels: ['getAll'],
  selectedDayparts: ['getAll'],
  preSelectedChannels: [],
  preSelectedGroups: [],
  preSelectedSurveys: [],
  preSelectedDayparts: [],
  searchString: '',
  shouldShow: false,
  canFilterByDateRange: false,
  canFilterByMonth: false,
  canCompare: false,
  canFilterByGroup: false,
  canFilterByChannel: false,
  canFilterBySurvey: false,
  canFilterBySearchString: false,
  canFilterByDayparts: false,
  actualMonth: getMonth(moment()),
  prevYear: getMonth(moment().subtract(1, 'year'))
}

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case FILTER_CLEAN_VISIBILITY:
      return {
        ...state,
        shouldShow: false,
        canCompare: false,
        canFilterByGroup: false,
        canFilterBySurvey: false,
        canFilterByDateRange: false,
        canFilterByMonth: false,
        canFilterBySearchString: false,
        canFilterByDayparts: false,
        searchString: ''
      }
    case FILTER_IN_VALORATION_SCREEN:
      return {
        ...state,
        shouldShow: true,
        canFilterByChannel: false,
        canFilterByDateRange: true,
        canCompare: false,
        canFilterBySurvey: true,
        canFilterByGroup: true,
        canFilterByDayparts: false
      }
    case FILTER_IN_HOME_SCREEN:
      return {
        ...state,
        shouldShow: true,
        canFilterByChannel: true,
        canFilterByDateRange: true,
        canCompare: false,
        canFilterBySurvey: true,
        canFilterByGroup: true,
        canFilterByDayparts: true
      }
    case FILTER_IN_REPORT_SCREEN:
      return {
        ...state,
        shouldShow: false,
        canFilterByMonth: true,
        canFilterByGroup: true,
        canFilterBySurvey: true,
        canFilterByDayparts: false
      }
    case FILTER_IN_COMMENT_MANAGEMENT_SCREEN:
      return {
        ...state,
        shouldShow: true,
        canFilterByDateRange: true,
        canFilterByGroup: true,
        canFilterBySurvey: true,
        canFilterByDayparts: false
      }
    case FILTER_IN_TEXT_ANALYSIS_SCREEN:
      return {
        ...state,
        shouldShow: true,
        canFilterByDateRange: true,
        canFilterByGroup: true,
        canFilterBySurvey: true,
        canFilterByDayparts: false
      }
    case FILTER_IN_INDICATORS_SCREEN:
      return {
        ...state,
        shouldShow: true,
        canFilterByChannel: true,
        canFilterByDateRange: true,
        canFilterByGroup: true,
        canFilterBySurvey: true,
        canFilterByDayparts: false
      }
    case FILTER_IN_GROUPS_LIST_SCREEN:
      return {
        ...state,
        canFilterBySearchString: true
      }
    case FILTER_IN_SURVEYS_LIST_SCREEN:
      return {
        ...state,
        canFilterBySearchString: true
      }
    case FILTER_IN_LINKS_LIST_SCREEN: {
      return {
        ...state,
        canFilterBySearchString: true
      }
    }
    case CHANGE_FILTER_OPTIONS:
    case FILTER_APPLY_FILTER:
      return {
        ...state,
        ...action.payload
      }
    case CHANGE_MONTH:
      return {
        ...state,
        actualMonth: getMonth(moment(action.payload))
      }
    case FILTER_CLEAR_FILTER:
      return {
        ...initState
      }
    case FILTER_IN_UNIQUE_LINKS_LIST_SCREEN:
      return {
        ...state,
        shouldShow: true,
        canFilterByDateRange: true,
        canFilterByGroup: true,
        canFilterBySurvey: true,
        canFilterByDayparts: false
      }
    case TOGGLE_FILTER:
      return Object.assign({}, state, {
        open: !state.open
      })
    default:
      return state
  }
}

export default filterReducer

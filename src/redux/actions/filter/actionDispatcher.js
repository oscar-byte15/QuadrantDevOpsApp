import {
  FILTER_CLEAR_FILTER,
  CHANGE_FILTER_OPTIONS,
  CHANGE_MONTH,
  FILTER_CLEAN_VISIBILITY,
  FILTER_IN_HOME_SCREEN,
  FILTER_IN_VALORATION_SCREEN,
  FILTER_IN_REPORT_SCREEN,
  FILTER_IN_INDICATORS_SCREEN,
  FILTER_IN_LINKS_LIST_SCREEN,
  FILTER_IN_GROUPS_LIST_SCREEN,
  FILTER_IN_SURVEYS_LIST_SCREEN,
  FILTER_IN_TEXT_ANALYSIS_SCREEN,
  FILTER_IN_COMMENT_MANAGEMENT_SCREEN,
  FILTER_APPLY_FILTER,
  FILTER_IN_UNIQUE_LINKS_LIST_SCREEN,
  TOGGLE_FILTER
} from '../types'
import { store } from '../../store'

export const filterToggle = () => dispatch => {
  dispatch({
    type: TOGGLE_FILTER,
    payload: null
  })
}

export const cleanFilterVisibility = () => ({ type: FILTER_CLEAN_VISIBILITY, payload: null })

export const filterInHome = () => ({ type: FILTER_IN_HOME_SCREEN, payload: null })

export const filterInValoration = () => ({ type: FILTER_IN_VALORATION_SCREEN, payload: null })

export const filterInReport = () => ({ type: FILTER_IN_REPORT_SCREEN, payload: null })

export const filterInIndicators = () => ({ type: FILTER_IN_INDICATORS_SCREEN, payload: null })

export const filterInLinksList = () => ({ type: FILTER_IN_LINKS_LIST_SCREEN, payload: null })

export const filterInGroupsList = () => ({
  type: FILTER_IN_GROUPS_LIST_SCREEN,
  payload: null
})

export const filterInSurveysList = () => ({
  type: FILTER_IN_SURVEYS_LIST_SCREEN,
  payload: null
})

export const filterInTextAnalysis = () => ({
  type: FILTER_IN_TEXT_ANALYSIS_SCREEN,
  payload: null
})

export const filterInCommentManagement = () => ({
  type: FILTER_IN_COMMENT_MANAGEMENT_SCREEN,
  payload: null
})

export const filterInUniqueLinksList = () => {
  return {
    type: FILTER_IN_UNIQUE_LINKS_LIST_SCREEN,
    payload: null
  }
}

export const setMonth = payload => ({ type: CHANGE_MONTH, payload })

export const changeFilterOptions = payload => {
  //const payload = {}
  return { type: CHANGE_FILTER_OPTIONS, payload }
}

export const applyFilter = () => {
  const {
    preSelectedGroups,
    preSelectedSurveys,
    preSelectedChannels,
    preSelectedDayparts,
    allGroupsSelected,
    allSurveysSelected,
    allChannelsSelected,
    allDaypartsSelected
  } = store.getState().filter
  const payload = {
    selectedGroups: allGroupsSelected ? ['getAll'] : preSelectedGroups.map(group => group.id),
    selectedSurveys: allSurveysSelected ? ['getAll'] : preSelectedSurveys.map(survey => survey.id),
    selectedChannels: allChannelsSelected
      ? ['getAll']
      : preSelectedChannels.map(group => group.name),
    selectedDayparts: allDaypartsSelected
      ? ['getAll']
      : preSelectedDayparts.map(daypart => {
          return { name: daypart.name, range: [daypart.range[0], daypart.range[1]] }
        })
  }

  return { type: FILTER_APPLY_FILTER, payload }
}

export const clearFilter = () => ({ type: FILTER_CLEAR_FILTER, payload: null })

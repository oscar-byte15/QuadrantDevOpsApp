import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelect from 'components/common/multiselect'
import { Box, ListItem } from '@mui/material'

export default function SurveyMultiselector(props) {
  const setSelectedSurveys = props.setSelectedSurveys
  const selectedSurveys = props.selectedSurveys
  const surveys = props.surveys

  const canFilterBySurvey = useSelector(state => state.filter.canFilterBySurvey)

  const handleChange = selected => {
    setSelectedSurveys(selected)
  }

  return canFilterBySurvey ? (
    <ListItem>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <MultiSelect
          label="Encuestas"
          size="small"
          list={surveys}
          selected={selectedSurveys || []}
          handleChange={handleChange}
          selectAll
          {...props}
        />
      </Box>
    </ListItem>
  ) : (
    ''
  )
}

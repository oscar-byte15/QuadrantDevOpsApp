import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelect from 'components/common/multiselect'
import { changeFilterOptions } from 'redux/actions/filter/actionDispatcher'
import { Box, ListItem } from '@mui/material'
import httpModule from 'services/httpModule'
import moment from 'moment'

export default function GroupsMultiselector(props) {
  const setSelectedPoints = props.setSelectedPoints
  const selectedPoints = props.selectedPoints
  const points = props.points
  const dispatch = useDispatch()
  const preSelected = useSelector(state => state.filter.preSelectedGroups)
  const canFilterByGroup = useSelector(state => state.filter.canFilterByGroup)

  const handleChange = selected => {
    setSelectedPoints(selected)
  }

  return canFilterByGroup ? (
    <ListItem>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <MultiSelect
          label="Puntos"
          list={points}
          size="small"
          selected={selectedPoints || []}
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

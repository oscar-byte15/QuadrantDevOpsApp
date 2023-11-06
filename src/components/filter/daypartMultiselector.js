import React from 'react'
import { useSelector } from 'react-redux'
import MultiSelect from 'components/common/multiselect'
import { Box, ListItem } from '@mui/material'

export default function DaypartMultiselector(props) {
  const canFilterByDayparts = useSelector(state => state.filter.canFilterByDayparts)
  const setselectedDayparts = props.setselectedDayparts
  const selectedDayparts = props.selectedDayparts
  const dayparts = props.dayparts

  const handleChange = selected => {
    setselectedDayparts(selected)
  }

  return dayparts.length > 0 && canFilterByDayparts ? (
    <ListItem>
      <Box
        sx={{
          // display: canFilterByDayparts ? 'block' : 'none',
          width: '100%'
        }}
      >
        <MultiSelect
          label="Segmentaciones horarias"
          size="small"
          list={dayparts}
          selected={selectedDayparts || []}
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

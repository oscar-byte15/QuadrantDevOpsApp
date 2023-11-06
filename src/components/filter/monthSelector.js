import React, { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setMonth } from 'redux/actions/filter/actionDispatcher'
import moment from 'moment'

const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const getMonths = createdAt => {
  let months = []
  let date = moment(createdAt).startOf('month')
  let today = moment()

  while (today.diff(date) > 0) {
    months.unshift({ value: date.toISOString(), label: capitalize(date.format('MMMM YYYY')) })
    date.add(1, 'month')
  }

  return months
}

const MonthSelector = () => {
  const dispatch = useDispatch()
  const createdAt = useSelector(store => store.auth.quadrantClient.createdAt)
  const month = useSelector(store => store.filter.actualMonth.startDate)
  const [months, setMonths] = useState([])

  useEffect(() => {
    setMonths(getMonths(createdAt))
    //eslint-disable-next-line
  }, [])

  const handleChange = e => dispatch(setMonth(e.target.value))

  return (
    <Grid item xs={12} sm={4} md={12}>
      <FormControl fullWidth style={{ minWidth: '150px' }}>
        <InputLabel>Mes</InputLabel>
        {months.length !== 0 && (
          <Select
            value={month || months[0]?.value}
            label="Mes"
            variant="standard"
            input={<OutlinedInput label="Mes" fullWidth />}
            onChange={handleChange}
          >
            {months.map(month => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </Grid>
  )
}
export default MonthSelector

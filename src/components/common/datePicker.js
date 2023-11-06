import React from 'react'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { es } from 'moment/locale/es'

import TextField from '@mui/material/TextField'

export default function BasicDatePicker({ value, onChange, isEnabled, label, ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={es}>
      <DatePicker label={label} value={value} onChange={onChange} disabled={isEnabled} {...props}>
        {({ inputProps }) => <TextField {...inputProps} mask="__/__/____" />}
      </DatePicker>
    </LocalizationProvider>
  )
}

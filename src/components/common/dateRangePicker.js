import React, { useState } from 'react'
import { ListItem } from '@mui/material'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, SingleInputDateRangeField } from '@mui/x-date-pickers-pro'
import { es } from 'moment/locale/es'

import { ArrowDropDown, CalendarToday } from '@mui/icons-material'

export default function BasicDateRangePicker({ value, onChange, ...props }) {
  const shortcutsList = props.shortcutsList ? props.shortcutsList : ''

  const [open, setOpen] = useState(false)

  return (
    <ListItem>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        adapterLocale={es}
        dateFormats={{ monthAndYear: 'MMMM YYYY' }}
      >
        <DateRangePicker
          calendars={2}
          toolbarTitle="Selecciona un rango de fechas"
          toolbarFormat="DD MMM YYYY"
          inputFormat="DD/MM/YY"
          mask="__/__/__"
          disableFuture
          disableAutoMonthSwitching
          open={open}
          PopperProps={{
            placement: 'bottom-end',
            popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, 0] } }] }
          }}
          onClose={() => {
            setOpen(false)
          }}
          onOpen={() => {
            setOpen(true)
          }}
          value={value}
          onChange={onChange}
          slots={{
            field: SingleInputDateRangeField
          }}
          slotProps={{
            textField: {
              label: 'Fechas',
              size: 'small',
              InputProps: {
                endAdornment: <ArrowDropDown sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />,
                startAdornment: (
                  <CalendarToday sx={{ color: 'rgba(0, 0, 0, 0.54)', marginRight: '4px' }} />
                )
              },
              sx: { width: '250px', minWidth: '250px' }
            },
            shortcuts: {
              items: shortcutsList,
              sx: { display: { xs: 'none', sm: 'block' } },
              changeImportance: 'accept'
            },
            popper: {
              placement: 'bottom-end',
              popperOptions: { modifiers: [{ name: 'offset', options: { offset: [0, 0] } }] }
            }
          }}
        />
      </LocalizationProvider>
    </ListItem>
  )
}

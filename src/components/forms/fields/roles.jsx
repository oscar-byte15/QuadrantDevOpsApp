import React, { useState } from 'react'
import { FormControlLabel, Checkbox, Typography, FormControl, Grid } from '@mui/material'
import userRoles from '../../../constants/userRoles'

RolesField.defaultProps = {
  rolesSelected: []
}

//TODO esta parte debe optimizarse (rerenders)
const getInitValues = (defaultRoles, roles) => {
  let initValues = []
  let rolesList = roles || Object.values(userRoles)
  defaultRoles.forEach(role => {
    if (rolesList.includes(role)) initValues.push(role)
  })
  return initValues
}

export default function RolesField(props) {
  const { label, values, onChange, onError, errorText, className, roles } = props
  const [state, setState] = useState({ checkedRoles: getInitValues(values, roles) })

  const handleChange = event => {
    let tempChecked = state.checkedRoles

    if (event.target.checked) tempChecked.push(event.target.name)
    else {
      tempChecked.splice(tempChecked.indexOf(event.target.name), 1)
    }
    setState({ checkedRoles: tempChecked })
    onChange(event, tempChecked)
  }

  return (
    <FormControl className={className} fullWidth={true}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <Grid container spacing={1} justify="center" sx={{ padding: '8px' }}>
        {(roles || Object.keys(userRoles)).map(role => {
          return (
            <Grid item key={role}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedRoles.includes(role)}
                    onChange={handleChange}
                    name={role}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label={role}
                sx={{
                  backgroundColor: '#f7f7f7',
                  borderRadius: '6px',
                  paddingRight: '10px',
                  '&:hover': {
                    backgroundColor: '#f1f1f1'
                  }
                }}
              />
            </Grid>
          )
        })}
      </Grid>
      {onError && <p className="input-error">{errorText}</p>}
    </FormControl>
  )
}

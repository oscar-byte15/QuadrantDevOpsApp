import React, { useState } from 'react'
import {
  FormControlLabel,
  Checkbox,
  Button,
  FormControl,
  Grid,
  Typography,
  Link
} from '@mui/material'
import PropTypes from 'prop-types'

const getInitValues = (options, values) => {
  let initValues = []
  Object.values(options).forEach(opt => {
    if (values.includes(opt.id)) initValues.push(opt.id)
  })
  return initValues
}

export default function EvaluationGroupMulticheckboxField(props) {
  const { label, options, values, onChange, onError, errorText, className } = props
  const [state, setState] = useState({ checkedValues: getInitValues(options, values) })

  const handleChange = event => {
    let tempChecked = state.checkedValues

    if (event.target.checked) tempChecked.push(event.target.name)
    else {
      tempChecked.splice(tempChecked.indexOf(event.target.name), 1)
    }
    setState({ checkedValues: tempChecked })
    onChange(event, tempChecked)
  }

  return (
    <FormControl className={className} fullWidth={true}>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {label}
        {/* <Link sx={{ marginLeft: '0.5rem' }}>seleccionar todo</Link> */}
      </Typography>
      <Grid container spacing={1} justify="center" sx={{ padding: '8px' }}>
        {options.map(opt => {
          return (
            <Grid item key={opt.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedValues.includes(opt.id)}
                    onChange={handleChange}
                    name={opt.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  />
                }
                label={opt.name}
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

EvaluationGroupMulticheckboxField.propTypes = {
  options: PropTypes.array.isRequired
}

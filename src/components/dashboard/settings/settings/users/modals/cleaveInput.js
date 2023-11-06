import React, { useEffect, useState } from 'react'
import { useController } from 'react-hook-form'
import Cleave from 'cleave.js/react'
import { Box, TextField } from '@mui/material'

const CleaveInput = React.forwardRef((props, ref) => {
  const { inputProps, ...other } = props
  return <Cleave {...other} htmlRef={ref} />
})

const ControlledCleaveTextField = props => {
  const { name, options, ...rest } = props
  const [valor, setValor] = useState('')
  useEffect(() => {
    if (props.default) {
      setValor(props.default)
    }
  }, [])

  const {
    field: { ref, ...InputProps },
    fieldState: { error }
  } = useController({ name })

  return (
    <TextField
      id={name.replaceAll(' ', '')}
      autoComplete="off"
      inputRef={ref}
      variant="outlined"
      margin="normal"
      fullWidth={true}
      // {...InputProps}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: CleaveInput,
        inputProps: {
          options,
          'data-testid': props.name
        },
        endAdornment: (
          <Box
            sx={{
              backgroundColor: props.default,
              width: '35px',
              aspectRatio: '1 / 1',
              borderRadius: '6px',
              cursor: 'auto',
              boxShadow: '0px 0px 0px 1px #efefef'
            }}
          />
        )
      }}
      value={valor}
      {...rest}
      helperText={Boolean(error) && (error.message || error)}
      error={Boolean(error)}
    />
  )
}

export default ControlledCleaveTextField

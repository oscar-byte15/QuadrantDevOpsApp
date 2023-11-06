import React from 'react'
import {
  Checkbox,
  Select,
  ListItemText,
  FormControl,
  MenuItem,
  OutlinedInput,
  InputLabel
} from '@mui/material'
import moment from 'moment'

const RenderValue = selected => {
  return selected.length === 0
    ? '0 seleccionados'
    : selected.length === 1
    ? '1 seleccionado'
    : selected.length + ' seleccionados'
}

const Multiselect = (props, ref) => {
  const { list, selected, label, handleChange, selectAll, size } = props

  const checked = key => {
    let index = selected.findIndex(e => e.id === key)
    return index > -1
  }

  const _handleChange = event => {
    const value = event.target.value
    if (event.target.value.includes('getAll')) {
      handleChange(selected.length === list.length ? [] : list)
      return
    }
    handleChange(value)
  }

  React.useEffect(() => {
    if (selectAll) handleChange(list)
    //eslint-disable-next-line
  }, [])

  return (
    <FormControl fullWidth ref={ref} size={size}>
      <InputLabel shrink>{label}</InputLabel>
      <Select
        value={selected}
        multiple
        notched
        displayEmpty
        onChange={_handleChange}
        input={<OutlinedInput label={label} fullWidth />}
        renderValue={RenderValue}
      >
        {selectAll && (
          <MenuItem value="getAll">
            <Checkbox
              checked={list.length > 0 && selected.length === list.length}
              indeterminate={selected.length > 0 && selected.length < list.length}
            />
            <ListItemText>Seleccionar todo</ListItemText>
          </MenuItem>
        )}
        {list.map(element => (
          <MenuItem key={element.id} value={element} dense>
            <Checkbox checked={checked(element.id)} />
            <ListItemText>{element.name}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default React.forwardRef(Multiselect)

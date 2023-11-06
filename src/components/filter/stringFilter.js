import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import debounce from 'lodash/debounce'

import { changeFilterOptions } from 'redux/actions/filter/actionDispatcher'

import { Close, Search } from '@mui/icons-material'

export default function StringFilter({ searchString, setSearchString }) {
  const dispatch = useDispatch()

  const debouncedSearch = useCallback(
    debounce(value => {
      dispatch(changeFilterOptions({ searchString: value }))
    }, 500),
    [dispatch]
  )

  const handleSearch = useCallback(
    event => {
      const value = event.target.value
      setSearchString(value)
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  const handleClear = () => {
    setSearchString('')
    dispatch(changeFilterOptions({ searchString: '' }))
  }

  return (
    <>
      <TextField
        autoFocus
        fullWidth
        autoComplete="off"
        placeholder="Búsqueda por texto"
        value={searchString}
        onChange={handleSearch}
        sx={{ '& .MuiInputBase-root': { padding: '0 20px!important' } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search aria-label="search icon" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchString != '' ? (
                <IconButton aria-label="clear text" edge="end" onClick={handleClear}>
                  <Close />
                </IconButton>
              ) : null}
            </InputAdornment>
          )
        }}
      />
    </>
  )
}

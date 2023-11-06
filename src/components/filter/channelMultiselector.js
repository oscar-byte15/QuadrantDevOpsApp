import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelect from 'components/common/multiselect'
import { changeFilterOptions } from 'redux/actions/filter/actionDispatcher'
import { Box, ListItem } from '@mui/material'
import httpModule from 'services/httpModule'

export default function ChannelMultiselector(props) {
  const dispatch = useDispatch()
  const setSelectedChannels = props.setSelectedChannels
  const selectedChannels = props.selectedChannels
  const channels = props.channels

  // const preSelected = useSelector(state => state.filter.preSelectedChannels)
  const canFilterByChannel = useSelector(state => state.filter.canFilterByChannel)

  const handleChange = selected => {
    setSelectedChannels(selected)
    // dispatch(
    //   changeFilterOptions({
    //     preSelectedChannels: selected,
    //     allChannelsSelected: selected.length === channels.length
    //   })
    // )
  }

  return (
    <ListItem>
      <Box
        sx={{
          display: !canFilterByChannel && 'none',
          width: '200px'
        }}
      >
        <MultiSelect
          label="Canales"
          list={channels}
          size="small"
          selected={selectedChannels || []}
          handleChange={handleChange}
          selectAll
          {...props}
        />
      </Box>
    </ListItem>
  )
}

import React, { Component } from 'react'
import { Box, Grid, Typography } from '@mui/material'

class Thumbnail extends Component {
  state = {
    loading: false,
    thumb: undefined
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader()

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result })
      }

      reader.readAsDataURL(nextProps.file)
    })
  }

  render() {
    const { file } = this.props
    const { loading, thumb } = this.state
    if (!file) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 0px 1px 1px #ddd',
            borderRadius: '6px',
            overflow: 'hidden',
            height: '100px',
            aspectRatio: '1 / 1'
          }}
        >
          <Typography variant="caption">{loading ? 'cargando...' : ''}</Typography>
        </Box>
      )
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 0px 1px 1px #ddd',
          borderRadius: '6px',
          overflow: 'hidden',
          height: '100px',
          aspectRatio: '1 / 1'
        }}
      >
        <img
          src={thumb}
          alt={file.name}
          style={{
            height: '100%',
            width: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain'
          }}
        />
      </Box>
    )
  }
}

export default Thumbnail

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  Stack,
  Switch,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { listLanguages } from 'services/web_services/languages'
import TextField from '../common/controlledTextField'
import Dropdown from '../common/controlledDropdown'
import { useFormContext } from 'react-hook-form'
import { getBrandsByQuadrantClientId, deleteBrand } from 'services/web_services/brand'
import Thumbnail from 'components/thumbnail'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '../common/controlledCheckbox'
import Input from '../common/controlledTextField'

import Select from '@mui/material/Select'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

const SuveySettings = props => {
  const { setValue } = useFormContext()
  const timer = props.timer
  const brand = props.brand
  const setSelectedBrandId = props.setSelectedBrandId

  const [languages, setLanguages] = useState([])
  useEffect(() => {
    listLanguages().then(res => setLanguages(res.data))
  }, [])

  const [logo, setLogo] = useState(undefined)
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState('')

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('session'))
    const userId = user.quadrantClient.id
    getBrandsByQuadrantClientId(userId)
      .then(res => {
        res.data.map(brand => {
          let brandLogo = { image: brand.logo, blurHash: brand.blur_hash }
          brand.colors = { primary: brand.primaryColor, secondary: brand.secondaryColor }
          delete brand.primaryColor
          delete brand.secondaryColor
          brand.logo = brandLogo
        })
        return res
      })
      .then(res => {
        setBrands(res.data)
      })
    setSelectedBrandId(brand)
  }, [])

  useEffect(() => {
    let defaultBrand = ''
    brands && brand ? (defaultBrand = brands.find(item => item.id === brand)) : ''

    defaultBrand != undefined && defaultBrand != '' ? setSelectedBrand(defaultBrand) : ''
  }, [brands])

  const handleBrandChange = event => {
    const selected = brands.find(brand => brand.id === event.target.value)
    setSelectedBrand(selected)
    setSelectedBrandId(selected.id)
  }

  const colorboxStyles = {
    minWidth: '72px',
    minHeight: '35px',
    // aspectRatio: '1 / 1',
    padding: '0.5rem',
    boxShadow: '0px 0px 1px 1px #ddd',
    borderRadius: '6px',
    overflow: 'hidden'
  }

  // const { setValue } = useFormContext()
  const [timerEnabled, setTimerEnabled] = useState(Boolean(timer))

  useEffect(() => {
    if (!timerEnabled) setValue('timer', 0)
    //eslint-disable-next-line
  }, [timerEnabled])

  const handleTimerSwitchChange = () => setTimerEnabled(!timerEnabled)

  return (
    <Card variant="outlined" style={{ height: '100%' }}>
      <CardHeader title="Ajustes de encuesta" />
      <CardContent style={{ paddingTop: '0' }}>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: '500', marginBottom: '1rem' }}>Encuesta</Typography>

          <Stack direction={'row'} spacing={1}>
            <TextField
              name="name"
              type="text"
              size="small"
              margin="none"
              autoComplete="off"
              label="Nombre de Encuesta"
              placeholder="Ej. Experiencia en tienda"
            />
            {languages.length !== 0 ? (
              <Dropdown
                name="language"
                size="small"
                label="Seleccionar Idioma"
                disabled={Boolean(languages.length == 0)}
                options={languages.length !== 0 ? languages : []}
              />
            ) : (
              <Select />
            )}
          </Stack>
          <Divider sx={{ margin: '2rem 0 1rem 0!important' }} />
          <Typography sx={{ fontWeight: '500', marginBottom: '1rem' }}>Identidad</Typography>
          <Stack direction="row" spacing={1} justifyContent={'space-between'}>
            <Stack spacing={1} sx={{ width: '100%' }} alignItems={'center'}>
              <Typography sx={{ width: '100%' }}>Logotipo:</Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0px 0px 1px 1px #ddd',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  height: '100px',
                  aspectRatio: '1 / 1',
                  position: 'relative'
                }}
              >
                {selectedBrand != '' || props.logoUrl ? (
                  <img
                    src={selectedBrand != '' ? selectedBrand.logo.image : props.logoUrl}
                    style={{
                      height: '100%',
                      width: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <>
                    <Thumbnail file={logo} />

                    <label
                      htmlFor="logo"
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        display: 'block',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <input
                        accept="image/*"
                        id="logo"
                        name="logo"
                        multiple
                        onChange={event => {
                          setLogo(event.target.files[0])
                          setValue('logo', event.target.files[0])
                        }}
                        type="file"
                      />
                      {!logo && <span></span>}
                    </label>
                  </>
                )}
              </Box>
            </Stack>
            <Stack spacing={1} sx={{ width: '100%' }} alignItems={'center'}>
              <Typography sx={{ width: '100%' }}>Nombre:</Typography>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography sx={{ fontWeight: '500' }}>
                  {selectedBrand != '' ? selectedBrand.name : 'Seleccionar una marca'}
                </Typography>
              </Box>
            </Stack>
            <Stack spacing={1} sx={{ width: '100%' }} alignItems={'center'}>
              <Typography sx={{ width: '100%' }}>Colores:</Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ height: '100%' }}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Box
                  sx={{
                    backgroundColor: selectedBrand != '' ? selectedBrand.colors.primary : '',
                    ...colorboxStyles
                  }}
                >
                  <Typography
                    sx={{ color: '#ffffff', mixBlendMode: 'difference', fontWeight: '300' }}
                    textAlign={'center'}
                  >
                    {selectedBrand != '' ? selectedBrand.colors.primary : 'N/A'}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: selectedBrand != '' ? selectedBrand.colors.secondary : '',
                    ...colorboxStyles
                  }}
                >
                  <Typography
                    sx={{ color: '#ffffff', mixBlendMode: 'difference', fontWeight: '300' }}
                    textAlign={'center'}
                  >
                    {selectedBrand != '' ? selectedBrand.colors.secondary : 'N/A'}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                paddingTop: '21px'
              }}
            >
              {/* {selectedBrand && ( */}
              <Select
                value={selectedBrand.id || ''}
                margin="none"
                size="small"
                onChange={handleBrandChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Seleccionar marca
                </MenuItem>
                {brands.map(brand => {
                  return (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  )
                })}
              </Select>
              {/* )} */}
            </Box>
          </Stack>
          <Divider sx={{ margin: '2rem 0 1rem 0!important' }} />
          <Typography sx={{ fontWeight: '500', marginBottom: '1rem' }}>
            Opciones avanzadas
          </Typography>
          <Stack direction="row" spacing={2} justifyContent={'flex-start'}>
            <Checkbox name="options.bigFont" label="Mostrar fuentes grandes" />
            <Checkbox
              name="options.incompleteAnswer.enabled"
              label="Capturar respuestas incompletas"
            />
            {/* <Checkbox
              name="options.alternativeProgressBar"
              label="Mostrar indicador de progreso alternativo"
            /> */}
            <FormControlLabel
              sx={{ width: 'auto' }}
              control={
                <Tippy
                  content="Activar timer en tablet"
                  placement="bottom"
                  animation="shift-toward-subtle"
                >
                  <Switch
                    checked={timerEnabled}
                    color="secondary"
                    size="small"
                    onChange={handleTimerSwitchChange}
                  />
                </Tippy>
              }
              label={
                <Box style={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography display="inline" sx={{ marginRight: '8px', userSelect: 'none' }}>
                    Timer para tablet
                  </Typography>
                  <Input
                    disabled={!timerEnabled}
                    name="options.timer"
                    type="Number"
                    variant="standard"
                    margin="none"
                    inputProps={{ max: '30', min: '0' }}
                    style={{ width: '70px' }}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">seg.</InputAdornment>
                    }}
                  />
                </Box>
              }
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
export default SuveySettings

import React from 'react'
import { useState, useEffect } from 'react'

import {
  Card,
  Button,
  CardHeader,
  FormHelperText,
  Grid,
  CardContent,
  Box,
  Typography,
  Stack
} from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { getBrandsByQuadrantClientId, deleteBrand } from 'services/web_services/brand'
import Thumbnail from 'components/thumbnail'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
const LogoSection = props => {
  const [logo, setLogo] = React.useState(undefined)
  const [brands, setBrands] = useState([])
  const { setValue } = useFormContext()
  const [brandNames, setBrandNames] = useState([])
  const [selectedBrandName, setSelectedBrandName] = useState('')
  const [brandColors, setBrandColors] = useState({ primary: '', secondary: '' })
  const [brandLogo, setBrandLogo] = useState('')
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
        const names = res.data.map(brand => brand.name) // Obtener solo los nombres de las marcas
        setBrandNames(names)
      })
  }, [brandColors])

  const handleBrandNameChange = event => {
    const selectedBrand = brands.find(brand => brand.name === event.target.value)

    if (selectedBrand) {
      const { primary, secondary } = selectedBrand.colors
      setBrandLogo(selectedBrand.logo.image)
      setBrandColors({ primary: primary, secondary: secondary })
    } else {
      setBrandColors({ primary: '', secondary: '' })
    }
    setSelectedBrandName(event.target.value)
  }
  const styles = {
    width: '30px',
    aspectRatio: '1 / 1',
    boxShadow: '0px 0px 1px 1px #ddd',
    borderRadius: '6px',
    overflow: 'hidden'
  }

  return (
    <Card variant="outlined">
      <CardHeader title="Ajustes de Marca" />
      <CardContent>
        <Stack direction="row">
          {props.logoUrl ? (
            <Grid container justifyContent="center">
              <Box
                height={200}
                width={200}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center'
                }}
              >
                <img src={props.logoUrl} alt="company-logo" className="img-thumbnail" />
              </Box>
            </Grid>
          ) : (
            <label htmlFor="logo">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0px 0px 1px 1px #ddd',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  height: '70px',
                  aspectRatio: '1 / 1'
                }}
              >
                <img
                  src={brandLogo}
                  style={{
                    height: '100%',
                    width: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignContent="center"
                spacing={2}
              >
                <Grid item sx={{ marginTop: '16px' }}>
                  <Typography>{selectedBrandName}</Typography>
                </Grid>
                <Grid item>
                  <Stack direction={'row'} spacing={10}>
                    <Tippy
                      // key={tag.id + tag.type}
                      allowHTML={true}
                      content={`Color primario ${brandColors.primary ? brandColors.primary : ''}`}
                      placement="top"
                      animation="shift-toward-subtle"
                    >
                      <Box
                        sx={{
                          backgroundColor: brandColors.primary ? brandColors.primary : '',
                          ...styles
                        }}
                      />
                    </Tippy>
                    <Tippy
                      // key={tag.id + tag.type}
                      allowHTML={true}
                      content={`Color secundario ${
                        brandColors.secondary ? brandColors.secondary : ''
                      }`}
                      placement="top"
                      animation="shift-toward-subtle"
                    >
                      <Box
                        sx={{
                          backgroundColor: brandColors.secondary ? brandColors.secondary : '',
                          ...styles
                        }}
                      />
                    </Tippy>
                  </Stack>
                </Grid>
                <Grid item>
                  <Select value={selectedBrandName} onChange={handleBrandNameChange} displayEmpty>
                    <MenuItem value="" disabled>
                      <Typography>
                        <em>Seleccionar marca</em>
                      </Typography>
                    </MenuItem>
                    {brandNames.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item>
                  <FormHelperText style={{ textAlign: 'center' }}>
                    Recomendado 500x500px
                  </FormHelperText>
                </Grid>
              </Grid>
            </label>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LogoSection
//<FormHelperText error={error} style={{textAlign: 'center'}}> {form.errors[field.name]} </FormHelperText>

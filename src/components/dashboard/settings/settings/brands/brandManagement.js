import React, { useState, useEffect } from 'react'

import {
  Grid,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stack,
  Typography
} from '@mui/material'
import { MoreVert } from '@mui/icons-material'
import { getBrandsByQuadrantClientId, deleteBrand } from 'services/web_services/brand'
import CreateBrand from '../users/modals/createBrand'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import DataGrid from 'components/common/dataGrid'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const transformBrand = brand => {
  let brandLogo = { url: brand.logo, blurHash: brand.blur_hash }
  const colors = { primary: brand.primaryColor, secondary: brand.secondaryColor }
  let newBrand = {
    ...brand,
    logo: brandLogo,
    colors
  }
  delete newBrand.primaryColor
  delete newBrand.secondaryColor
  delete newBrand.blur_hash
  return newBrand
}

export default function BrandManagement() {
  const [isEditing, setIsEditing] = useState(false)
  const [brands, setBrands] = useState([])

  const [openBranForm, setOpenBranForm] = useState(false)
  const [editedBrand, setEditedBrand] = useState()

  const [anchorElm, setAnchorElm] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [snackbarState, setSnackbarState] = useState(false)
  const [snackbar, setSnackbar] = useState({ variant: '' })

  //handle close of items of menu
  const handleClose = () => {
    setAnchorElm(null)
    setOpen(false)
  }
  //hanlde click of menu items
  const handleClick = (brand, e) => {
    setAnchorElm(e.currentTarget)
    setEditedBrand(brand)
    setIsEditing(true)
    setOpen(true)
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('session'))
    const userId = user.quadrantClient.id
    setLoading(true)
    getBrandsByQuadrantClientId(userId)
      .then(res => {
        const updatedData = res.data.map(brand => {
          const newBrand = { ...brand }
          newBrand.logo = { url: brand.logo, blurHash: brand.blur_hash }
          newBrand.colors = { primary: brand.primaryColor, secondary: brand.secondaryColor }
          delete newBrand.primaryColor
          delete newBrand.secondaryColor
          delete newBrand.blur_hash
          return newBrand
        })

        return updatedData
      })
      .then(updatedData => {
        setBrands(updatedData)
        setLoading(false)
      })
  }, [])

  const handleCloseBrandForm = () => {
    setOpen(false)
    setOpenBranForm(false)
    setEditedBrand(null)
  }

  const handleClickOpenBrandForm = () => {
    setOpen(false)
    setOpenBranForm(true)
  }
  const deleteBrandById = () => {
    deleteBrand(editedBrand.id)
    const brandsAux = brands.filter(brand => brand.id !== editedBrand.id)
    setBrands(brandsAux)
    handleOpenSnackbar('delete')
    setOpen(false)
  }

  const handleCreateDialog = () => {
    setEditedBrand(null)
    setIsEditing(false)
    handleClickOpenBrandForm()
  }

  const handleEditDialog = () => {
    setEditedBrand(editedBrand)
    setIsEditing(true)
    handleClickOpenBrandForm()
  }

  const onNewBrandAdded = newBrand => {
    let brandsAux = [...brands]
    let transformedNewBrand = transformBrand(newBrand)
    let index = brandsAux.findIndex(brand => brand.id === transformedNewBrand.id)
    if (index >= 0) brandsAux[index] = transformedNewBrand
    else brandsAux.push(transformedNewBrand)
    setBrands(brandsAux)
    handleCloseBrandForm()
    handleClose()
  }

  const handleOpenSnackbar = variant => {
    setSnackbarState(true)
    setSnackbar({ variant: variant })
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarState(false)
  }

  const columns = [
    { field: 'id' },
    {
      field: 'actions',
      type: 'actions',
      resizable: false,
      sortable: false,
      width: 50,
      renderCell: params => {
        return (
          <>
            <IconButton
              sx={{ position: 'relative' }}
              variant="contained"
              onClick={e => handleClick(params.row, e)}
            >
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorElm} open={open} onClose={handleClose}>
              <MenuItem onClick={() => handleEditDialog()}>Editar</MenuItem>
              <MenuItem onClick={() => deleteBrandById()}>Eliminar</MenuItem>
            </Menu>
          </>
        )
      }
    },
    {
      field: 'logo',
      headerName: 'Logo',
      align: 'center',
      headerAlign: 'center',
      resizable: false,
      sortable: false,
      renderCell: params => {
        return (
          <Box
            sx={{
              boxShadow: '0px 0px 1px 1px #ddd',
              borderRadius: '6px',
              overflow: 'hidden',
              height: '70px',
              aspectRatio: '1 / 1'
            }}
          >
            <img src={params.value.url} style={{ height: '100%' }} />
          </Box>
        )
      }
    },
    {
      field: 'name',
      headerName: 'Nombre',
      resizable: false,
      flex: '1'
    },
    {
      field: 'colors',
      headerName: 'Colores',
      resizable: false,
      sortable: false,
      width: '200',
      minWidth: 200,
      align: 'center',
      headerAlign: 'center',
      renderCell: params => {
        const styles = {
          width: '30px',
          aspectRatio: '1 / 1',
          boxShadow: '0px 0px 1px 1px #ddd',
          borderRadius: '6px',
          overflow: 'hidden'
        }
        return (
          <Stack direction={'row'} spacing={2}>
            <Tippy
              // key={tag.id + tag.type}
              allowHTML={true}
              content={`Color primario ${
                params.value ? params.value.primary : params.row.primaryColor
              }`}
              placement="top"
              animation="shift-toward-subtle"
            >
              <Box
                sx={{
                  backgroundColor: params.value ? params.value.primary : params.row.primaryColor,
                  ...styles
                }}
              />
            </Tippy>
            <Tippy
              // key={tag.id + tag.type}
              allowHTML={true}
              content={`Color secundario ${
                params.value ? params.value.secondary : params.row.secondaryColor
              }`}
              placement="top"
              animation="shift-toward-subtle"
            >
              <Box
                sx={{
                  backgroundColor: params.value
                    ? params.value.secondary
                    : params.row.secondaryColor,
                  ...styles
                }}
              />
            </Tippy>
          </Stack>
        )
      }
    }
  ]

  const customFooter = () => {
    return (
      <Stack
        direction="row"
        justifyContent="flex-start"
        sx={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}
      >
        <Button variant="contained" size="small" onClick={handleCreateDialog}>
          Crear Marca
        </Button>
      </Stack>
    )
  }

  return (
    <>
      <Card variant="outlined">
        <CardHeader title="Marcas" subheader="Gestiona las marcas de tu cuenta" />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ height: '500px' }}>
                <DataGrid
                  columns={columns}
                  rowHeight={130}
                  rows={brands}
                  loading={loading}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false
                      }
                    }
                  }}
                  slots={{ footer: customFooter }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {openBranForm && (
        <CreateBrand
          isEditing={isEditing}
          brands={brands}
          brand={editedBrand}
          openDialog={openBranForm}
          handleCloseForm={handleCloseBrandForm}
          onSubmitSuccess={onNewBrandAdded}
          handleOpenSnackbar={handleOpenSnackbar}
        />
      )}

      <Snackbar
        open={snackbarState}
        autoHideDuration={1000}
        onClose={() => setSnackbarState(false)}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbar.variant == 'success' ||
            snackbar.variant == 'edit' ||
            snackbar.variant == 'delete'
              ? 'success'
              : snackbar.variant == 'error' || snackbar.variant == 'editError'
              ? 'error'
              : ''
          }
          sx={{ width: '100%' }}
        >
          {(() => {
            switch (snackbar.variant) {
              case 'success':
                return 'La marca se ha creado correctamente.'
              case 'delete':
                return 'La marca se ha eliminado correctamente.'
              case 'edit':
                return 'La marca se ha editado correctamente.'
              case 'error':
                return 'Error al crear la marca.'
              case 'editError':
                return 'Error al editar la marca.'
            }
          })()}
        </Alert>
      </Snackbar>
    </>
  )
}

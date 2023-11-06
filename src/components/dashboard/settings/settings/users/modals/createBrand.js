import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Stack,
  Typography,
  Divider
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { createBrand } from 'services/web_services/brand'
import { updateBrand } from 'services/web_services/brand'
import Box from '@mui/material/Box'
import { useState, useRef, useEffect } from 'react'
import * as yup from 'yup'
import ControlledCleaveTextField from './cleaveInput'
import yupResolver from 'hooks/useYupValidationResolver'
import { TextField, Form } from 'components/forms'
import { Upload } from '@mui/icons-material'

const imgValidate = archivo => {
  if (!archivo) return
  let limite = 2 * 1024 * 1024 // 2MB
  return archivo.size <= limite
}

const getSchema = (existingBrands, isEditing, actualBrand) => {
  const nameExists = value => {
    if (!isEditing) return !existingBrands?.some(brand => brand.name === value)
    else return !existingBrands?.some(brand => brand.name === value && brand.id !== actualBrand?.id)
  }
  return yup.object().shape({
    name: yup
      .string()
      .required()
      .test('nameExists', 'Ya existe una marca con este nombre.', nameExists),
    primaryColor: yup
      .string()
      .matches(/^#[0-9a-fA-F]{6}$/, 'Color hexadecimal invalido.')
      .required(),
    secondaryColor: yup
      .string()
      .matches(/^#[0-9a-fA-F]{6}$/, 'Color hexadecimal invalido-')
      .max(7, 'El color debe tener un máximo de 7 caracteres')
      .required()
  })
}

const getInitValues = brand => {
  return {
    name: brand?.name ?? '',
    primaryColor: brand?.colors.primary ?? '#efefef',
    secondaryColor: brand?.colors.secondary ?? '#efefef'
  }
}

const CreateBrandDialog = props => {
  const { brand, brands, isEditing } = props
  const fileInputRef = useRef()
  const handleIconClick = () => fileInputRef.current.click()
  const [imagePreview, setImagePreview] = useState()
  const [logo, setLogo] = useState(null)
  const [valid, setValid] = useState(true)
  const [primaryColor, setPrimaryColor] = useState('')
  const [secondaryColor, setSecondaryColor] = useState('')
  const [submiting, setSubmiting] = useState(false)

  useEffect(() => {
    if (brand?.colors && isEditing) {
      setImagePreview(brand.logo.url)
      setPrimaryColor(brand.colors.primary)
      setSecondaryColor(brand.colors.secondary)
    }
  }, [brand, isEditing])

  const formContext = useForm({
    resolver: yupResolver(getSchema(brands, isEditing, brand)),
    defaultValues: getInitValues(brand)
  })

  const handlePrimaryColorChange = event => {
    setPrimaryColor(event.target.value)
    formContext.setValue('primaryColor', event.target.value)
  }

  const handleSecondaryColorChange = event => {
    setSecondaryColor(event.target.value)
    formContext.setValue('secondaryColor', event.target.value)
  }

  const onFileInputChange = ({ target }) => {
    const file = target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    setValid(imgValidate(file))
    if (file) {
      reader.readAsDataURL(file)
      setLogo(file)
    }
  }

  const options = {
    prefix: '#',
    numericOnly: false,
    blocks: [7]
  }

  const handleClose = () => {
    props.handleCloseForm()
    handleReset()
  }

  const handleReset = () => {
    formContext.clearErrors()
  }

  const createNewBrand = values => {
    const formData = new FormData()
    const user = JSON.parse(sessionStorage.session)
    const userId = user.quadrantClient.id
    if (imgValidate(logo)) {
      formData.append('name', values.name)
      formData.append('logo', logo)
      formData.append('primaryColor', values.primaryColor)
      formData.append('secondaryColor', values.secondaryColor)
      formData.append('quadrantClient', userId)
      setSubmiting(true)
      createBrand(formData)
        .then(res => {
          props.onSubmitSuccess(res.data)
          props.handleOpenSnackbar('success')
          setSubmiting(false)
        })
        .catch(err => {
          props.handleOpenSnackbar('error')

          formContext.setError('form', { type: 'server', message: err.message })
          handleClose()
        })
    }
  }

  const updateExistingBrand = values => {
    const formData = new FormData()
    const user = JSON.parse(sessionStorage.session)
    const userId = user.quadrantClient.id

    formData.append('name', values.name)
    if (logo) formData.append('logo', logo)
    formData.append('primaryColor', values.primaryColor)
    formData.append('secondaryColor', values.secondaryColor)
    formData.append('quadrantClient', userId)
    if (brand.logoId) formData.append('logoId', brand.logoId)
    setSubmiting(true)
    updateBrand(props.brand.id, formData)
      .then(res => {
        props.onSubmitSuccess(res.data)
        props.handleOpenSnackbar('edit')

        setSubmiting(false)
      })
      .catch(err => {
        props.handleOpenSnackbar('editError')

        formContext.setError('form', { type: 'server', message: err.message })
        handleClose()
      })
  }

  function onSubmit(values) {
    isEditing === false ? createNewBrand(values) : updateExistingBrand(values)
  }

  return (
    <>
      <Dialog open={props.openDialog} maxWidth="sm" fullWidth scroll="body" onClose={handleClose}>
        <Form onSubmit={onSubmit} formMethods={formContext}>
          <DialogTitle>{isEditing ? 'Edición de ' : 'Creación de '}marca</DialogTitle>
          <DialogContent>
            <Stack>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  margin: '10px 0px 5px 0'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'info.main',
                    color: 'text.primary',
                    width: '130px',
                    borderRadius: '6px',
                    boxShadow: '0px 0px 1px 1px #efefef',
                    aspectRatio: '1/1',
                    cursor: 'pointer',
                    userSelect: 'none',
                    overflow: 'hidden'
                  }}
                  onClick={handleIconClick}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Logotipo" style={{ width: '100%' }} />
                  ) : (
                    <Upload fontSize="large" />
                  )}
                </Box>
                <Typography variant="caption" sx={{ marginTop: '0.25rem' }}>
                  Click para {imagePreview ? 'actualizar' : 'subir'} logo
                </Typography>
              </Box>
              <TextField label="Nombre de la marca" name="name" autoFocus fullWidth />
              <input
                ref={fileInputRef}
                type="file"
                onChange={onFileInputChange}
                accept=".png, .jpg, .jpeg"
              />
              {!valid && (
                <p
                  style={{
                    color: '#ff7750',
                    fontSize: '0.75rem',
                    marginTop: '10px',
                    minHeight: '1em'
                  }}
                >
                  La imagen no debe ser mayor a 2MB
                </p>
              )}
              <Divider sx={{ margin: '10px 0' }} />
              <Typography variant="h6">Colores de la marca</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: '100%' }}>
                <Box sx={{ width: '100%' }}>
                  <ControlledCleaveTextField
                    label="Primario"
                    name="primaryColor"
                    default={primaryColor}
                    onChange={handlePrimaryColorChange}
                    options={options}
                    fullWidth
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <ControlledCleaveTextField
                    label="Secundario"
                    name="secondaryColor"
                    default={secondaryColor}
                    onChange={handleSecondaryColorChange}
                    options={options}
                    fullWidth
                  />
                </Box>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              type="submit"
              size="large"
              disabled={submiting}
            >
              {isEditing ? 'Guardar' : 'Agregar'}
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </>
  )
}
export default CreateBrandDialog

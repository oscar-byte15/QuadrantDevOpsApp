import React from 'react'
import * as Yup from 'yup'
import { Box, Button } from '@mui/material'
import adminServices from 'services/web_services/admin'
import {
  FormContainer,
  TextFieldElement as TextField,
  SwitchElement as Switch
} from 'react-hook-form-mui'
import useYupValidationResolver from 'hooks/useYupValidationResolver'
import { useForm } from 'react-hook-form'

const QuadrantClientSchema = Yup.object().shape({
  name: Yup.string().required('Obligatorio'),
  phone: Yup.string().nullable(),
  email: Yup.string().email().nullable(),
  subdomainEnabled: Yup.boolean(),
  subdomainName: Yup.string().notOneOf(['www', 'survey'])
})

const getInitValues = quadrantClient => {
  const { name, phone, email, active, subdomain } = quadrantClient || {}
  return {
    name: name ?? '',
    phone: phone ?? '',
    email: email ?? '',
    active: active ?? false,
    subdomainEnabled: subdomain?.enabled ?? false,
    subdomainName: subdomain?.name ?? ''
  }
}

export default function AddQuadrantClient(props) {
  const formContext = useForm({
    resolver: useYupValidationResolver(QuadrantClientSchema),
    defaultValues: getInitValues(props.quadrantClient)
  })

  const handleSubmit = values => {
    if (props.quadrantClient) {
      adminServices
        .updateQuadrantClient(props.quadrantClient?.id, { ...values })
        .then(res => {
          props.onSubmitSuccess({ ...res.data, users: props.quadrantClient.users })
        })
        .catch(error => {
          //actions.setSubmitting(false)
          formContext.setError('form', { message: error.serverMessage || error.message })
        })
    } else {
      adminServices
        .addQuadrantClient(
          values.name,
          values.phone ? values.phone : null,
          values.email ? values.email : null
        )
        .then(res => {
          props.onSubmitSuccess(res.data)
        })
        .catch(error => {
          formContext.setError('form', { message: error.serverMessage || error.message })
        })
    }
  }

  const handleCancel = () => {
    props.onCancelClicked()
  }

  return (
    <FormContainer handleSubmit={formContext.handleSubmit(handleSubmit)} formContext={formContext}>
      <TextField
        name="name"
        label="Nombre de Cliente"
        placeholder="Ej. Quadrant"
        margin="normal"
        autoFocus={true}
        fullWidth={true}
      />
      <TextField
        name="phone"
        label="Teléfono de contacto"
        placeholder="Ej. 123456789"
        margin="normal"
        fullWidth={true}
      />
      <TextField
        name="email"
        label="Correo de contacto"
        placeholder="Ej. quadrant@quadrant.com"
        margin="normal"
        fullWidth={true}
      />
      <Switch labelPlacement="start" label="Suscripción activa" name="active" color="primary" />
      <Switch
        labelPlacement="start"
        label="Uso de subdominio"
        name="subdomainEnabled"
        color="primary"
      />
      <TextField
        name="subdomainName"
        label="Nombre de subdominio"
        placeholder="Ej. miempresa"
        margin="normal"
        fullWidth={true}
      />
      <Box display="flex" justifyContent="flex-end" className="form-actions">
        <Button variant="outlined" color="primary" size="large" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" size="large" className="ml-1" type="submit">
          Guardar
        </Button>
      </Box>
    </FormContainer>
  )
}

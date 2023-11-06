import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import adminServices from 'services/web_services/admin'
import {
  AutocompleteElement,
  CheckboxButtonGroup,
  FormContainer,
  TextFieldElement as TextField
} from 'react-hook-form-mui'
import useYupValidationResolver from 'hooks/useYupValidationResolver'
import ROLES from 'constants/userRoles'

const getUserSchema = (update = false) => {
  if (update)
    return Yup.object().shape({
      quadrantClientId: Yup.string().required('Obligatorio'),
      name: Yup.string().required('Obligatorio'),
      email: Yup.string().required('Obligatorio').email()
    })
  return Yup.object().shape({
    roles: Yup.array().required('Debe escoger al menos 1').min(1),
    quadrantClientId: Yup.string().required('Obligatorio'),
    name: Yup.string().required('Obligatorio'),
    email: Yup.string().required('Obligatorio').email(),
    password: Yup.string().required('Obligatorio').min(8)
  })
}

const getInitValues = user => {
  return {
    id: user?.id,
    quadrantClientId: user?.quadrantClient?.id ?? '',
    name: user?.name ?? '',
    email: user?.email ?? '',
    roles: user?.roles ?? [],
    quadrantClientName: user?.quadrantClient?.name ?? ''
  }
}

export default function AddUser(props) {
  const formContext = useForm({
    resolver: useYupValidationResolver(getUserSchema(props.user)),
    defaultValues: getInitValues(props.user)
  })
  const [quadrantClients, setQuadrantClients] = useState({ data: [], loading: true })

  useEffect(() => {
    adminServices
      .getQuadrantClients()
      .then(({ data }) => {
        setQuadrantClients({
          data: data.map(({ id, name }) => ({ id, label: name })),
          loading: false
        })
      })
      .catch(e => {
        console.error(e)
        setQuadrantClients({ data: [], loading: false })
      })
  }, [])

  const handleSubmit = async values => {
    if (props.user) {
      return adminServices
        .updateUser(props.user.id, values.quadrantClientId, values.name, values.email, values.roles)
        .then(res => {
          props.onSubmitSuccess(res.data)
        })
        .catch(error => {
          console.log({ error })
        })
    } else {
      return adminServices
        .createUser(
          values.quadrantClientId,
          values.name,
          values.email,
          values.password,
          values.roles
        )
        .then(res => {
          props.onSubmitSuccess(res.data)
        })
        .catch(error => {
          console.log({ error })
        })
    }
  }

  const handleCancel = () => {
    props.onCancelClicked()
  }

  const { isSubmitting } = formContext.formState

  return (
    <FormContainer handleSubmit={formContext.handleSubmit(handleSubmit)} formContext={formContext}>
      <CheckboxButtonGroup
        label="Roles"
        name="roles"
        options={Object.values(ROLES).map(label => ({ id: label, label }))}
        row
      />
      <br /> <br />
      <AutocompleteElement
        label="Quadrant Client"
        name="quadrantClientId"
        matchId
        options={quadrantClients.data}
        loading={quadrantClients.loading}
      />
      <TextField
        name="name"
        label="Nombre"
        placeholder="Ej. Pedro Gallo"
        margin="normal"
        fullWidth={true}
      />
      <TextField
        name="email"
        label="Correo"
        placeholder="Ej. pedro.gallo@quadrant.pe"
        margin="normal"
        fullWidth={true}
      />
      {!props.user && (
        <TextField
          name="password"
          label="Contraseña"
          type="password"
          placeholder="mínimo caracteres"
          margin="normal"
          fullWidth={true}
        />
      )}
      <Box display="flex" justifyContent="flex-end" className="form-actions">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          disabled={isSubmitting}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          className="ml-1"
          disabled={isSubmitting}
        >
          Guardar
        </Button>
      </Box>
    </FormContainer>
  )
}

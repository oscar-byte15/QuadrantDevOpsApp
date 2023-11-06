import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Button, FormControl, FormHelperText, Grid, Stack, Typography } from '@mui/material'
import httpModule from 'services/httpModule'
import { TextField, Form } from 'components/forms'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from 'hooks/useYupValidationResolver'
import USER_ROLES from 'constants/userRoles'
import { useDispatch } from 'react-redux'
import { newSnackbarMessage } from 'redux/actions/snackbar/actionDispatcher'

const getUserSchema = update => {
  return Yup.object().shape({
    roles: Yup.array().required('Debe escoger al menos 1').min(1),
    evaluationGroups: Yup.array().required('Debe escoger al menos 1').min(1),
    name: Yup.string().required('Obligatorio'),
    email: Yup.string().required('Obligatorio').email(),
    ...(!update && { password: Yup.string().required('Obligatorio').min(8) })
  })
}

const getInitValues = user => {
  let evaluationGroups = user?.evaluationGroups.map(g => g.id) ?? []
  return {
    name: user?.name ?? '',
    email: user?.email ?? '',
    roles: user?.roles ?? [],
    customRoles: user?.customRoles ?? [],
    evaluationGroups: evaluationGroups,
    tags: user?.tags ?? []
  }
}

export default function AddUser(props) {
  const dispatch = useDispatch()
  const [data, setData] = useState({ groups: [], customRoles: [], tags: [] })

  const formMethods = useForm({
    defaultValues: getInitValues(props.user),
    resolver: useYupValidationResolver(getUserSchema(Boolean(props.user)))
  })

  const {
    register,
    formState: { errors }
  } = formMethods

  useEffect(() => {
    async function fetchData() {
      const promises = [
        httpModule.get('/v1/evaluationGroups/listEvaluationGroups'),
        httpModule.get('/v1/quadrantClient/customRoles'),
        httpModule.get('/v1/tags')
      ]
      const [groups, customRoles, tags] = await Promise.all(promises)
      setData({
        groups: groups.data?.docs,
        customRoles: customRoles.data,
        tags: tags.data
      })
    }
    fetchData()
  }, [])

  const handleSubmit = values => {
    const userData = { ...values, id: props.user?.id }

    httpModule
      .post('/v1/clients/users', userData)
      .then(res => {
        dispatch(newSnackbarMessage('Se guardó al usuario correctamente'))
        props.onSubmitSuccess(res.data)
      })
      .catch(err => {
        dispatch(newSnackbarMessage('Ocurrió un error', 'error'))
      })
  }

  const handleCancel = () => {
    props.onCancelClicked()
  }

  return (
    <Form onSubmit={handleSubmit} formMethods={formMethods}>
      <Stack spacing={2} sx={{ padding: '8px 0' }}>
        <TextField name="name" label="Nombre Completo*" placeholder="Ej. Pedro Gallo" />
        <Stack direction="row" spacing={1}>
          <TextField
            margin="none"
            name="email"
            label="Correo*"
            placeholder="Ej. pedro.gallo@quadrant.pe"
          />
          {!props.user && (
            <TextField margin="none" name="password" label="Contraseña" type="password" />
          )}
        </Stack>

        <CheckboxGroup
          name="roles"
          register={register}
          list={Object.values(USER_ROLES)}
          label="Roles 1.0"
        />

        <CheckboxGroup
          name="customRoles"
          register={register}
          list={data.customRoles}
          label="Reportes Custom"
        />

        <CheckboxGroup
          name="evaluationGroups"
          register={register}
          list={data.groups}
          label="Puntos Asignados"
        />

        <CheckboxGroup
          name="tags"
          register={register}
          list={data.tags}
          label="Etiquetas Asignadas"
        />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            //disabled={isSubmitting}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            type="submit"
            size="large"
            //disabled={isSubmitting}
          >
            Guardar
          </Button>
        </Stack>
        {errors.form && (
          <FormHelperText error className="text-center">
            {errors.form}
          </FormHelperText>
        )}
      </Stack>
    </Form>
  )
}

const CheckboxGroup = ({ list, register, name, label }) => {
  const shouldRender = Array.isArray(list) && list.length > 1
  if (!shouldRender) {
    console.warn(
      'El componente ' +
        name +
        " no se puede renderizar porque 'list' no es un array o porque 'list' tiene menos de 2 items"
    )
    return null
  } else {
    return (
      <FormControl fullWidth={true}>
        <Typography>{label}</Typography>

        <Grid container spacing={1} sx={{ padding: '8px', gap: '1rem' }}>
          {list.map(item => {
            const value = (item.id || item.value) ?? item
            const label = (item.name || item.label) ?? item

            return (
              <Grid item key={value}>
                <label
                  style={{
                    userSelect: 'none',
                    padding: '10px',
                    backgroundColor: '#f7f7f7',
                    borderRadius: '6px'
                  }}
                >
                  <input type="checkbox" value={value} {...register(`${name}`)} />
                  {label}
                </label>
              </Grid>
            )
          })}
        </Grid>
      </FormControl>
    )
  }
}

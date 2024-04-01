import React from 'react'
import { Box, Button, FormHelperText, Stack, InputAdornment } from '@mui/material'
import { ArrowForward, AlternateEmail, Key } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { signIn } from 'redux/actions/auth/actionDispatcher'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import { useForm } from 'react-hook-form'
import useYupValidationResolver from 'hooks/useYupValidationResolver'
import authServices from 'services/web_services/auth'
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Ingresa una dirección de correo válida')
    .required('Obligatorio')
})

const loginDefaultValues = {
  email: 'demostracion@quadrant.pe',
  password: '1'
}

export default function LoginForm() {
  const dispatch = useDispatch()
  const formContext = useForm({
    resolver: useYupValidationResolver(LoginSchema),
    defaultValues: loginDefaultValues
  })

  const history = useHistory()

  async function handleSubmit(values) {
    try {
      const { data: user } = await authServices.login(values.email, values.password)

      dispatch(signIn(user))

      let query = history.location.search
      const searchParams = new URLSearchParams(query.substring(1))
      if (searchParams.has('returnTo'))
        history.push({
          pathname: searchParams.get('returnTo'),
          state: searchParams.get('state')
        })
      else history.push('/')
    } catch (error) {
      formContext.setError('form', { message: error.message })
    }
  }
  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 'auto', sm: '22px' },
        right: { xs: 'auto', sm: '10px' },
        bottom: { xs: '32px', sm: 'auto' },
        width: { xs: '100%', sm: 'auto' },
        zIndex: '21'
      }}
    >
      <FormContainer
        handleSubmit={formContext.handleSubmit(handleSubmit)}
        formContext={formContext}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          padding={'8px'}
          spacing={1}
          alignItems="center"
          sx={{}}
        >
          <TextFieldElement
            name="email"
            placeholder="Email"
            autoFocus
            sx={{ width: { xs: '100%', sm: '310px' } }}
            className="login-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              )
            }}
          />
          <TextFieldElement
            sx={{ width: { xs: '100%', sm: '310px' } }}
            className="login-field"
            name="password"
            placeholder="Contraseña"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              )
            }}
          />
          <Button
            color="primary"
            variant="contained"
            disableElevation
            type="submit"
            sx={{ width: { xs: '100%', sm: 'auto', padding: '11px 16px' } }}
            disabled={formContext.formState.isSubmitting}
          >
            <ArrowForward fontSize="large" />
          </Button>
        </Stack>
        {formContext.formState.errors.form && (
          <Box
            sx={{
              padding: '2px',
              textAlign: { xs: 'center', sm: 'right' }
            }}
          >
            <FormHelperText
              component="span"
              error
              sx={{
                display: 'inline-block',
                color: 'white!important',
                padding: '2px 7px',
                backgroundColor: 'black',
                margin: '0'
              }}
            >
              {formContext.formState.errors.form.message}
            </FormHelperText>
          </Box>
        )}
      </FormContainer>
    </Box>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import { FormProvider } from 'react-hook-form'

const Form = ({ formMethods, children, onSubmit }) => {
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

Form.propTypes = {
  formMethods: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Form

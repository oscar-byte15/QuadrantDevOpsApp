import React from 'react'
import ProductForm from '../form'

const EditProduct = props => {
  return <ProductForm initialValues={props.product} title="Editar encuesta" />
}

export default EditProduct

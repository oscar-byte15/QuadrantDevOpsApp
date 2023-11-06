import React, { useEffect, useState } from 'react'
import { Grid, Stack, Card, CardHeader, CardContent } from '@mui/material'
import Checkbox from '../../common/controlledCheckbox'
import { getProducts } from 'services/web_services/rating'
import Dropdown from '../../common/controlledDropdown'

const Rating = () => {
  const [products, setProducts] = useState({ data: [], loading: true })

  useEffect(() => {
    getProducts()
      .then(res => setProducts({ data: res.data, loading: false }))
      .catch(() => setProducts({ data: [], loading: false, error: 'Ocurrió un error' }))
  }, [])
  return (
    <Grid item xs={12}>
      <Stack spacing={2}>
        <Card variant="outlined">
          <CardHeader title="Selección de artículos" />
          <CardContent>
            <Dropdown
              name="rating.questionList[0].product"
              options={products.data}
              label="Item 1"
              deselectLabel="Ninguno"
            />
            <Dropdown
              name="rating.questionList[1].product"
              options={products.data}
              label="Item 2"
              deselectLabel="Ninguno"
            />
            <Checkbox name="rating.commentEnabled" label="Habilitar comentarios" />
            <Checkbox
              name="rating.dynamicProducts"
              label="Items dinámicos"
              title="Items dinámicos por cfunq"
            />
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  )
}

export default Rating

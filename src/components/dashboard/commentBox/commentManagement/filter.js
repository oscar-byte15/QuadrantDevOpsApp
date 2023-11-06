import React from 'react'
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  OutlinedInput
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const onSubmit = values => {
    //// volver a revisar // por ahora funciona bien
    const { commentBoxTicket, commentBoxTextSearch, npsPromoterType, csatScoreCategory } = values
    const payload = { ...values }
    if (commentBoxTicket === '') delete payload.commentBoxTicket
    else payload.commentBoxTicket = commentBoxTicket
    if (commentBoxTextSearch === '') delete payload.commentBoxTextSearch
    if (npsPromoterType === 'No importa') delete payload.npsPromoterType
    if (csatScoreCategory === 'No importa') delete payload.csatScoreCategory

    dispatch({ type: 'CHANGE_FILTER_OPTIONS', payload: { commentBoxFilter: payload } })
  }
  return (
    <Grid item xs={11} sx={{ mb: 1.25 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Ticket</InputLabel>
              <OutlinedInput
                id="commentBoxTicket"
                autoComplete="off"
                label="Ticket"
                {...register('commentBoxTicket')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={9}>
            <FormControl fullWidth>
              <InputLabel>Busca en comentarios y datos de contacto</InputLabel>
              <OutlinedInput
                id="commentBoxTextSearch"
                autoComplete="off"
                label="Busca en comentarios y datos de contacto"
                {...register('commentBoxTextSearch')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo Comentario</InputLabel>
              <Select
                id="commentBoxType"
                defaultValue={'Any'}
                label="Tipo Comentario"
                {...register('commentBoxType')}
              >
                <MenuItem value={'Any'}>
                  <em>Todos</em>
                </MenuItem>
                <MenuItem value={'Felicitacion'}>Felicitación</MenuItem>
                <MenuItem value={'Sugerencia'}>Sugerencia</MenuItem>
                <MenuItem value={'Reclamo'}>Reclamo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Cateogría NPS</InputLabel>
              <Select
                id="npsPromoterType"
                name="npsPromoterType"
                label="Categoría NPS"
                defaultValue={'No importa'}
                {...register('npsPromoterType')}
              >
                <MenuItem value={'Any'}>
                  <em>Todos</em>
                </MenuItem>
                <MenuItem value={'Promotor'}>Promotor</MenuItem>
                <MenuItem value={'Neutro'}>Neutro</MenuItem>
                <MenuItem value={'Detractor'}>Detractor</MenuItem>
                <MenuItem value={'No importa'}>No importa</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Categoría CSAT</InputLabel>
              <Select
                id="csatScoreCategory"
                label="Categoría CSAT"
                defaultValue={'No importa'}
                {...register('csatScoreCategory')}
              >
                <MenuItem value={'Any'}>
                  <em>Todos</em>
                </MenuItem>
                <MenuItem value={'Satisfecho'}>Satisfecho</MenuItem>
                <MenuItem value={'Neutro'}>Neutro</MenuItem>
                <MenuItem value={'Insatisfecho'}>Insatisfecho</MenuItem>
                <MenuItem value={'No importa'}>No importa</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row-reverse" justifyContent="space-between" spacing={2}>
              <Button variant="contained" type="submit" size="large" disableElevation>
                Filtrar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}
export default React.memo(Filter)

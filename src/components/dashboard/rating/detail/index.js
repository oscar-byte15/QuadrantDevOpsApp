import React, { useState } from 'react'
import {
  CardHeader,
  CardContent,
  CardActions,
  Card,
  Grid,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Stack,
  Rating,
  Box,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import { getProductDetailedReport, getProductDistribution } from 'services/web_services/rating'
import RatingCard from './ratingCard'
import BarChart from 'components/charts/barChart'
import { Face, Star, Add } from '@mui/icons-material'

const RatingManagement = props => {
  const { product, show, close } = props
  const [ratings, setRatings] = useState({ data: [], loading: false, error: false, pages: 0 })
  const [summary, setSummary] = useState({ data: [], loading: false, error: false })
  const [page, setPage] = useState(1)
  const [minRating, setMinRating] = useState('')
  const handleChange = (_, value) => setPage(value)

  React.useEffect(() => {
    if (show) {
      getProductDistribution(product.id).then(res =>
        setSummary({ data: res.data, loading: false, error: false })
      )
    }
  }, [product.id, show])

  React.useEffect(() => {
    setRatings({ ...ratings, loading: true })
    getProductDetailedReport(product.id, page, minRating)
      .then(res => {
        setRatings({
          data: res.data.docs,
          loading: false,
          error: false,
          pages: res.data.totalPages
        })
      })
      .catch(err => setRatings({ ...ratings, error: err.message }))
    //eslint-disable-next-line
  }, [page, product.id, minRating])

  const { qty, distribution, sum } = summary.data

  const ratingValue = qty ? sum / qty : 0
  const barChartData = distribution
    ? [
        distribution.cinco,
        distribution.cuatro,
        distribution.tres,
        distribution.dos,
        distribution.uno
      ]
    : []
  const barChartCategories = ['Cinco', 'Cuatro', 'Tres', 'Dos', 'Uno']
  return (
    <Dialog open={show} fullWidth onBackdropClick={close} maxWidth="md" scroll="body">
      <DialogTitle>
        <CardHeader title={product.name} subheader={product.description} />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Stack spacing={1} justifyContent="center" alignItems="center">
                <Typography
                  align="center"
                  sx={{ fontSize: '5.5rem', fontWeight: '300', lineHeight: '1' }}
                >
                  {Math.round((ratingValue + Number.EPSILON) * 100) / 100}
                </Typography>
                <Rating
                  value={ratingValue}
                  precision={0.1}
                  readOnly
                  sx={{ fontSize: '2.5rem' }}
                  size="large"
                />
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Chip icon={<Face />} label={qty ?? 0} />
                </Box>
              </Stack>

              <Box sx={{ width: '100%', paddingRight: { xs: '0', sm: '5rem' } }}>
                <BarChart data={barChartData} categories={barChartCategories} />
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardHeader title="Opiniones" />

                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="select-filter-rating">Valoraciones</InputLabel>
                        <Select
                          labelId="select-filter-rating"
                          label="Valoraciones"
                          value={minRating}
                          onChange={e => {
                            setMinRating(e.target.value)
                            setPage(1)
                          }}
                        >
                          <MenuItem value={''}>Todas</MenuItem>
                          <MenuItem value={2}>
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Add sx={{ color: '#9b9b9b!important' }} />
                          </MenuItem>
                          <MenuItem value={3}>
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Add sx={{ color: '#9b9b9b!important' }} />
                          </MenuItem>
                          <MenuItem value={4}>
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Add sx={{ color: '#9b9b9b!important' }} />
                          </MenuItem>
                          <MenuItem value={5}>
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                            <Star sx={{ color: '#ffce5b!important' }} />
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {ratings.data.map((rating, i) => (
                      <Grid key={`rating${i}`} item xs={12}>
                        <RatingCard data={rating} />
                      </Grid>
                    ))}
                    {ratings.data.length === 0 && (
                      <>
                        <Grid container alignItems="center" sx={{ minHeight: '500px' }}>
                          <Grid item xs={12}>
                            <Typography align="center">No hay valoraciones</Typography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid container justifyContent="center" item xs={12}>
                    <Pagination
                      count={ratings.pages}
                      page={page}
                      onChange={handleChange}
                      color="primary"
                    />
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
export default RatingManagement

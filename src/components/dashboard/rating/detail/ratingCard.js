import React from 'react'
import {
  Card,
  CardContent,
  Box,
  Grid,
  Typography,
  Stack,
  Divider,
  Rating,
  Chip,
  Link
} from '@mui/material'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'

import { FileText, Box as BoxIcon } from 'react-feather'

import moment from 'moment'

const RatingCard = ({ data }) => {
  let { rating, survey, evaluationGroup, createdAt, contactFields } = data
  contactFields = contactFields.filter(cf => Boolean(cf.type))
  let formattedDate = moment(createdAt).format('DD/MM/YY [(]h:mm a[)]')
  let longFormatedDate = moment(createdAt).format('dddd DD [de] MMMM [del] YYYY [(]HH:mm:ss[)]')

  return (
    <Card variant="outlined" className="comment-card" square>
      <Box display="flex">
        <Box className="comment-card__body" flexGrow={1} flexShrink={0}>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ width: '100%', padding: '15px 0', overflowX: 'auto' }}
                >
                  <Chip icon={<BoxIcon size={18} strokeWidth={1.5} />} label={evaluationGroup} />
                  <Chip icon={<FileText size={18} strokeWidth={1.5} />} label={survey} />
                </Stack>

                <Box
                  sx={{
                    padding: { xs: '20px', sm: '20px 20px 20px 41px' },
                    backgroundColor: '#fafafa'
                  }}
                >
                  <Rating value={rating.answer} readOnly sx={{ color: '#ffce5b!important' }} />
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                      minHeight: '50px',
                      padding: { xs: '20px', sm: '1rem' }
                    }}
                  >
                    {rating.comment || (
                      <em style={{ color: '#7e7e7e' }}>El participante no dejó un comentario</em>
                    )}
                  </Typography>
                  <Grid container justifyContent="flex-end">
                    <Tippy
                      content={longFormatedDate}
                      placement="bottom-end"
                      animation="shift-toward-subtle"
                    >
                      <Typography
                        variant="body1"
                        display="inline"
                        align="right"
                        color="textSecondary"
                      >
                        {formattedDate}
                      </Typography>
                    </Tippy>
                  </Grid>
                  <Box style={{ width: '100%', padding: '20px 0', overflowX: 'auto' }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ whiteSpace: 'nowrap' }}
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      {contactFields.map(contactField => (
                        <Box key={contactField.type}>
                          <Typography variant="subtitle2">{contactField.type}:</Typography>

                          {(() => {
                            switch (contactField.type) {
                              case 'Correo Electrónico':
                                return (
                                  <Link underline="hover" href={'mailto:' + contactField.answer}>
                                    {contactField.answer}
                                  </Link>
                                )
                              case 'Teléfono Celular':
                                return (
                                  <Link underline="hover" href={'tel:' + contactField.answer}>
                                    {contactField.answer}
                                  </Link>
                                )

                              default:
                                return <Typography>{contactField.answer}</Typography>
                            }
                          })()}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Box>
    </Card>
  )
}
export default RatingCard

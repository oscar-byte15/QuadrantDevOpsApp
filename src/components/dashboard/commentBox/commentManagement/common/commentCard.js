import React from 'react'
import { Box, Card, CardContent, Divider, Link, Stack, Typography } from '@mui/material'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
import moment from 'moment'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

const CommentCard = props => {
  const commentBoxAnswer = props.commentBoxAnswer
  const contactFields = props.contactFields
  const createdAt = props.createdAt

  const formattedDate = moment(createdAt).format('DD/MM/YY [(]h:mm a[)]')
  const longFormatedDate = moment(createdAt).format('dddd DD [de] MMMM [del] YYYY [(]HH:mm:ss[)]')

  return (
    <Card
      variant="outlined"
      sx={{ width: '100%', flexGrow: '0', display: 'flex', flexDirection: 'column' }}
    >
      <CardContent sx={{ height: '100%' }}>
        <Stack spacing={1} justifyContent="space-between" sx={{ height: '100%' }}>
          <Typography
            variant="h6"
            sx={{ fontFamily: '"Archivo Variable", sans-serif;', fontWeight: '400' }}
          >
            Comentario
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
            sx={{
              minHeight: '50px',
              padding: { xs: '20px', sm: '1rem' },
              whiteSpace: 'pre-wrap'
            }}
          >
            {commentBoxAnswer.answer}
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Tippy
              content={longFormatedDate}
              placement="bottom-end"
              animation="shift-toward-subtle"
            >
              <Typography variant="body1" display="inline" align="right" color="textSecondary">
                {formattedDate}
              </Typography>
            </Tippy>
          </Box>
          {contactFields.length > 0 && (
            <SimpleBar autoHide={false}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  whiteSpace: 'nowrap'
                }}
                divider={<Divider orientation="vertical" flexItem />}
              >
                {contactFields.map(contactField => (
                  <Box key={contactField.contactField.question} sx={{ paddingBottom: '8px' }}>
                    <Typography variant="subtitle2">
                      {contactField.contactField.question}
                    </Typography>
                    {(() => {
                      switch (contactField.contactField.question) {
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
            </SimpleBar>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
export default CommentCard

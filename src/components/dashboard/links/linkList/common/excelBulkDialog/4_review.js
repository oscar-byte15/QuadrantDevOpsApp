import React, { useEffect, useState } from 'react'
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  Alert,
  Chip,
  Box,
  Stack,
  FormControlLabel,
  Divider,
  Avatar,
  AlertTitle
} from '@mui/material'
import BasicDatePicker from 'components/common/datePicker'
import { uniqueLinksState } from 'services/web_services/links'
import {
  FileCopy,
  DataUsage,
  Mail,
  Link,
  ArrowRight,
  ArrowForward,
  LinkOffTwoTone,
  LinkTwoTone,
  MailTwoTone,
  MoreVert,
  Star,
  Reply,
  ArrowDropDown,
  StarBorderOutlined
} from '@mui/icons-material'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

import moment from 'moment'
const Review = ({
  subject,
  preHeader,
  brandName,
  image,
  mailsQuantity,
  mailingServiceStatus,
  uniqueLinksServiceStatus,
  expiration,
  checked,
  onExpirationChange,
  onCheckedChange,
  ...props
}) => {
  const uniqueLinksEnabled = Boolean((uniqueLinksServiceStatus.enabled = true))
  const enoughUniqueLinks = Boolean(uniqueLinksServiceStatus.available >= mailsQuantity)
  const [isEnabledDatePicker, setIsEnabledDatePicker] = useState(true)
  const [showMore, setShowMore] = useState(false)

  const handleShowMore = () => {
    setShowMore(true)
  }

  const handleChangeExpiration = date => {
    // Call the callback function to update the parent's state
    onExpirationChange(date)
  }

  const handleChangeChecked = event => {
    // Call the callback function to update the parent's state
    onCheckedChange(event.target.checked)
    if (checked === false) {
      setIsEnabledDatePicker(false)
    } else {
      setIsEnabledDatePicker(true)
    }
  }
  const handleChangeDate = date => {
    setPrincipalDate(date)
  }
  const handleChange = event => {
    setChecked(event.target.checked)
    if (checked === false) {
      setIsEnabledDatePicker(false)
    } else {
      setIsEnabledDatePicker(true)
    }
  }

  const mailingCreditsReview = () => (
    <Stack>
      <Stack direction="row" justifyContent={'space-between'}>
        <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
          <MailTwoTone />
          <Typography>Correos</Typography>
        </Stack>
        <Box sx={{ width: '100%', padding: '16px' }}>
          <Stack justifyContent={'center'} alignItems={'center'}>
            <Typography>{mailingServiceStatus.available}</Typography>
            <Typography>disponibles</Typography>
          </Stack>
        </Box>
        <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
          <Typography>-</Typography>
        </Stack>
        <Box sx={{ width: '100%', padding: '16px' }}>
          <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
            <Typography>{mailsQuantity}</Typography>
            <Typography>Por envíar</Typography>
          </Stack>
        </Box>
        <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
          <ArrowForward />
        </Stack>
        <Box sx={{ width: '100%', padding: '16px' }}>
          <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
            <Typography>{mailingServiceStatus.available - mailsQuantity}</Typography>
            <Typography>Restantes</Typography>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )

  const renderUniqueLinks = checked => (
    <Stack>
      <Stack direction="row" justifyContent={'space-between'}>
        <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
          <LinkTwoTone />
          <Typography>Links únicos</Typography>
        </Stack>
        <Box sx={{ width: '100%', padding: '16px' }}>
          <Stack justifyContent={'center'} alignItems={'center'}>
            <Typography>{uniqueLinksServiceStatus.available}</Typography>
            <Typography>disponibles</Typography>
          </Stack>
        </Box>
        <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
          <Typography>-</Typography>
        </Stack>
        <Box sx={{ width: '100%', padding: '16px' }}>
          <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
            <Typography>{checked ? mailsQuantity : '0'}</Typography>
            <Typography>Por generar</Typography>
          </Stack>
        </Box>
        <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
          <ArrowForward />
        </Stack>
        <Box sx={{ width: '100%', padding: '16px' }}>
          <Stack justifyContent={'center'} alignItems={'center'} sx={{ width: '100%' }}>
            <Typography>
              {checked
                ? uniqueLinksServiceStatus.available - mailsQuantity
                : uniqueLinksServiceStatus.available}
            </Typography>
            <Typography>Restantes</Typography>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )

  return (
    <>
      {/* <Stack spacing={2} sx={{ width: '100%' }} alignItems={'stretch'}> */}
      <Alert severity="info">
        <AlertTitle>Instrucciones</AlertTitle>
        <Typography gutterBottom>Comprueba que los datos sean correctos.</Typography>
      </Alert>

      <Typography variant="body1" sx={{ fontWeight: '500', fontSize: '1.1rem' }}>
        Tus correos se verán así:
      </Typography>
      <Box
        sx={{
          overflow: 'hidden!important',
          height: showMore ? 'auto' : '400px',
          position: 'relative'
        }}
      >
        <Card variant="outlined" square>
          <Stack>
            <Box sx={{ padding: '20px 20px 5px 76px' }}>
              <Tippy content="Título" placement="top-start" animation="shift-toward-subtle">
                <Typography
                  sx={{
                    fontSize: '20px',
                    border: '1px dotted #808080',
                    padding: '0.1rem 0.2rem 0rem 0.2rem',
                    lineHeight: '1',
                    borderRadius: '4px'
                  }}
                  display={'inline'}
                >
                  {subject}
                </Typography>
              </Tippy>
            </Box>
            <Box sx={{ marginBottom: '20px', padding: '0px 20px 0 76px' }}>
              <Tippy
                content="Previsualización"
                placement="top-start"
                animation="shift-toward-subtle"
              >
                <Typography
                  component={'span'}
                  sx={{
                    color: '#b1b1b1',

                    border: '1px dotted #808080',
                    padding: '0.1rem 0.2rem 0rem 0.2rem',
                    lineHeight: '1',
                    borderRadius: '4px'
                  }}
                >
                  {preHeader}
                </Typography>
              </Tippy>
            </Box>
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
              sx={{ padding: '0 0 0 20px', marginBottom: '10px' }}
            >
              <Avatar />
              <Stack sx={{ width: '100%' }}>
                <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                  <Typography sx={{ fontWeight: '300', fontSize: '12px' }}>
                    <Typography component={'span'} sx={{ fontWeight: '600' }}>
                      <Tippy content="Marca" placement="top-start" animation="shift-toward-subtle">
                        <Typography
                          component={'span'}
                          sx={{
                            fontWeight: '600',
                            border: '1px dotted #808080',
                            padding: '0.1rem 0.2rem 0rem 0.2rem',
                            lineHeight: '1',
                            borderRadius: '4px'
                          }}
                        >
                          {brandName}
                        </Typography>
                      </Tippy>
                      {` vía Quadrant`}
                    </Typography>
                    {` <encuestas@mail.qudrnt.com>`}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems={'center'}>
                    <Typography sx={{ fontWeight: '300', fontSize: '12px' }}>
                      {moment().format('DD MMM YYYY, HH:mm')}
                    </Typography>
                    <StarBorderOutlined />
                    <Reply />
                    <MoreVert />
                  </Stack>
                </Stack>
                <Stack direction={'row'}>
                  <Typography>Para mi</Typography>
                  <ArrowDropDown />
                </Stack>
              </Stack>
            </Stack>
            <Box sx={{ backgroundColor: '#e5e5e5', padding: '10px' }}>
              <Box sx={{ margin: '0 auto', width: '560px', backgroundColor: 'white' }}>
                <Typography
                  sx={{ padding: '15px 20px 0 20px', marginBottom: '15px', fontSize: '20px' }}
                >
                  Hola{' '}
                  <Tippy
                    content="Se reemplazará con el nombre de tus clientes"
                    placement="top-start"
                    animation="shift-toward-subtle"
                  >
                    <Typography
                      component={'span'}
                      sx={{
                        backgroundColor: '#fedfed',
                        padding: '0.1rem 0.3rem 0.1rem 0.2rem',
                        borderRadius: '4px',
                        fontSize: '20px',
                        fontStyle: 'italic'
                      }}
                    >
                      nombre del participante
                    </Typography>
                  </Tippy>
                  ,
                </Typography>
                <img src={image} style={{ width: '100%' }} />
                <Box sx={{ padding: '20px' }}>
                  <Typography sx={{ fontSize: '12px' }}>
                    Si tienes algun problema ingresando a la encuesta puedes copiar y pegar la
                    siguiente dirección en tu navegador.
                  </Typography>
                  <Box sx={{ marginTop: '10px', padding: '8px', backgroundColor: '#f4f4f4' }}>
                    <Tippy
                      content="Link dinámico o único"
                      placement="top-start"
                      animation="shift-toward-subtle"
                    >
                      <Typography
                        component={'span'}
                        sx={{
                          fontSize: '12px',
                          border: '1px dotted #808080',
                          padding: '0.1rem 0.2rem 0rem 0.2rem',
                          lineHeight: '1',
                          borderRadius: '4px'
                        }}
                      >
                        https://survey.qudrnt.com/a/123abc
                      </Typography>
                    </Tippy>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Card>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '200px',
            bottom: '0',
            display: showMore ? 'none' : 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            background:
              'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.4990371148459384) 68%, rgba(255,255,255,0) 100%)'
          }}
        >
          <Chip
            clickable
            onClick={handleShowMore}
            label="mostrar más..."
            sx={{ margin: '10px 0px 30px 0px' }}
          />
        </Box>
      </Box>

      <Typography sx={{ fontWeight: '500', fontSize: '1.1rem', marginBottom: '0.5rem!important' }}>
        Opciones avanzadas de envío:
      </Typography>
      <Stack direction={'row'}>
        <Tippy
          disabled={uniqueLinksEnabled || enoughUniqueLinks}
          content={
            !uniqueLinksEnabled
              ? `No cuentas con el servicio de links únicos`
              : !enoughUniqueLinks
              ? `No cuentas con suficientes links únicos. Necesitas ${mailsQuantity} y tienes ${uniqueLinksServiceStatus.available}.`
              : ''
          }
          placement="bottom-start"
          animation="shift-toward-subtle"
        >
          <FormControlLabel
            label="Usar links únicos"
            control={
              <Checkbox
                checked={checked}
                disabled={!uniqueLinksEnabled || !enoughUniqueLinks}
                onChange={handleChangeChecked}
                {...label}
              />
            }
          />
        </Tippy>
        <BasicDatePicker
          label="fecha de expiración"
          value={expiration}
          onChange={handleChangeExpiration}
          isEnabled={isEnabledDatePicker}
          disablePast
          closeOnSelect
        />
      </Stack>
      <Typography sx={{ fontWeight: '500', fontSize: '1.1rem', marginBottom: '0.5rem!important' }}>
        Esto es lo que pasará con tus créditos luego del envío:
      </Typography>
      {mailingCreditsReview()}
      {uniqueLinksEnabled || enoughUniqueLinks ? <Divider /> : ''}
      {uniqueLinksEnabled || enoughUniqueLinks ? renderUniqueLinks(checked) : ''}
      {/* </Stack> */}
    </>
  )
}
export default Review

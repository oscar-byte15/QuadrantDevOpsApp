import React, { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  Typography,
  Stack,
  LinearProgress,
  Box
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Form, TextField } from 'components/forms'
import BasicDatePicker from 'components/common/datePicker'

import { getExcelWithUniqueLinks } from 'services/web_services/links'
import moment from 'moment'
/**
 * Component for survey forms (edit and create)
 * @component
 * @param {object} initialValues
 * @param {string} title
 */
const UniqueLinksDialog = props => {
  const { initialValues, open, setOpen, rows, participantsData, contact } = props
  const formMethods = useForm({ defaultValues: initialValues })
  const [expirationDate, setExpirationDate] = useState(moment().startOf('day').add(7, 'days'))

  const [loading, setLoading] = useState(false)

  const generateBase64 = (questionIds, values) => {
    const jsonData = {}
    for (let i = 0; i < questionIds.length; i++) {
      jsonData[questionIds[i]] = values[i]
    }
    return btoa(unescape(encodeURIComponent(JSON.stringify(jsonData))))
  }
  let participantsData1 = participantsData
  const email = props.contact.contactFields.find(cf => cf.contactField.type === 'EMAIL')
  const fullname = props.contact.contactFields.find(cf => cf.contactField.type === 'FULLNAME')
  const rest = props.contact.contactFields.filter(
    cf => cf.contactField.type !== 'EMAIL' && cf.contactField.type !== 'FULLNAME'
  )

  const questionIds = [
    email.id,
    fullname.id,
    ...rest.map(cf => cf.id),
    ...contact.questionList.map(question => question.id)
  ]

  const handleClose = () => setOpen(false)
  const handleChangeDate = date => {
    setExpirationDate(date)
  }

  // useEffect(() => {
  //   setLoading(true)
  // }, [])

  /*const sendRequest = useCallback(async () => {
    if (loading) return
    setLoading(true)
    participantsData1.shift() //to delete column names
    participantsData1 = participantsData1.map(row => {
      return {
        email: row[0],
        name: row[1],
        phone: row[2],
        documentNro: row[3],
        socialReason: row[4],
        cfunq: generateBase64(
          questionIds,
          props.contact.contactFields.length !== 0 ? row : row.slice(2)
        )
      }
    })
    const expiration = moment(expirationDate).startOf('day').utc().format('DD/MM/YYYY HH:mm:ss')
    const excelUniqueLinkData = {
      participantsData: participantsData1,
      expiration,
      surveySlug: props.surveySlug
    }
    await getExcelWithUniqueLinks(excelUniqueLinkData).then(response => {
      console.log(response)
      return response
    })
  })*/

  useEffect(() => {
    if (loading) {
      participantsData1.shift() //to delete column names
      participantsData1 = participantsData1.map(row => {
        return {
          email: row[0],
          name: row[1],
          phone: row[2],
          documentNro: row[3],
          socialReason: row[4],
          cfunq: generateBase64(
            questionIds,
            props.contact.contactFields.length !== 0 ? row : row.slice(2)
          )
        }
      })

      const expiration = moment(expirationDate).startOf('day').utc().format('DD/MM/YYYY HH:mm:ss')

      const excelUniqueLinkData = {
        participantsData: participantsData1,
        expiration,
        surveySlug: props.surveySlug
      }

      getExcelWithUniqueLinks(excelUniqueLinkData)
        .then(() => {
          // setOpen(false)

          setLoading(true)
        }) // aca debe ir el cargando
        .catch(_ => {
          alert('Hubo un error')
          setLoading(false)
        })
        .then(() => {
          setLoading(false)
          setOpen(false)
        })
    }
  }, [loading])

  function onSubmit(values) {
    setLoading(true)
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ position: 'relative' }}>
        {loading ? (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgb(204 204 204 / 50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10
            }}
          >
            <Box sx={{ width: '60%', height: '10px' }}>
              <LinearProgress />
            </Box>
          </Box>
        ) : (
          ''
        )}
        <DialogTitle>Opciones de generación de links únicos</DialogTitle>
        <Form onSubmit={onSubmit} formMethods={formMethods} sx={{ position: 'relative' }}>
          <DialogContent>
            <Stack spacing={2}>
              <Alert severity="info">
                <AlertTitle>Instrucciones</AlertTitle>
                <Typography gutterBottom>
                  Determina la fecha de expiración a partir de la cual los links dejarán de
                  funcionar.
                </Typography>
              </Alert>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                justifyContent={'flex-start'}
                alignItems={'baseline'}
              >
                <Typography sx={{ whiteSpace: 'nowrap', minWidth: '125px' }}>
                  Fecha de expiración:
                </Typography>
                <BasicDatePicker
                  // label="fecha de expiración"
                  value={expirationDate}
                  onChange={handleChangeDate}
                  renderInput={params => <TextField {...params} />} // Renderiza el DatePicker dentro del TextField
                  disablePast
                  closeOnSelect
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" size="small" onClick={handleClose}>
              Cerrar
            </Button>
            <Button
              variant="contained"
              disabled={loading ? true : false}
              disableElevation
              color="primary"
              type="submit"
              //onClick={sendRequest}
              size="small"
            >
              Generar
            </Button>
          </DialogActions>
        </Form>
      </Box>
    </Dialog>
  )
}

export default UniqueLinksDialog

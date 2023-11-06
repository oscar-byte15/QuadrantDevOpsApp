import React, { useEffect, useState } from 'react'
import Dialog from 'components/modal/dialog'
import { read, utils, writeFile } from 'xlsx'
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Typography,
  Box,
  Chip
} from '@mui/material'
import { useSelector } from 'react-redux'
import Upload from './1_upload'
import DataReview from './2_dataReview'
import Compose from './3_compose'
import Review from './4_review'
import Farewell from './5_result'
import { sendImageSurveyBatch, getMailingState } from 'services/web_services/mailing'
import { uniqueLinksState } from 'services/web_services/links'
import moment from 'moment'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
import { AlternateEmail, LinkTwoTone, Mail, MailTwoTone } from '@mui/icons-material'

const ExcelBulkDialog = ({ open, onClose, surveySlug, contact, templateName }) => {
  const quadrantClientName = useSelector(state => state.auth.quadrantClient.name)
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [data, setData] = React.useState([])
  const [expiration, setExpiration] = useState(moment().startOf('day').add(7, 'days'))
  const [checked, setChecked] = useState(false)

  const handleExpirationChange = expiration => {
    setExpiration(expiration)
  }

  const handleCheckedChange = isChecked => {
    setChecked(isChecked)
  }
  const [mailData, setMailData] = useState({
    subject: 'Cuéntanos tu opinión',
    preHeader: `En ${quadrantClientName} nos importa tu opinión, ayudanos a mejorar llenando esta encuesta rápida`,
    image: 'https://res.cloudinary.com/groulycloud/image/upload/v1623262492/mailimage.png',
    brandName: quadrantClientName
  })

  const [mailingState, setMailingState] = useState()
  const updateMailingState = () => getMailingState().then(({ mailing }) => setMailingState(mailing))

  useEffect(() => {
    if (open) updateMailingState()
  }, [open])

  const [uniqueLinksServiceStatus, setuniqueLinksServiceStatus] = useState()

  const [mailingServiceStatus, setmailingServiceStatus] = useState()
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false)

  useEffect(() => {
    uniqueLinksState()
      .then(res => {
        setuniqueLinksServiceStatus({
          enabled: res.data.enabled,
          quota: res.data.monthlyQuota,
          used: res.data.used,
          available: res.data.monthlyQuota - res.data.used
        })
      })
      .catch(err => console.error('Quadrant client sin uniquelinks', err))
  }, [open, step])

  useEffect(() => {
    getMailingState().then(res => {
      setmailingServiceStatus({
        enabled: res.mailing.enabled,
        quota: res.mailing.monthlyQuota,
        used: res.mailing.used,
        available: res.mailing.monthlyQuota - res.mailing.used
      })
    })
  }, [open, step])

  const handleFile = file => {
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = e => {
      const bstr = e.target.result
      const wb = read(bstr, { type: rABS ? 'binary' : 'array' })
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      let data = utils.sheet_to_json(ws, { header: 1 })
      data = data.filter(row => row.length !== 0)
      const mailQuantity = data.length - 1
      setData(data)
      if (data.length > 1) setStep(1)
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }
  const exportFile = () => {
    const email = contact.contactFields.find(cf => cf.contactField.type === 'EMAIL')
    const fullname = contact.contactFields.find(cf => cf.contactField.type === 'FULLNAME')
    const rest = contact.contactFields.filter(
      cf => cf.contactField.type !== 'EMAIL' && cf.contactField.type !== 'FULLNAME'
    )
    const initialColumns = [
      email.contactField?.question,
      fullname.contactField?.question,
      ...rest.map(cf => cf.contactField?.question)
    ]
    // if (contact.contactFields) initialColumns.push('Teléfono Celular')
    const data = [[...initialColumns, ...contact.questionList.map(q => q.question)]]
    const ws = utils.aoa_to_sheet(data)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'maildata')
    writeFile(wb, templateName)
  }
  let participantsData = [...data]

  const steps = [
    <Upload
      handleFile={handleFile}
      exportFile={exportFile}
      mailingServiceStatus={mailingServiceStatus}
    />,
    <DataReview
      data={data}
      setIsNextButtonDisabled={setIsNextButtonDisabled}
      participantsData={participantsData}
      contact={contact}
      surveySlug={surveySlug}
      mailingServiceStatus={mailingServiceStatus}
      uniqueLinksServiceStatus={uniqueLinksServiceStatus}
    />,
    <Compose mailData={mailData} setMailData={setMailData} />,
    <Review
      {...mailData}
      mailsQuantity={data.length - 1}
      {...mailingState}
      mailingServiceStatus={mailingServiceStatus}
      uniqueLinksServiceStatus={uniqueLinksServiceStatus}
      expiration={expiration}
      checked={checked}
      onExpirationChange={handleExpirationChange}
      onCheckedChange={handleCheckedChange}
    />,
    <Farewell
      {...mailingState}
      mailsLength={data.length}
      mailingServiceStatus={mailingServiceStatus}
      uniqueLinksServiceStatus={uniqueLinksServiceStatus}
    />
  ]

  const handleNext = () => {
    if (step !== steps.length - 2) setStep(step + 1)
    else sendImageSurveyBatchFromExcel()
  }

  const generateBase64 = (questionIds, values) => {
    const jsonData = {}
    for (let i = 0; i < questionIds.length; i++) {
      jsonData[questionIds[i]] = values[i]
    }
    return btoa(unescape(encodeURIComponent(JSON.stringify(jsonData))))
  }

  const sendImageSurveyBatchFromExcel = () => {
    const email = contact.contactFields.find(cf => cf.contactField.type === 'EMAIL')
    const fullname = contact.contactFields.find(cf => cf.contactField.type === 'FULLNAME')
    const rest = contact.contactFields.filter(
      cf => cf.contactField.type !== 'EMAIL' && cf.contactField.type !== 'FULLNAME'
    )

    const questionIds = [
      email.id,
      fullname.id,
      ...rest.map(cf => cf.id),
      ...contact.questionList.map(question => question.id)
    ]

    const maxQty = mailingServiceStatus.quota - mailingServiceStatus.used

    participantsData.shift() //to delete column names
    participantsData = participantsData.map(row => {
      return {
        email: row[0],
        name: row[1],
        cfunq: generateBase64(questionIds, contact.contactFields.length !== 0 ? row : row.slice(2))
      }
    })

    participantsData.length = participantsData.length <= maxQty ? participantsData.length : maxQty

    const expirationDate = moment(expiration).utc().format('DD/MM/YYYY HH:mm:ss') // UTC

    //aca debe ir el unique link y el expiration
    const mailingData = {
      ...mailData, // preHeader, subjject, image, brandName
      participantsData,
      surveySlug,
      uniqueLink: checked,
      expiration: expirationDate
    }

    setSubmitting(true)

    sendImageSurveyBatch(mailingData)
      .then(() => {
        updateMailingState()
        setData(participantsData)
        setStep(step + 1)
      })
      .catch(_ => alert('Hubo un error'))
      .then(() => setSubmitting(false))
  }

  const titleModifier = step => {
    switch (step) {
      case 0:
        return 'destinatarios'
      case 1:
        return 'datos'
      case 2:
        return 'Redacción'
      case 3:
        return 'revisión'
      case 4:
        return 'envío'
    }
  }

  return (
    <Dialog open={open} scroll="body" maxWidth="md" onClose={onClose}>
      <>
        <DialogTitle>
          {
            <Stack direction="row" justifyContent={'space-between'}>
              <Typography variant="h6">
                {'Envío de correo masivo' + ' - ' + titleModifier(step)}
              </Typography>
              <Box>
                <Stack direction="row" spacing={1}>
                  <Tippy
                    content={`Quedan ${uniqueLinksServiceStatus?.available} enlaces únicos disponibles de ${uniqueLinksServiceStatus?.quota} `}
                    placement="bottom-end"
                    animation="shift-toward-subtle"
                  >
                    <Chip
                      icon={<LinkTwoTone />}
                      label={`${uniqueLinksServiceStatus?.available}`}
                      color="default"
                    />
                  </Tippy>
                  <Tippy
                    content={`Quedan ${mailingServiceStatus?.available} envios disponibles de ${mailingServiceStatus?.quota}`}
                    placement="bottom-end"
                    animation="shift-toward-subtle"
                  >
                    <Chip
                      icon={<AlternateEmail />}
                      label={`${mailingServiceStatus?.available}`}
                      color="default"
                    />
                  </Tippy>
                </Stack>
              </Box>
            </Stack>
          }
        </DialogTitle>
        <DialogContent>
          <Stepper alternativeLabel activeStep={step}>
            <Step completed={step > 0}>
              <StepLabel sx={{ textTransform: 'capitalize' }}>{titleModifier(0)}</StepLabel>
            </Step>
            <Step completed={step > 1}>
              <StepLabel sx={{ textTransform: 'capitalize' }}>{titleModifier(1)}</StepLabel>
            </Step>
            <Step completed={step > 2}>
              <StepLabel sx={{ textTransform: 'capitalize' }}>{titleModifier(2)}</StepLabel>
            </Step>
            <Step completed={step > 3}>
              <StepLabel sx={{ textTransform: 'capitalize' }}>{titleModifier(3)}</StepLabel>
            </Step>
            <Step completed={step > 4}>
              <StepLabel sx={{ textTransform: 'capitalize' }}>{titleModifier(4)}</StepLabel>
            </Step>
          </Stepper>
          <Stack spacing={2} sx={{ paddingTop: '2rem' }}>
            {steps[step]}
          </Stack>
        </DialogContent>
        <DialogActions>
          {step < steps.length - 1 ? (
            <>
              <Button
                color="primary"
                disabled={step === 0 || step === steps.length - 1}
                onClick={() => setStep(step - 1)}
              >
                Atras
              </Button>
              <Button
                color="primary"
                disabled={
                  submitting ||
                  step === 0 ||
                  (step === 2 &&
                    (mailData.subject === '' ||
                      mailData.preHeader === '' ||
                      mailData.image === '' ||
                      mailData.brandName === ''))
                }
                onClick={handleNext}
                variant={step === steps.length - 2 ? 'contained' : undefined}
              >
                {step === steps.length - 2 ? 'Enviar' : 'Siguiente'}
              </Button>
            </>
          ) : (
            <Button color="primary" onClick={() => onClose()} variant={'contained'}>
              {'Salir'}
            </Button>
          )}
        </DialogActions>
      </>
    </Dialog>
  )
}
export default ExcelBulkDialog

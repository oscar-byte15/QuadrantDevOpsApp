import React, { useState } from 'react'
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import ModalButton from '../../../modal/modalButton'
import surveyServices from 'services/web_services/surveys'

export default function AddSurvey({ excludedSurveys, handleAddSurvey }) {
  const [open, setOpen] = useState(false)
  const [surveysMap, setSurveysMap] = useState([])

  function handleOpen() {
    surveyServices.listSurveys().then(res => {
      let surveys = res.data
      let surveysMap = new Map()

      const _excludedSurveys = excludedSurveys.map(({ id }) => id)
      surveys.forEach(survey => {
        if (!_excludedSurveys.includes(survey.id)) surveysMap.set(survey.id, survey)
      })
      setSurveysMap(surveysMap)
      setOpen(true)
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = e => {
    const { survey } = Object.fromEntries(new FormData(e.target))
    handleAddSurvey(surveysMap.get(survey))
    handleClose()
  }

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      <ModalButton
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        variant="contained"
        color="primary"
        size="medium"
        disableElevation
        //disabled={this.props.isSubmitting}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Asignar Encuesta</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Elige una encuesta de la lista para poder generar una vinculación.
            </DialogContentText>
            <FormControl
              variant="outlined"
              fullWidth={true}
              margin="normal"
              //error={surveyError}
            >
              <InputLabel htmlFor="survey">Encuesta</InputLabel>
              <Select
                defaultValue=""
                required
                input={<OutlinedInput label="Encuesta" name="survey" className="text-left" />}
                disabled={surveysMap.length === 0}
              >
                {Array.from(surveysMap).map(item => {
                  let survey = item[1]
                  return (
                    <MenuItem key={survey.key || survey.id} value={survey.key || survey.id}>
                      {survey.value || survey.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              type="submit"
              //disabled={isSubmitting}
            >
              Agregar
            </Button>
          </DialogActions>
        </form>
      </ModalButton>
    </Box>
  )
}

import React from 'react'
import {
  Card,
  CardContent,
  Grid,
  Stack,
  TextField as MUITextField,
  Typography
} from '@mui/material'
import TextField from '../../common/controlledTextField'
import Switch from '../../common/controlledSwitch'
import FollowUpCard from './common/followUpCard'

const defaultNPSQuestion =
  'En una escala de 0 al 10 ¿Que tan probable es que nos recomiendes con tus amigos o familiares?'
const defaultTranslatedNPSQuestion = 'On a scale from 0-10... '

const NpsModule = _ => (
  <>
    <Grid item xs={12}>
      <TextField
        name="nps.question.question"
        label="Pregunta NPS"
        placeholder={'Ej. ' + defaultNPSQuestion}
      />
      <TextField
        name="nps.question.translate"
        label="Pregunta NPS en idioma secundario"
        placeholder={'Ej. ' + defaultTranslatedNPSQuestion}
      />
    </Grid>
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={1}>
            <Switch
              name="nps.followup.enabled"
              labelPlacement="end"
              label="Pregunta de seguimiento"
              size="small"
            />

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
              <FollowUpCard
                title="Detractores (0 - 6)"
                path="nps.followup.questionList.detractors"
              />
              <FollowUpCard
                title="Neutros (7 - 8)"
                path="nps.followup.questionList.neutrals"
              />
              <FollowUpCard
                title="Promotores (9 - 10)"
                path="nps.followup.questionList.promoters"
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  </>
)

export default NpsModule

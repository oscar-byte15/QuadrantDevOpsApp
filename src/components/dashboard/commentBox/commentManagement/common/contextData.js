import React from 'react'
import { Stack } from '@mui/material'
import { Place, Inbox, SentimentVerySatisfied, Thermostat, Assignment } from '@mui/icons-material'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import LabelPill from 'components/common/quadrantComponents/LabelPill'

const ContextData = props => {
  const context = props.context

  return (
    <Stack spacing={1}>
      <SimpleBar autoHide={false}>
        <Stack direction="row" spacing={1}>
          <LabelPill
            icon={<Assignment fontSize="small" color="#4e4e4e" />}
            label="Encuesta"
            value={context.surveyName}
          />
          <LabelPill
            icon={<Place fontSize="small" color="#4e4e4e" />}
            label="Punto de evaluación"
            value={context.pointName}
          />
          <LabelPill
            icon={<Inbox fontSize="small" color="#4e4e4e" />}
            label="Buzón"
            value={context.commentType}
          />
        </Stack>
      </SimpleBar>
      <Stack direction="row" spacing={1}>
        {context.csatScore != null ? (
          <>
            <LabelPill
              icon={<SentimentVerySatisfied fontSize="small" color="#4e4e4e" />}
              label="CSAT"
              value={context.csatScore}
            />
          </>
        ) : (
          ''
        )}
        {context.npsPromoterType != null ? (
          <>
            <LabelPill
              icon={<Thermostat fontSize="small" color="#4e4e4e" />}
              label="NPS"
              value={context.npsPromoterType}
            />
          </>
        ) : (
          ''
        )}
      </Stack>
    </Stack>
  )
}
export default ContextData

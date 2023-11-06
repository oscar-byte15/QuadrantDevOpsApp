import { Card, CardActions, Button, Typography, CardHeader } from '@mui/material'
import EditQuestion from 'components/dashboard/addQuestion/addQuestion'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-toward-subtle.css'
import Switch from '../../common/controlledSwitch'

import React from 'react'
const QuestionCard = props => {
  const { question, index, handleDiscard, handleEdit } = props
  return (
    <>
      <Card className="card" variant="outlined" square style={{ height: '100%' }}>
        <CardHeader
          disableTypography
          title={
            <Typography
              variant="h6"
              style={{
                color: '#2d2d2de8',
                fontWeight: '400',
                fontSize: '1.15rem'
              }}
            >
              {question.question}
            </Typography>
          }
          subheader={
            question.translate && <Typography variant="body1">{question.translate}</Typography>
          }
        />
        <CardActions>
          {question.id ? (
            <Tippy
              content="Activar o desactivar campo personalizado"
              placement="bottom"
              animation="shift-toward-subtle"
            >
              <Switch
                name={`contact.questionList.${index}.enabled`}
                color="secondary"
                size="small"
              />
            </Tippy>
          ) : (
            <Tippy
              content="Eliminar pregunta de la encuesta"
              placement="bottom"
              animation="shift-toward-subtle"
            >
              <Button color="primary" onClick={() => handleDiscard(index)}>
                Descartar
              </Button>
            </Tippy>
          )}
          <EditQuestion
            question={question}
            variant="outlined"
            title="Editar campo de contacto"
            buttonText="Editar"
            label="Pregunta"
            handleEdit={obj => handleEdit(index, obj)}
            helperText=""
            color="primary"
          />
        </CardActions>
      </Card>
    </>
  )
}
export default QuestionCard

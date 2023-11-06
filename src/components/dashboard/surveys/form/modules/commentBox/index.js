import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import useEffectAfterMount from 'hooks/useEffectAfterMount'
import { Grid } from '@mui/material'
import InboxConfigCard from './configCard'
import TextField from '../../common/controlledTextField'
import Checkbox from '../../common/controlledCheckbox'
import Tippy from 'components/common/tippy'

const CommentBoxModule = () => {
  const { setValue } = useFormContext()
  const defaultBox = useWatch({ name: 'commentBox.defaultEnabled', defaultValue: false })

  useEffectAfterMount(() => {
    if (defaultBox === true) {
      setValue('commentBox.questionList[0].enabled', false)
      setValue('commentBox.questionList[1].enabled', false)
      setValue('commentBox.questionList[2].enabled', false)
    }
  }, [setValue, defaultBox])
  return (
    <>
      <Grid item xs={12}>
        <TextField
          name="commentBox.title"
          label="Titulo de la sección"
          placeholder="Déjanos tus comentarios"
        />
        <TextField name="commentBox.subtitle" label="Subtítulo de la sección" />
        <Tippy content="Al activar el buzón por defecto, se deshabilitarán los demás módulos">
          <Checkbox name="commentBox.defaultEnabled" label="Buzón por defecto" />
        </Tippy>
        <Checkbox name="commentBox.fallback" label="Fallback para encuestas" />
      </Grid>

      <Grid item xs={12}>
        <Grid item container spacing={1} justifyContent="flex-start">
          <InboxConfigCard config={congratConfig} />

          <InboxConfigCard config={suggConfig} />

          <InboxConfigCard config={complaintConfig} />
        </Grid>
      </Grid>
    </>
  )
}

export default CommentBoxModule

const congratConfig = {
  title: 'Felicitaciones',
  subtitle: 'Buzón estandar',
  fieldPlaceholder: 'Estamos atentos a tus comentarios',
  backgroundColor: '#53dd6c',
  path: 'commentBox.questionList[0]'
}
const suggConfig = {
  title: 'Sugerencias',
  subtitle: 'Buzón estandar',
  fieldPlaceholder: 'Estamos atentos a tus sugerencias',
  backgroundColor: '#eec643',
  path: 'commentBox.questionList[1]'
}
const complaintConfig = {
  title: 'Reclamos',
  subtitle: 'Buzón estandar',
  fieldPlaceholder: 'Estamos atentos a tu reclamo',
  backgroundColor: '#e4572e',
  path: 'commentBox.questionList[2]'
}

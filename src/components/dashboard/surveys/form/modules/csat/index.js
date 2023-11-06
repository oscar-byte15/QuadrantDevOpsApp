import React, { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FormHelperText, MenuItem, Grid, FormControl, InputLabel, Select } from '@mui/material'
import Dropdown from '../../common/controlledDropdown'
import { listScales } from 'services/web_services/csatScale'
import { listQuestionBanks } from 'services/web_services/questionBank'
import AddQuestion from 'components/dashboard/addQuestion/addQuestion'
import QuestionCard from './questionCard'

const CsatModule = () => {
  const [bank, setBank] = useState('')
  const [csatScaleList, setCsatScaleList] = useState([])
  const [questionBanksMap, setQuestionBanksMap] = useState(new Map())
  const { fields, append, update, remove } = useFieldArray({
    name: 'csat.questionList',
    keyName: 'keyName' // to avoid id error
  })
  const {
    getValues,
    formState: { errors }
  } = useFormContext()

  const existentCsatModule = Boolean(getValues('csat.questionList[0].createdAt'))

  React.useEffect(() => {
    listScales().then(res => setCsatScaleList(res.data))
    if (!existentCsatModule) {
      listQuestionBanks().then(res => {
        let banks = res.data
        let banksMap = new Map()
        banks.forEach(bank => {
          banksMap.set(bank.id, bank)
        })
        setQuestionBanksMap(banksMap)
      })
    }
    return () => {}
    //eslint-disable-next-line
  }, [])

  const handleBankChange = e => {
    let bank = e.target.value
    setBank(bank)
    questionBanksMap.get(bank).questionList.forEach(question => {
      let temp = {
        question: question.question,
        translate: question.translate,
        priority: 0,
        keyName: question.id
      }
      append(temp)
    })
  }
  const handleAppend = obj => {
    obj.priority = 0
    append(obj)
  }
  const handleEdit = (index, obj) => update(index, obj)

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        {csatScaleList.length !== 0 && (
          <Dropdown
            name="csat.scale"
            label="Escala CSAT"
            disabled={Boolean(existentCsatModule)}
            options={csatScaleList}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <Dropdown
          name="csat.qtyShowed"
          label="Preguntas por participante"
          options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
          helperText="Número de preguntas aleatorias que se mostrarán a cada participante."
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="questionBank">Set de Preguntas</InputLabel>
          <Select
            value={bank}
            onChange={handleBankChange}
            disabled={Array.from(questionBanksMap).length === 0}
            label="Set de preguntas"
          >
            {Array.from(questionBanksMap).map(item => {
              let bank = item[1]
              return (
                <MenuItem key={bank.id} value={bank.id}>
                  {bank.name}
                </MenuItem>
              )
            })}
          </Select>
          <FormHelperText>Empieza con nuestras preguntas predeterminadas</FormHelperText>
        </FormControl>
      </Grid>
      <Grid container spacing={1} item xs={12}>
        {fields.map((question, index) => (
          <Grid item xs={12} key={index}>
            <QuestionCard
              question={question}
              index={index}
              handleDiscard={remove}
              handleEdit={obj => handleEdit(index, obj)}
            />
          </Grid>
        ))}
      </Grid>
      {errors['csat.questionList'] && (
        <FormHelperText error> {errors['csat.questionList'].message}</FormHelperText>
      )}
      <Grid item xs={12}>
        <AddQuestion
          title="Agregar pregunta CSAT"
          label="Pregunta"
          handleAddQuestion={handleAppend}
          helperText=""
        />
      </Grid>
    </Grid>
  )
}
export default CsatModule

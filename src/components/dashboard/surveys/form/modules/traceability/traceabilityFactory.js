const traceabilityFactory = (question, values) => {
  const baseQuestion = {
    enabled: true,
    inputProps: {},
    question: '',
    type: values.picked
  }
  //Bloque Titulo
  switch (question.type) {
    case 'Title':
      return {
        ...baseQuestion,
        body: values.body
      }
    //Bloque Parrafo
    case 'Text':
      return {
        ...baseQuestion,
        body: values.body
      }
    case 'Normal':
      return {
        ...baseQuestion,
        inputProps: {
          required: question.inputProps.required,
          type: question.inputProps.type
        },
        question: values.question
      }
    //Bloque Lista Desplegable
    case 'Select':
      return {
        ...baseQuestion,
        inputProps: {
          required: question.inputProps.required
        },
        options: question.options,
        question: values.question
      }
    //Bloque Selección Única
    case 'RadioButton':
    //Bloque Selección Multiple
    case 'Checkbox':
      return {
        ...baseQuestion,
        inputProps: {
          required: question.inputProps.required,
          hasIndeterminateOption: question.inputProps.hasIndeterminateOption
        },
        options: question.options,
        question: values.question
      }
    //Bloque Sato de Página
    case 'Break':
      return {
        ...baseQuestion
      }

    case 'RepeatableGroup':
      return {
        ...baseQuestion,
        defaultStruct: values.defaultStruct,
        maxRepeat: values.maxRepeat,
        question: values.question
      }
    //Bloque Términos Custom
    case 'CustomTyC':
      return {
        ...baseQuestion,
        body: values.body,
        inputProps: {
          required: question.inputProps.required,
          type: question.inputProps.type
        }
      }

    default:
      return
  }
}

export default traceabilityFactory

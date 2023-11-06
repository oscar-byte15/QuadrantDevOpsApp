import * as Yup from 'yup'
let csat = Yup.object({
  enabled: Yup.boolean(),
  scale: Yup.string().when('enabled', {
    is: true,
    then: Yup.string().required('Debe seleccionar una escala')
  }),
  qtyShowed: Yup.number().when('enabled', {
    is: true,
    then: Yup.number().required('Debes escoger una cantidad')
  }),
  questionList: Yup.array().when('enabled', {
    is: true,
    then: Yup.array()
      .min(1, 'Debe agregar por lo menos una pregunta CSAT')
      .required('Debes agregar por lo menos una pregunta CSAT')
  })
})

const traceability = Yup.object({
  enabled: Yup.boolean(),
  questionList: Yup.array().when('enabled', {
    is: true,
    then: Yup.array()
      .min(1, 'Debe agregar por lo menos una pregunta de trazabilidad')
      .required('Debes agregar por lo menos una pregunta trazabilidad')
  }),
  title: Yup.string().when('enabled', {
    is: true,
    then: Yup.string().required('Debe ingresar el texto')
  })
})

let welcome = Yup.object({
  enabled: Yup.boolean(),
  message: Yup.string().when('enabled', {
    is: true,
    then: Yup.string().required('Debe ingresar un mensaje de bienvenida')
  })
})

const nps = Yup.object({
  enabled: Yup.boolean(),
  question: Yup.object({
    question: Yup.string().when('enabled', {
      is: true,
      then: Yup.string().required('Debe ingresar el texto de la pregunta NPS')
    })
  }),

  followup: Yup.object({
    enabled: Yup.boolean(),
    questionList: Yup.object({
      detractors: Yup.object({
        enabled: Yup.boolean(),
        question: Yup.string().when('enabled', {
          is: true,
          then: Yup.string().required('Debe ingresar el texto de la pregunta')
        })
      }),
      neutrals: Yup.object({
        enabled: Yup.boolean(),
        question: Yup.string().when('enabled', {
          is: true,
          then: Yup.string().required('Debe ingresar el texto de la pregunta')
        })
      }),
      promoters: Yup.object({
        enabled: Yup.boolean(),
        question: Yup.string().when('enabled', {
          is: true,
          then: Yup.string().required('Debe ingresar el texto de la pregunta')
        })
      })
    })
  })
})

const commentBox = Yup.object({
  enabled: Yup.boolean(),
  title: Yup.string().when('enabled', {
    is: true,
    then: Yup.string().required('Debe ingresar un título')
  }),
  questionList: Yup.array().of(
    Yup.object({
      enabled: Yup.boolean(),
      question: Yup.string().when('enabled', {
        is: true,
        then: Yup.string().required('Debe ingresar un título')
      }),
      aboutSelect: Yup.object({
        enabled: Yup.boolean().nullable(),
        options: Yup.string().when('enabled', {
          is: true,
          then: Yup.string().required('Debe ingresar opciones separadas por coma')
        })
      })
    })
  )
})

let contact = Yup.object({
  enabled: Yup.boolean(),
  title: Yup.string().when('enabled', {
    is: true,
    then: Yup.string().required('Debe ingresar un título')
  }),
  tyc: Yup.object({
    enabled: Yup.boolean(),
    tyc: Yup.string().when('enabled', {
      is: true,
      then: Yup.string().required('Debe especificar los Términos y Condiciones')
    })
  })
})

let redirect = Yup.object({
  enabled: Yup.boolean(),
  csatConditional: Yup.boolean(),
  text: Yup.string().when('enabled', {
    is: true,
    then: Yup.string().required('Debe ingresar el texto del botón')
  }),
  url: Yup.string().when('enabled', {
    is: true,
    then: Yup.string().required('Debe especificar la dirección url')
  })
})
let farewell = Yup.object({
  enabled: Yup.boolean(),
  message: Yup.string().when('enabled', {
    is: true,
    then: Yup.string().required('Debe ingresar un mensaje de despedida')
  })
})
export default Yup.object({
  name: Yup.string().required('Obligatorio'),
  language: Yup.string().required('Obligatorio'),
  timer: Yup.number(),
  logo: Yup.mixed().test('fileFormat', 'Formatos permitidos: *.png *.jpg *.jpeg', value => {
    return !value || ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)
  }),
  /*logo: Yup.mixed().when('logoUrl', {
    is: '',
    then: Yup.mixed()
      .required('Obligatorio')
      .test('fileFormat', 'Formatos permitidos: *.png *.jpg *.jpeg', value => {
        return value && ['image/png', 'image/jpeg', 'image/jpg'].includes(value.type)
      })
  }),*/
  traceability,
  welcome,
  csat,
  nps,
  commentBox,
  contact,
  farewell,
  redirect
}).test('form', null, obj => {
  if (
    !obj.csat.enabled &&
    !obj.contact.enabled &&
    !obj.nps.enabled &&
    !obj.commentBox.enabled &&
    !obj.traceability?.enabled
  )
    return new Yup.ValidationError('Active al menos un módulo', null, 'form')
  return true
})

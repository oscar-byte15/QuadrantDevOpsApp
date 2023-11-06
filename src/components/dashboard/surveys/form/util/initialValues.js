export const defaultCommentBoxQuestionListForOldSurveys = [
  {
    question: '',
    enabled: false,
    type: 'Felicitación'
  },
  {
    question: '',
    enabled: false,
    type: 'Sugerencia'
  },
  {
    question: '',
    enabled: false,
    type: 'Reclamo'
  }
]
export const defaultCommentBoxQuestionList = [
  {
    question: 'Estamos atentos a tus comentarios',
    enabled: false,
    type: 'Felicitación'
  },
  {
    question: 'Estamos atentos a tus sugerencias',
    enabled: false,
    type: 'Sugerencia'
  },
  {
    question: 'Estamos atentos a tu reclamo',
    enabled: false,
    type: 'Reclamo'
  }
]
const defaultNPSQuestion =
  'En una escala de 0 al 10 ¿Que tan probable es que nos recomiendes con tus amigos o familiares?'
let defaultNPSTranslation =
  'On a scale from 0-10, How likely are you to recommend us to a friend or colleage?'

const termsAndCondMessage =
  'De acuerdo a la Ley 29733 de Protección de Datos Personales, brindo mi consentimiento para el tratamiento de mis datos a NOMBRE DE LA EMPRESA para que se comuniquen conmigo. Para ejercer los derechos de supresión de mis datos, debo enviar un mail a CORREO@DELAEMPRESA.com'

export default {
  enabled: true,
  name: '',
  language: '',
  logoUrl: '',
  logo: '',
  traceability: {
    enabled: false,
    title: '',
    subtitle: '',
    questionList: []
  },
  welcome: {
    enabled: false,
    message: ''
  },
  csat: {
    enabled: false,
    scale: '',
    questionList: [],
    qtyShowed: 2
  },
  nps: {
    enabled: false,
    question: {
      question: defaultNPSQuestion,
      translate: defaultNPSTranslation
    },
    followup: {
      enabled: false,
      questionList: {
        detractors: {
          enabled: false,
          question: '¿En qué fallamos?'
        },
        neutrals: {
          enabled: false,
          question: 'Cómo podríamos mejorar?'
        },
        promoters: {
          enabled: false,
          question: '¿Qué fue lo que más te gustó?'
        }
      }
    }
  },
  rating: {
    enabled: false,
    commentEnabled: false,
    questionList: [
      {
        product: '',
        question: ''
      },
      {
        product: '',
        question: ''
      }
    ]
  },
  contact: {
    enabled: false,
    title: 'Mantengamos el contacto',
    contactFields: [],
    questionList: [],
    tyc: {
      enabled: false,
      tyc: termsAndCondMessage
    }
  },
  commentBox: {
    enabled: false,
    title: 'Estamos atentos a tus comentarios',
    questionList: defaultCommentBoxQuestionList,
    defaultEnabled: false,
    questionList: [
      {
        enabled: true,
        type: 'Felicitación',
        question: 'Estamos atentos a tus comentarios'
      },
      {
        enabled: true,
        type: 'Sugerencia',
        question: 'Estamos atentos a tus sugerencias'
      },
      {
        enabled: true,
        type: 'Reclamo',
        question: 'Estamos atentos a tu reclamo'
      }
    ]
  },
  farewell: {
    enabled: true,
    message: '¡Muchas gracias!'
  },
  redirect: {
    enabled: false,
    csatConditional: false,
    text: '',
    url: ''
  },
  options: {
    alternativeProgressBar: false,
    bigFont: false,
    incompleteAnswer: { enabled: true },
    timer: 0
  }
}

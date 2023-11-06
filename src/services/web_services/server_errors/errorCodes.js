module.exports = {
  SOMETHING_WENT_WRONG: {
    code: '000',
    message: 'Oops! something went wrong'
  },
  FIELD_MISSING: {
    code: '001',
    message: 'Field(s) missing'
  },
  FIELD_EXISTS: {
    code: '002',
    message: field => `${field} already exists`
  },
  WRONG_EMAIL_PASSWORD: {
    code: '003',
    message: 'Wrong email or password'
  },
  TOKEN_REQUIRED: {
    code: '004',
    message: 'Token required'
  },
  INVALID_TOKEN: {
    code: '005',
    message: 'Invalid token'
  },
  TOKEN_EXPIRED: {
    code: '006',
    message: 'Token expired'
  },
  WRONG_EMAIL_TOKEN: {
    code: '007',
    message: 'Wrong email or token'
  },
  FORBIDDEN: {
    code: '008',
    message: 'Forbidden'
  },
  ALREADY_EXISTS: {
    code: '009',
    message: 'Already exists'
  },
  WRONG_REF: {
    code: '010',
    message: field => `Wrong reference: ${field}`
  },
  WRONG_FIELD: {
    code: '011',
    message: field => `Invalid ${field}`
  },
  NOT_FOUND: {
    code: '012',
    message: element => `${element} not available`
  },
  WRONG_PASSWORD: {
    code: '013',
    message: 'Wrong password'
  },
  REPEATED_PASSWORD: {
    code: '014',
    message: 'Repeated password'
  },
  SURVEY_ANSWERED: {
    code: '015',
    message: 'Survey answered'
  },
  EXPIRED_LINK: {
    code: '016',
    message: 'Expired link'
  },
  SERVICE_DISABLED: service => ({
    code: '017',
    message: `${service} service disabled`
  }),
  UNIQUE_LINK_NOT_FOUND: {
    code: '018',
    message: 'Unique link not found'
  },
  INVALID_OPERATION: (service = '') => ({
    code: '019',
    message: `Invalid ${service} operation`
  }),
  UNAUTHORIZED_QUADRANT_CLIENT: {
    code: '020',
    message: "Your quadrant client doesn't have an active subscription"
  }
}

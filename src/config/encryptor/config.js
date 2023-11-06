import _ from 'lodash'
import jwtConfig from './jwt/jwt'

export default {
  encryptors: _.merge(jwtConfig)
}

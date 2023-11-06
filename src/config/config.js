import _ from 'lodash'
import sessionConfig from './session/session'
import encryptorsConfig from './encryptor/config'
import webServicesConfig from './web_services/web_services'
import webServicesV2Config from './web_services/web_services_v2'
import firebaseConfig from './firebase/firebase'

export default _.merge(
  sessionConfig,
  encryptorsConfig,
  webServicesConfig,
  webServicesV2Config,
  firebaseConfig
)

import * as firebase from 'firebase/app'
import config from '../../config/config'
import 'firebase/storage'

firebase.initializeApp(config.firebase)

export default firebase

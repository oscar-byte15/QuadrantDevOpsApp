const firebaseConfig =
  process.env.NODE_ENV === 'development'
    ? {
        apiKey: 'AIzaSyCQYrp43OjPAo3n6am9YqQXS_f3ZnySww0',
        authDomain: 'quadrant-test.firebaseapp.com',
        databaseURL: 'https://quadrant-test.firebaseio.com',
        projectId: 'quadrant-test',
        storageBucket: 'quadrant-test.appspot.com',
        messagingSenderId: '102446598472',
        appId: '1:102446598472:web:2f7d8cf05fbd0881'
      }
    : {
        apiKey: 'AIzaSyCQYrp43OjPAo3n6am9YqQXS_f3ZnySww0',
        authDomain: 'quadrant-test.firebaseapp.com',
        databaseURL: 'https://quadrant-test.firebaseio.com',
        projectId: 'quadrant-test',
        storageBucket: 'quadrant-test.appspot.com',
        messagingSenderId: '102446598472',
        appId: '1:102446598472:web:2f7d8cf05fbd0881'
      }

export default {
  firebase: firebaseConfig
}

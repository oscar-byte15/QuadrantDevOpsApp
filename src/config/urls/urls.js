const surveysUrl =
  process.env.REACT_APP_ENV === 'dev' ? 'http://localhost:3000/' : 'http://qr.qudrnt.com/'

export default {
  urls: {
    SURVEYS: surveysUrl
  }
}

import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/work-sans/500.css'
import '@fontsource/work-sans/800.css'
import '@fontsource/josefin-sans/700.css'
import '@fontsource-variable/archivo'

import Theme from 'quadrantTheme'

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()

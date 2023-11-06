import { createTheme } from '@mui/material/styles'
import { esES as coreES } from '@mui/material/locale'
import { esES as dataGridES } from '@mui/x-data-grid-pro'
import { es, enAu } from 'moment/locale/es'

const Theme = createTheme({
  palette: {
    text: {
      primary: '#343434'
    },
    primary: {
      main: '#484C96'
    },
    secondary: {
      main: '#47bb5c'
    },
    blue: {
      main: '#355691'
    },
    gray: {
      main: 'rgba(0, 0, 0, 0.08)'
    },
    success: {
      main: '#47bb5c'
    },
    error: {
      main: '#ff7750'
    },
    info: {
      main: '#ADADAD'
    },
    red: {
      main: '#ff7750'
    },
    yellow: {
      main: '#ffc814'
    },
    green: {
      main: '#47bb5c'
    },
    white: {
      main: '#ffffff'
    },
    black: {
      main: '#343434'
    }
  },
  typography: {
    // fontSize: 16
  },
  shape: {
    borderRadius: 6
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    backDrop: 1250,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  },
  components: {
    MuiCard: {
      defaultProps: {
        variant: 'outlined',
        sx: { overflow: 'inherit!important' }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  },
  coreES,
  dataGridES,
  es,
  enAu
})
export default Theme

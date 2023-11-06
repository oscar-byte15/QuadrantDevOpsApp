import React from 'react'
import TextField from '../../common/controlledTextField'
const WelcomeModule = () => (
  <>
    <TextField
      name="welcome.message"
      label="Mensaje de Bienvenida"
      multiline
      autoComplete="off"
      rows="5"
      helper="Este mensaje se mostrará antes de iniciar la encuesta."
    />
  </>
)
export default WelcomeModule

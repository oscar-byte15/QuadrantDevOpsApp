import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardHeader,
  CardContent
} from '@mui/material'
import httpModule from 'services/httpModule'
import ModalButton from 'components/modal/modalButton'

const json = [
  {
    title: 'Reporte Comercial Bruno Alatrista Cano',
    slug: 'bruno',
    executives: [
      'FERNANDO BERTHING LAZO SANTOS',
      'FIORELLA SILVIA TENORIO PRADO',
      'WASHINGTON CHACNAMA AUQUITAYASI',
      'JORGE JUNIOR ALDANA RAMOS',
      'JOSE MARTIN ROMERO MENDOZA',
      'JULIO CESAR LOPEZ FERNANDEZ',
      'KATHERINE FIORELLA ORTIZ FLORES',
      'LESLIE SAMANTHA ALLISON CASTELLANOS ALVA',
      'MARIA XIMENA ARRONEZ FLORES',
      'MERCY ROSARIO GOMEZ LOPEZ',
      'MILAGROS XIOMARA SERRANO OROZ',
      'NIVALDO WILMER MONTES ALVARADO',
      'PAMELA KEITH VASQUEZ DURAND',
      'RICARDO JESUS SALAS DUEÑAS'
    ]
  },
  {
    title: 'Reporte Comercial Enrique Ramirez Chavez',
    slug: 'enrique',
    executives: [
      'GERONIMO LUIS ADAN COLONIO MUÑOZ',
      'ALICIA VERONICA LEGUA GOMEZ',
      'CAROL BRIGUITTE MEDINA HERNANDEZ',
      'LUIS ENRIQUE VIDALON MEZA',
      'PEDRO CORREA PEÑA',
      'JHONNY MARCOS BARRERA ZAVALETA',
      'MARTIN EMILIO HUERTA FLORES',
      'RODRIGO MARTIN CELIO ARISTA',
      'ENRIQUE MANUEL PACHAS ALIAGA',
      'BERTHA HELEN FLORES GIRALDO',
      'JESUS VICTORIA MARIA HERNANDEZ LEON',
      'ROSANA YANAHINA RUIZ AREVALO',
      'ERCILIA BEATRIZ ZAVALETA ZAVALETA',
      'DANIEL ISIDORO DIAZ ROSAS',
      'LUIGGI ANDRE GARCIA BALTA',
      'FERNANDO MIGUEL CORDOVA ECHEVARRIA',
      'RICARDO MALDONADO SALCEDO',
      'STEVEN SALOMON MANRIQUE SILVA',
      'PAUL ERICSON HUAMAN LLERENA',
      'SILVIA YSELA ZARATE CASTILLO',
      'NINOZKA ESCUDERO QUINTANA',
      'ELIZABETH LOURDES URRUTIA NUÑEZ',
      'JULIO MIGUEL ESPINEL SOSAYA'
    ]
  },
  {
    title: 'Reporte Comercial Gino García Salas',
    slug: 'gino',
    executives: [
      'BRENDA MERCEDES AREVALO ANDRADE',
      'JOSE LUIS GUERRERO PADILLA',
      'ENRIQUE ALEJANDRO NUÑEZ QUIJAITE',
      'ALDO JUNIOR CASTILLO BARZOLA',
      'JUAN MANUEL FLORES CASTRO',
      'CLAUDIA ANDREA HUAPAYA LAMAS',
      'VANESSA CONSUELO VARGAS VARGAS',
      'HANS EMILIO PINEDA DEL RIO',
      'HERNAN WILFREDO JUNIOR',
      'POZO TASCCA',
      'DAVID GODOFREDO HURTADO ROJAS',
      'GUSTAVO ADOLFO MANRIQUE SOSA',
      'CARLOS ANDRES NOVOA SEMINARIO',
      'ANDY THOMAS CRIOLLO SAMANIEGO',
      'JOSE MARTIN VERA VASQUEZ',
      'KENYI ALLEN CHUNG BENITES',
      'DALI MILENA BUSTAMANTE ABANTO',
      'JAIME ENRIQUE SOLIS OLIVOS',
      'LOURDES ROCIO SAAVEDRA ARBAIZA',
      'ELIZABETH ERIKA MORALES CHAU',
      'ANGELICA VANESA YOPLA JULIAN',
      'GIOBANA DEL PILAR MIYAMOTO FLORES',
      'ADA CECILIA ZEGARRA CRUZ',
      'FATIMA MELISSA CACERES CERVERA',
      'MARIA DEL ROSARIO VILCA LAZO DE CHAVEZ'
    ]
  },
  {
    title: 'Reporte Comercial Maribel Junco Leyva',
    slug: 'maribel',
    executives: [
      'KARINA GUARDAMINO FLORES',
      'ALDO MORRIBERON BRAVO',
      'CLAUDIA ELIZABETH VALERA ACEVEDO',
      'MARIO HERNAN PARIONA HUAMAN',
      'ERICK RAFAEL PEREZ MASGO',
      'RAFAEL GERARDO ENCISO TENORIO',
      'JAHMIL ANDRE SEVILLANO CORREA'
    ]
  },
  {
    title: 'Reporte Comercial Miluska Neira Zacarias',
    slug: 'miluska',
    executives: [
      'ASTRID CAROLINA SAKATA CARRASCO',
      'MARIA DEL ROSARIO ORE GONZALEZ',
      'ANA LUISA GOMEZ MENDEZ',
      'CARLA JANET QUISPE HUAMANI',
      'JORGE DIEGO CASTAÑEDA CEDEÑO',
      'DANIEL ARTURO BENITES QUINTANA',
      'FERNANDO RAFAEL MARTINEZ CASTRO',
      'MAGALY ROCIO GONZALES MAMANI',
      'CARMEN LILIANA LUJAN LOZA'
    ]
  },
  {
    title: 'Reporte Comercial Richard Pereyra Vasquez',
    slug: 'richard',
    executives: [
      'JOSE LUIZ VELEZ VILCA',
      'VIOLETA GERALDINE RAMOS ARIAS',
      'DAVID TERRAZAS TAPIA',
      'PAOLA GEORGINA BRAVO LEVANO',
      'JAIRO GIANCARLO MARINO OLAZABAL',
      'ANTUANE MANUYAMA MACEDO',
      'SINTYA KARINA MONTALVO PAULLA',
      'DIEGO HUERTAS GONZALES CUENCA',
      'JOSE MANUEL PASCO LEON',
      'YARITZA MARYORI GARAY CAIRA',
      'ROXANNA PATRICIA VALLE PAULINO',
      'ISABEL EMPERATRIZ MARIN SANDOVAL',
      'JAIRO RODOLFO TICERAN CABEZUDO',
      'MARCIA VICTORIA ALVITES FERNANDEZ',
      'ANTONIO RAFAEL BERMUDEZ JIMENEZ',
      'MARCO ANTONIO CACERES PARISACA',
      'CLAUDIA FIORELLA MOLINA DELGADO',
      'JOSELYN HUERTAS PATIÑO',
      'ALICIA DE JESUS SALAS BAELLA',
      'NATALY GRACE ALARCON MORALES',
      'DANIEL JEREMY DE LA CRUZ LAZARTE',
      'JEISON AYALA BARAZORDA',
      'CARLOS ENRIQUE SAYAN ALVARADO',
      'MIGUEL ANGEL CARCAMO GOMEZ',
      'SERGIO HONAPPAZ JIMENEZ GUIZADO',
      'MARVIN HEBERT COSTILLA FERNANDEZ',
      'JOSE ENRIQUE LEON RAMOS',
      'CARLOS ALBERTO ALANIZ COLAN'
    ]
  }
]

export default function Custom() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) {
      httpModule.get('/v1/quadrantClient/config/custom').then(res => {
        document.getElementById('config').value = JSON.stringify(res.data.custom || json, null, 4)
      })
    }
  }, [open])

  const handleSave = e => {
    try {
      e.preventDefault()
      const values = Object.fromEntries(new FormData(e.target))
      values.config = JSON.parse(values.config)
      httpModule.post('/v1/quadrantClient/config/custom', { ...values }).then(() => {
        alert('Se guardó la configuración correctamente')
        closeModal()
      })
    } catch (e) {
      alert('JSON no válido')
    }
  }
  const closeModal = () => setOpen(false)
  const openModal = () => setOpen(true)

  return (
    <Card variant="outlined">
      <CardHeader title="Configuración custom" subheader="Editar configuración custom" />
      <CardContent>
        <ModalButton
          open={open}
          variant="contained"
          handleClose={closeModal}
          handleOpen={openModal}
          text={'Editar configuración'}
        >
          <form onSubmit={handleSave}>
            <DialogTitle>Configuración de reportes custom</DialogTitle>
            <DialogContent dividers>
              <TextField fullWidth id="config" name="config" multiline />
            </DialogContent>
            <DialogActions>
              <Button type="submit">Guardar configuración</Button>
            </DialogActions>
          </form>
        </ModalButton>
      </CardContent>
    </Card>
  )
}

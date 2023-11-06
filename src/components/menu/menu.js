import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { menuToggle, selectOption } from 'redux/actions/menu/actionDispatcher'
import { signOut } from 'redux/actions/auth/actionDispatcher'
import { changeFilterOptions } from 'redux/actions/filter/actionDispatcher'
import {
  Drawer,
  List,
  Divider,
  ListItem,
  Avatar,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Collapse,
  Typography,
  Stack,
  SwipeableDrawer,
  ListItemButton,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import MENU_OPTIONS from './menuSections'
import ADMIN_OPTIONS from './menuAdminOptions'
import {
  ChevronUp as ChevronUpIcon,
  ChevronDown as ChevronDownIcon,
  CheckSquare as Custom,
  FileText
} from 'react-feather'
import httpModule from 'services/httpModule'
import { stubTrue } from 'lodash'
import { Close } from '@mui/icons-material'

export default function Menu() {
  const dispatch = useDispatch()
  const history = useHistory()
  const menu = useSelector(state => state.menu)
  const auth = useSelector(state => state.auth)
  const theme = useTheme()

  let avatarLetters = ''
  const nameSplit = auth.name.split(' ')
  for (let i = 0; i < nameSplit.length && i < 2; i++) avatarLetters += nameSplit[i][0]
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false)
  const [btnOpen, setBtnOpen] = useState(null)
  const [isPinkberry, setIsPinkberry] = useState(false)

  useEffect(() => {
    if (auth.quadrantClient.id === '6345d490fcf7ad2a6c2e61ca') {
      setIsPinkberry(true)
      MENU_OPTIONS.REPORT.subMenu.PINKBERRY = {
        id: 'pinkberryReport',
        buttonText: 'Reporte Pinkberry',
        icon: null,
        class: null
      }
    }

    return () => {
      setIsPinkberry(false)
      return (MENU_OPTIONS.REPORT = {
        id: 'report',
        // title: 'Reportes',
        buttonText: 'Reportes',
        icon: <FileText />,
        class: null,
        subMenu: {
          CSAT: {
            id: 'csat_report',
            // title: 'Reporte CSAT MENSUAL',
            buttonText: 'CSAT mensual',
            icon: null,
            class: null
          },
          NPS: {
            id: 'nps_report',
            // title: '',
            buttonText: 'NPS mensual',
            icon: null,
            class: null
          },
          QUADRANT: {
            id: 'quadrantReport',
            // title: 'Reporte CSAT MENSUAL',
            buttonText: 'Reporte de Encuesta',
            icon: null,
            class: null
          }
        }
      })
    }
  }, [auth])

  useEffect(() => {
    if (!auth.isSuperAdmin && auth.quadrantClient.id === '5e18d96a5579be3ce0000165') {
      const isAdmin = auth.roles.includes('ADMIN')

      MENU_OPTIONS.CUSTOM = {
        id: 'custom',
        buttonText: 'Reportes Custom',
        icon: <Custom />,
        subMenu: {}
      }

      httpModule.get('/v1/quadrantClient/config/custom').then(res => {
        res.data?.custom?.forEach(report => {
          if (auth.customRoles?.includes(report.slug) || isAdmin) {
            MENU_OPTIONS.CUSTOM.subMenu[report.slug] = {
              type: 'customReport',
              id: report.slug,
              buttonText: report.title,
              href: '/quadrant/custom/' + report.slug
            }
          }
        })
      })
    }

    return () => (MENU_OPTIONS.CUSTOM = null)
  }, [auth])

  const handleCollapsedBtnClick = itemId => {
    setBtnOpen(btnOpen === itemId ? null : itemId)
  }

  const handleDrawerToggle = () => {
    dispatch(menuToggle())
  }

  const handleCloseSignOutConfirmation = () => {
    setShowSignOutConfirmation(false)
  }

  const handleSignOut = () => {
    dispatch(
      signOut(() => {
        history.push('/')
      })
    )

    dispatch(
      changeFilterOptions({
        selectedGroups: [],
        selectedSurveys: []
      })
    )
  }

  const onItemClicked = item => {
    dispatch(selectOption(item.id))
    dispatch(handleDrawerToggle)

    if (!item.id) return

    if (item.type === 'customReport') {
      history.push(item.href)
    }

    if (isPinkberry) {
      switch (item.id) {
        case ADMIN_OPTIONS.CLIENTS.id:
          document.title = 'Super - Clientes'
          history.push('/admin/clients')

          break
        case ADMIN_OPTIONS.USERS.id:
          document.title = 'Super - Usuarios'
          history.push('/admin/users')
          break
        // COMENTAR ESTO PARA PODER ACCEDER A LA VISTA DE SURVEYS DESDE UN USUARIO REGULAR
        case ADMIN_OPTIONS.ALL_SURVEYS.id:
          document.title = 'Super - Surveys'
          history.push('/admin/surveyAdmin')
          break
        ///
        case ADMIN_OPTIONS.DEFAULT_QUESTIONS.id:
          // this.props.history.push('/admin/users')
          break
        case MENU_OPTIONS.HOME.id:
          document.title = 'Inicio - Quadrant Dashboard'
          history.push('/quadrant/home')

          break
        case MENU_OPTIONS.REPORT.subMenu.CSAT.id:
          document.title = 'Reporte Mensual CSAT - Quadrant Dashboard'
          history.push('/quadrant/report/csatreport')
          break
        case MENU_OPTIONS.REPORT.subMenu.NPS.id:
          document.title = 'Reporte Mensual NPS - Quadrant Dashboard'
          history.push('/quadrant/report/npsreport')
          break
        case MENU_OPTIONS.REPORT.subMenu.QUADRANT.id:
          document.title = 'Reporte Mensual Quadrant'
          history.push('/quadrant/surveyReport/quadrantReport')
          break
        case MENU_OPTIONS.REPORT.subMenu.PINKBERRY.id:
          document.title = 'Reporte Mensual Pinkberry'
          history.push('/quadrant/surveyReport/pinkberryReport')
          break
        // COMENTARIOS
        case MENU_OPTIONS.COMMENT_BOX.subMenu.COMMENT_MANAGEMENT.id:
          document.title = 'Gestor de Comentarios - Quadrant Dashboard'
          history.push('/quadrant/commentBox/management')

          break
        case MENU_OPTIONS.COMMENT_BOX.subMenu.TEXT_ANALYSIS.id:
          document.title = 'Análisis de Texto - Quadrant Dashboard'
          history.push('/quadrant/commentBox/textAnalysis')
          break

        // HERRAMIENTAS DE ANÁLISIS
        case MENU_OPTIONS.ANALYSIS.subMenu.CSAT_X_SURVEY.id:
          document.title = 'Análisis CSAT por Encuesta - Quadrant Dashboard'
          history.push('/quadrant/analysis/csatsurvey')
          break
        case MENU_OPTIONS.ANALYSIS.subMenu.CSAT_X_EVALUATION_GROUP.id:
          document.title = 'Análisis CSAT por Grupo - Quadrant Dashboard'
          history.push('/quadrant/analysis/csatevagroup')
          break
        case MENU_OPTIONS.ANALYSIS.subMenu.NPS_X_EVALUATION_GROUP.id:
          document.title = 'Análisis NPS por Grupo - Quadrant Dashboard'
          history.push('/quadrant/analysis/npsevagroup')
          break

        // RATING
        case MENU_OPTIONS.RATING.id:
          history.push('/quadrant/rating')
          break

        // HERRAMIENTAS DE GESTIÓN
        case MENU_OPTIONS.GROUPS.id:
          document.title = 'Gestión de Puntos - Quadrant Dashboard'
          history.push('/quadrant/groups')
          break
        case MENU_OPTIONS.SURVEYS.id:
          document.title = 'Gestión de Encuestas - Quadrant Dashboard'
          history.push('/quadrant/surveys')
          break
        case MENU_OPTIONS.LINKS.id:
          document.title = 'Gestión de Links - Quadrant Dashboard'
          history.push('/quadrant/links')
          break
        case MENU_OPTIONS.SETTINGS.subMenu.ACCOUNT.id:
          document.title = 'Ajustes de Cuenta - Quadrant Dashboard'
          history.push('/quadrant/settings/account')
          break
        case MENU_OPTIONS.SETTINGS.subMenu.NOTIFICATIONS.id:
          document.title = 'Centro de Notificaciones - Quadrant Dashboard'
          history.push('/quadrant/settings/notifications')
          break
        case MENU_OPTIONS.SETTINGS.subMenu.USERS.id:
          document.title = 'Ajustes de Organización - Quadrant Dashboard'
          history.push('/quadrant/settings/users')
          break

        case MENU_OPTIONS.SIGN_OUT.id:
          setShowSignOutConfirmation(true)
          break
        default:
      }
    } else {
      switch (item.id) {
        case ADMIN_OPTIONS.CLIENTS.id:
          document.title = 'Super - Clientes'
          history.push('/admin/clients')

          break
        case ADMIN_OPTIONS.USERS.id:
          document.title = 'Super - Usuarios'
          history.push('/admin/users')
          break
        // COMENTAR ESTO PARA PODER ACCEDER A LA VISTA DE SURVEYS DESDE UN USUARIO REGULAR
        case ADMIN_OPTIONS.ALL_SURVEYS.id:
          document.title = 'Super - Encuestas'
          history.push('/admin/surveyAdmin')
          break
        ///
        case ADMIN_OPTIONS.DEFAULT_QUESTIONS.id:
          // this.props.history.push('/admin/users')
          break
        case MENU_OPTIONS.HOME.id:
          document.title = 'Inicio - Quadrant Dashboard'
          history.push('/quadrant/home')

          break
        case MENU_OPTIONS.REPORT.subMenu.CSAT.id:
          document.title = 'Reporte Mensual CSAT - Quadrant Dashboard'
          history.push('/quadrant/report/csatreport')
          break
        case MENU_OPTIONS.REPORT.subMenu.NPS.id:
          document.title = 'Reporte Mensual NPS - Quadrant Dashboard'
          history.push('/quadrant/report/npsreport')
          break
        case MENU_OPTIONS.REPORT.subMenu.QUADRANT.id:
          document.title = 'Reporte Mensual Quadrant'
          history.push('/quadrant/surveyReport/quadrantReport')
          break

        // COMENTARIOS
        case MENU_OPTIONS.COMMENT_BOX.subMenu.COMMENT_MANAGEMENT.id:
          document.title = 'Gestor de Comentarios - Quadrant Dashboard'
          history.push('/quadrant/commentBox/management')

          break
        case MENU_OPTIONS.COMMENT_BOX.subMenu.TEXT_ANALYSIS.id:
          document.title = 'Análisis de Texto - Quadrant Dashboard'
          history.push('/quadrant/commentBox/textAnalysis')
          break

        // HERRAMIENTAS DE ANÁLISIS
        case MENU_OPTIONS.ANALYSIS.subMenu.CSAT_X_SURVEY.id:
          document.title = 'Análisis CSAT por Encuesta - Quadrant Dashboard'
          history.push('/quadrant/analysis/csatsurvey')
          break
        case MENU_OPTIONS.ANALYSIS.subMenu.CSAT_X_EVALUATION_GROUP.id:
          document.title = 'Análisis CSAT por Grupo - Quadrant Dashboard'
          history.push('/quadrant/analysis/csatevagroup')
          break
        case MENU_OPTIONS.ANALYSIS.subMenu.NPS_X_EVALUATION_GROUP.id:
          document.title = 'Análisis NPS por Grupo - Quadrant Dashboard'
          history.push('/quadrant/analysis/npsevagroup')
          break

        // RATING
        case MENU_OPTIONS.RATING.id:
          history.push('/quadrant/rating')
          break

        // HERRAMIENTAS DE GESTIÓN
        case MENU_OPTIONS.GROUPS.id:
          document.title = 'Gestión de Puntos - Quadrant Dashboard'
          history.push('/quadrant/groups')
          break
        case MENU_OPTIONS.SURVEYS.id:
          document.title = 'Gestión de Encuestas - Quadrant Dashboard'
          history.push('/quadrant/surveys')
          break
        case MENU_OPTIONS.LINKS.id:
          document.title = 'Gestión de Links - Quadrant Dashboard'
          history.push('/quadrant/links')
          break
        case MENU_OPTIONS.SETTINGS.subMenu.ACCOUNT.id:
          document.title = 'Ajustes de Cuenta - Quadrant Dashboard'
          history.push('/quadrant/settings/account')
          break
        case MENU_OPTIONS.SETTINGS.subMenu.NOTIFICATIONS.id:
          document.title = 'Centro de Notificaciones - Quadrant Dashboard'
          history.push('/quadrant/settings/notifications')
          break
        case MENU_OPTIONS.SETTINGS.subMenu.USERS.id:
          document.title = 'Ajustes de Organización - Quadrant Dashboard'
          history.push('/quadrant/settings/users')
          break

        case MENU_OPTIONS.SIGN_OUT.id:
          setShowSignOutConfirmation(true)
          break
        default:
      }
    }
  }

  const getCollapsedButton = item => {
    return (
      <Fragment key={item.id}>
        <ListItemButton value={item.id} onClick={() => handleCollapsedBtnClick(item.id)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.buttonText}
            primaryTypographyProps={{
              sx: { fontSize: { xs: '1.1rem!important', sm: '0.9rem!important' } }
            }}
          />
          {btnOpen === item.id ? (
            <ChevronUpIcon strokeWidth={1} />
          ) : (
            <ChevronDownIcon strokeWidth={1} />
          )}
        </ListItemButton>
        <Collapse in={btnOpen === item.id} timeout="auto" unmountOnExit>
          <List>
            {Object.keys(item.subMenu).map(key => {
              let subMenu = item.subMenu[key]
              return getMenuButton(subMenu)
            })}
          </List>
        </Collapse>
      </Fragment>
    )
  }

  const getNormalButton = item => {
    return (
      <ListItemButton
        key={item.id}
        className={!item.icon ? 'nested' : ''}
        value={item.id}
        onClick={() => onItemClicked(item)}
        sx={{}}
      >
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText
          sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          primary={item.buttonText}
          primaryTypographyProps={{
            sx: {
              fontSize: { xs: '1.1rem!important', sm: '0.9rem!important' }
            }
          }}
        />
      </ListItemButton>
    )
  }

  const getMenuButton = item => {
    if (!item.perm_roles || auth.roles.some(r => item.perm_roles.includes(r))) {
      if (item.subMenu && Object.keys(item.subMenu).length > 0) {
        return getCollapsedButton(item)
      } else {
        return getNormalButton(item)
      }
    }
  }

  const drawerList = (
    <div className="drawer-list">
      <Stack
        sx={{
          padding: '1rem 1.2rem',
          '& p': {
            fontWeight: '400',
            lineHeight: '1.2',
            margin: '0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          },
          '& p:first-of-type': {
            fontWeight: '500',
            margin: '0.9rem 0 0.5rem 0'
          },
          '& p:last-of-type': {
            marginTop: '0.5rem'
          }
        }}
      >
        <Avatar>{avatarLetters}</Avatar>
        <Typography sx={{ fontSize: { xs: '1.1rem!important', sm: '1rem!important' } }}>
          {auth.name}
        </Typography>
        <Typography sx={{ fontSize: { xs: '1.1rem!important', sm: '1rem!important' } }}>
          {auth.quadrantClient.name}
        </Typography>
        <Typography sx={{ fontSize: { xs: '1.1rem!important', sm: '1rem!important' } }}>
          {auth.email}
        </Typography>
      </Stack>
      <Divider />
      <List>
        {auth.isSuperAdmin
          ? Object.keys(ADMIN_OPTIONS).map(key => {
              let item = ADMIN_OPTIONS[key]
              return (
                <ListItemButton key={item.id} value={item.id} onClick={() => onItemClicked(item)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.buttonText} />
                </ListItemButton>
              )
            })
          : Object.keys(MENU_OPTIONS)
              .filter(key => MENU_OPTIONS[key])
              .map(key => {
                let item = MENU_OPTIONS[key]
                return getMenuButton(item)
              })}
      </List>
    </div>
  )

  return (
    <>
      {useMediaQuery(theme.breakpoints.up('md')) ? (
        <Drawer
          variant="permanent"
          anchor={'left'}
          hideBackdrop={true}
          ModalProps={{
            keepMounted: true
          }}
          PaperProps={{ elevation: 0, sx: { width: '200px!important' } }}
        >
          {drawerList}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          anchor={'left'}
          open={menu.open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              // width: '90%'
            }
          }}
        >
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{ padding: '1rem 1.2rem 0rem 1.2rem' }}
          >
            <IconButton size="large" onClick={handleDrawerToggle}>
              <Close fontSize="large" />
            </IconButton>
          </Stack>
          {drawerList}
        </Drawer>
      )}

      <Dialog open={showSignOutConfirmation} onClose={handleCloseSignOutConfirmation}>
        <DialogTitle>Cerrar sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estas seguro que deseas salir de Quadrant?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSignOutConfirmation} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSignOut} color="primary">
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

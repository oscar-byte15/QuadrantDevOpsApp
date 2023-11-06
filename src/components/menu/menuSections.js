import React from 'react'
import UserRoles from '../../constants/userRoles'

import {
  Home,
  Box as BoxIcon,
  FileText,
  Thermometer,
  Settings,
  LogOut,
  Mail,
  Link,
  Star
} from 'react-feather'

const MENU_OPTIONS = {
  HOME: {
    id: 'home',
    // title: 'Inicio',
    buttonText: 'Inicio',
    icon: <Home />,
    class: null
  },
  REPORT: {
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
  },
  CUSTOM: undefined,
  COMMENT_BOX: {
    id: 'commentBox',
    // title: 'Buzón de Comentarios',
    buttonText: 'Comentarios',
    icon: <Mail />,
    class: null,
    subMenu: {
      COMMENT_MANAGEMENT: {
        id: 'comment_management',
        // title: 'Gestor de comentarios',
        buttonText: 'Gestor de comentarios',
        icon: null,
        class: null
      },
      TEXT_ANALYSIS: {
        id: 'text_analysis',
        // title: 'Análisis de texto',
        buttonText: 'Análisis de texto',
        icon: null,
        class: null
      }
    }
  },
  ANALYSIS: {
    id: 'analysis',
    // title: 'Análisis',
    buttonText: 'Indicadores',
    icon: <Thermometer />,
    class: null,
    subMenu: {
      CSAT_X_SURVEY: {
        id: 'csat_x_survey',
        // title: 'CSAT por Encuestas',
        buttonText: 'CSAT por Encuestas',
        icon: null,
        class: null
      },
      CSAT_X_EVALUATION_GROUP: {
        id: 'csat_x_evaluation_group',
        // title: 'CSAT por Grupos',
        buttonText: 'CSAT por Puntos',
        icon: null,
        class: null
      },
      NPS_X_EVALUATION_GROUP: {
        id: 'nps_x_evaluation_group',
        // title: 'NPS por Grupos',
        buttonText: 'NPS por Puntos',
        icon: null,
        class: null
      }
    }
  },
  RATING: {
    id: 'rating',
    buttonText: 'Valoraciones',
    icon: <Star />,
    class: null
  },
  GROUPS: {
    id: 'groups',
    // title: 'Puntos de Evaluación',
    buttonText: 'Puntos',
    icon: <BoxIcon />,
    class: null
  },
  SURVEYS: {
    id: 'surveys',
    // title: 'Encuestas',
    buttonText: 'Encuestas',
    icon: <FileText />,
    class: null
  },
  LINKS: {
    id: 'links',
    // title: 'Enlaces',
    buttonText: 'Links',
    icon: <Link />,
    class: null
  },
  SETTINGS: {
    id: 'settings',
    // title: 'Ajustes',
    buttonText: 'Ajustes',
    icon: <Settings />,
    class: null,
    subMenu: {
      USERS: {
        id: 'settings_users',
        // title: 'Organización',
        buttonText: 'Organización',
        icon: null,
        class: null,
        perm_roles: [UserRoles.ADMIN]
      },
      NOTIFICATIONS: {
        id: 'settings_notifications',
        // title: 'Centro de notificaciones',
        buttonText: 'Centro de notificaciones',
        icon: null,
        class: null,
        perm_roles: [UserRoles.ADMIN]
      },
      ACCOUNT: {
        id: 'settings_account',
        // title: 'Cuenta',
        buttonText: 'Cuenta',
        icon: null,
        class: null
      }
    }
  },
  SIGN_OUT: {
    id: 'sign_out',
    title: '',
    buttonText: 'Cerrar sesión',
    icon: <LogOut />,
    class: 'd-block d-sm-none'
  }
}

export default MENU_OPTIONS

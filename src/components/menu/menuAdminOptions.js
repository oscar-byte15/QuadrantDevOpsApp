import React from 'react'
import {
  Star as StarIcon,
  Users as UsersIcon,
  Book as BookIcon,
  Clock as ClockIcon,
  Globe as GlobeIcon,
  LogOut as LogOutIcon,
  List as ListIcon
} from 'react-feather'

const MENU_OPTIONS = {
  CLIENTS: {
    id: 'clients',
    title: 'Clientes',
    buttonText: 'Clientes',
    icon: <StarIcon />,
    class: null
  },
  USERS: {
    id: 'users',
    title: 'Usuarios',
    buttonText: 'Usuarios',
    icon: <UsersIcon />,
    class: null
  },
  DEFAULT_QUESTIONS: {
    id: 'default_questions',
    title: 'Banco de preguntas',
    buttonText: 'Banco de preguntas',
    icon: <BookIcon />,
    class: null
  },
  ALL_SURVEYS: {
    id: 'all_surveys',
    title: 'Surveys',
    buttonText: 'Encuestas',
    icon: <ListIcon />,
    class: null
  },
  SIGN_OUT: {
    id: 'sign_out',
    title: '',
    buttonText: 'Cerrar sesión',
    icon: <LogOutIcon />,
    class: 'd-block d-sm-none'
  }
}

export default MENU_OPTIONS

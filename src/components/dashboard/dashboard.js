import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Menu from '../menu/menu'
import Header from '../header/header'
import Footer from '../footer/footer'
import Filter from '../filter/filter'
import Backdrop from '../common/backdrop'
import { Container, Stack, Box } from '@mui/material'
import './dashboard.css'
import { useSelector } from 'react-redux'

export default function Dashboard() {
  const shouldShow = useSelector(state => state.filter.shouldShow)
  const isSuperAdmin = useSelector(state => state.auth.isSuperAdmin)

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: { xs: '67px', sm: '85px' },
          minHeight: { xs: 'Calc(100svh - 66px)', sm: 'Calc(100svh - 78px)' }
        }}
        className="dashboard-container"
      >
        <Menu />
        <Filter />
        <Header />
        <Backdrop />
        <Stack spacing={1} sx={{ paddingLeft: { xs: '0px', md: '200px' } }}>
          <Box
            sx={{
              // width: { xs: '100%', md: shouldShow ? 'Calc(100% - 282px)' : '100%' },

              width: '100%',
              minHeight: '100%'
            }}
          >
            <Switch>
              {ROUTES.map(route => (
                <Route key={route.path} {...route} />
              ))}
              <Redirect path="/" to={isSuperAdmin ? '/admin/clients' : '/quadrant/home'} />
            </Switch>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  )
}

const ROUTES = [
  {
    path: '/quadrant/home',
    component: lazy(() => import(/*webpackChunkName: "home"*/ './home/home'))
  },
  {
    path: '/quadrant/analysis',
    component: lazy(() => import(/*webpackChunkName: "analysis"*/ './analysis/analysis'))
  },
  {
    path: '/quadrant/groups',
    component: lazy(() => import(/*webpackChunkName: "groups"*/ './groups'))
  },
  {
    path: '/quadrant/rating',
    component: lazy(() => import(/*webpackChunkName: "ratings"*/ './rating'))
  },
  {
    path: '/quadrant/surveys',
    component: lazy(() => import(/*webpackChunkName: "surveys"*/ './surveys'))
  },
  {
    path: '/quadrant/report',
    component: lazy(() => import(/*webpackChunkName: "report"*/ './report'))
  },
  {
    path: '/quadrant/surveyReport/quadrantReport',
    component: lazy(() => import(/*webpackChunkName: "report"*/ './surveyReport'))
  },
  {
    path: '/quadrant/surveyReport/PinkberryReport',
    component: lazy(() => import(/*webpackChunkName: "report"*/ './surveyReport'))
  },
  {
    path: '/quadrant/custom',
    component: lazy(() => import(/*webpackChunkName: "custom"*/ './custom'))
  },
  {
    path: '/quadrant/commentBox',
    component: lazy(() => import(/*webpackChunkName: "commentBox"*/ './commentBox'))
  },
  {
    path: '/quadrant/links',
    component: lazy(() => import(/*webpackChunkName: "links"*/ './links/links'))
  },
  {
    path: '/quadrant/uniqueLinks',
    component: lazy(() => import(/*webpackChunkName: "uniqueLinks"*/ './links/uniqueLinks'))
  },
  {
    path: '/quadrant/settings',
    component: lazy(() => import(/*webpackChunkName: "settings"*/ './settings'))
  },
  {
    path: '/quadrant/knowledge',
    component: lazy(() => import(/*webpackChunkName: "knowdledge"*/ '../knowledge'))
  },
  {
    path: '/admin/',
    component: lazy(() => import(/*webpackChunkName: "admin"*/ '../admin/admin'))
  }
]

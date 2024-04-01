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
              <Redirect path="/" to={'/quadrant/home'} />
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
  }
]

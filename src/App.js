import React, { Component, lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './css/main.css'
import { isAuth } from './redux/actions/auth/actionDispatcher'
import { isDesktop, isMobile } from './redux/actions/app/actionDispatcher'
import { AuthRoute, AdminAuthRoute, NotAuthRoute } from './components/routes/authRoutes'
import ScrollToTop from './components/scrollToTop/scrollToTop'
import Snackbar from 'components/snackbar'
import Dashboard from './components/dashboard/dashboard'
import { LicenseInfo } from '@mui/x-data-grid-pro'

LicenseInfo.setLicenseKey(
  '1b885b2ee8a56c57df7ec3ccfbba115aT1JERVI6NjUyMDAsRVhQSVJZPTE3MTc0MTM1ODI4MzcsS0VZVkVSU0lPTj0x'
)

const CssHelper = lazy(() => import(/*webpackChunkName: "CssHelper"*/ 'components/utils/cssHelper'))
const Login = lazy(() => import(/*webpackChunkName: "Login"*/ './components/auth/login'))
const TelegramAuth = lazy(() =>
  import(/*webpackChunkName: "telegramAuth"*/ './components/auth/telegramAuth')
)

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //this.props.isAuth()
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
  }

  render() {
    return (
      <Suspense fallback={<div></div>}>
        {process.env.REACT_APP_ENV === 'dev' && <CssHelper />}
        <Snackbar />
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
         
              <Route path="/quadrant" component={Dashboard} />
              <Route path="/" component={Dashboard} />
              
              <Redirect from="*" to={'/'} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </Suspense>
    )
  }

  resize() {
    if (window.innerWidth < 576) this.props.isMobile()
    else this.props.isDesktop()
  }
}

export default connect(null, { isDesktop, isMobile, isAuth })(App)

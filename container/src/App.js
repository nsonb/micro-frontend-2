import React, {lazy, Suspense, useState, useEffect} from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { StylesProvider, createGenerateClassName} from '@material-ui/core/styles'

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
const DashboardLazy = lazy(() => import('./components/DashboardApp'))

import Progress from './components/Progress'
import Header from './components/Header'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

const history = createBrowserHistory()
// test deploy marketing
export default () => {
  const [isSignIn, setIsSignIn] = useState(false)

  useEffect(() => {
    if(isSignIn) {
      history.push('/dashboard')
    }
  }, [isSignIn])
  //
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header isSignIn={isSignIn} onSignOut={() => setIsSignIn(false)}/>
          <Suspense fallback={<Progress/>}>
            <Switch>
              <Route path='/auth'>
                <AuthLazy onSignIn={() => setIsSignIn(true)} />
              </Route>
              <Route path='/dashboard'>
                { !isSignIn && <Redirect to='/'/>}
                <DashboardLazy/>
              </Route>
              <Route path='/' component={MarketingLazy}/>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  )
}
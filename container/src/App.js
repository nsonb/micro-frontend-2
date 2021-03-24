import React, {lazy, Suspense, useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StylesProvider, createGenerateClassName} from '@material-ui/core/styles'

const MarketingLazy = lazy(() => import('./components/MarketingApp'))
const AuthLazy = lazy(() => import('./components/AuthApp'))
import Progress from './components/Progress'
import Header from './components/Header'

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

export default () => {
  const [isSignIn, setIsSignIn] = useState(false)

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header isSignIn={isSignIn}/>
          <Suspense fallback={<Progress/>}>
            <Switch>
              <Route path='/auth'>
                <AuthLazy onSignIn={() => setIsSignIn(true)}/>
              </Route>
              <Route path='/' component={MarketingLazy}/>
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  )
}
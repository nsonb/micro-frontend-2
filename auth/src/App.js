import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { StylesProvider, createGenerateClassName} from '@material-ui/core/styles'

import Signin from './components/Signin'
import Signup from './components/Signup'

const generateClassName = createGenerateClassName({
  productionPrefix: 'au'
})

export default ({history, onSignIn}) => {
  console.log('this is on',onSignIn)
  return (
    // test deploy auth
   <div>
     <StylesProvider generateClassName={generateClassName}>
       <Router history={history}>
        <Switch>
          <Route path='/auth/signin'>
            <Signin onSignIn={onSignIn}></Signin>
          </Route>
          <Route path='/auth/signup' component={Signup}>
            <Signup onSignIn={onSignIn}></Signup>
          </Route>
        </Switch>
       </Router>
     </StylesProvider>
   </div>
 )
}
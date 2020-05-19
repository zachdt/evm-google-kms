import React from 'react'

import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom'

import App from './App.js'
import Wallet from './components/Wallet.js'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App}/>

        <Route exact path='/wallet' component={Wallet} />
      </Switch>
    </Router>
  )
}

export default Routes
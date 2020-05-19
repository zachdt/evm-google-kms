import React from 'react'

import {BrowserRouter as Router, Switch, Routes, Redirect, Route} from 'react-router-dom'

const Routes = () => {
  return (
    <Router>
      <Route path='/' component={App}>
        <Route path='wallet' component={Login} />
      </Route>

    </Router>
  )
}
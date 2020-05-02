import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Landing from './components/Landing';
import Privacy from './components/Privacy';

const App = () =>
  <Router>
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/privacy">
        <Privacy />
      </Route>
    </Switch>
  </Router>


export default App
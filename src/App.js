import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join'
import Play from './components/Play'
import Create from './components/Create'
import Landing from './components/Landing'

const App = () => <Router>
  <Route path="/" exact component={Landing} />
  <Route path="/join" exact component={Join} />
  <Route path="/create" component={Create} />
  <Route path="/play" component={Play} />
</Router>

export default App
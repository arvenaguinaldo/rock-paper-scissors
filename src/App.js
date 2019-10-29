import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Player from './containers/Player/Player'
import Home from './containers/Home/Home'
import Computer from './containers/Computer/Computer'

function App() {
  return (
    <Router basename="rock-paper-scissors">
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/player" component={Player} />
          <Route path="/computer" component={Computer} />
        </Switch>
      </div>
    </Router>
  )
}

  export default App;

import React, { Component } from "react"
import Category from "./components/Category"
import Home from "./components/Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

class App extends Component {
  state = {
    resources: []
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:category" component={Category} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Main,CloudItemsMenu,LoginScreen} from "./containers"


class App extends Component {

  render(){

    return (
      <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/clouditems" component={CloudItemsMenu} />
        <Route exact path="/LoginScreen" component={LoginScreen} />
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Main,CloudItemsMenu,LoginScreen,Nav} from "./containers"


class App extends Component {

  render(){

    return (
      <Router>
        <Nav/>
        <Route exact path="/LoginScreen" component={LoginScreen} />
        <Route exact path="/" component={Main} />
        <Route exact path="/clouditems" component={CloudItemsMenu} />
      </Router>
    );
  }
}

export default App;

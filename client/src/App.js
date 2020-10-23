import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Main,CloudItemsMenu, Nav} from "./containers"


class App extends Component {

  render(){

    return (
      <div>
        <Router>
          <Nav/>
          <Route exact path="/" component={Main} />
          <Route exact path="/clouditems" component={CloudItemsMenu} />
        </Router>
      </div>
    );
  }
}

export default App;

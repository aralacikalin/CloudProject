import React, { Component } from 'react';
import {  HashRouter, Route } from 'react-router-dom'
import {Router} from 'react-router'
import {Main,CloudItemsMenu, Nav} from "./containers"


class App extends Component {

  render(){

    return (
      <div>
        <HashRouter>
          <Nav/>
          <Route exact path="/" component={Main} />
          <Route exact path="/clouditems" component={CloudItemsMenu} />
        </HashRouter>
      </div>
    );
  }
}

export default App;

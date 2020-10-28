import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Main,CloudItemsMenu, Nav} from "./containers"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {ip: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ip:event.target.value})
  }

  render(){

    return (
      <div>
        <Router>
          <Nav/>
          <input type="text" value={this.state.ip} onChange={this.handleChange} />
          <Route exact path="/" component={Main} />
          <Route exact path="/clouditems"  children={<CloudItemsMenu ip={this.state.ip}/>} />
        </Router>
      </div>
    );
  }
}

export default App;

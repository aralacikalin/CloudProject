import React, { Component } from 'react';
import logo from '../../logo.svg';
import './main.css';

class Main extends Component {
  constructor(props){
    super(props)
    this.state={
      uploadedFile:null
    }
  }

  render(){

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome To cHub
          </p>
        </header>
      </div>
    );
  }
}

export default Main;

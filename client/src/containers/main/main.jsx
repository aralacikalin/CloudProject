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
          <div className="App-Explanation">
            You can upload files to, download files from the storage 
            and even command to download files from internet to the storage for later use 
          </div>
          <div className="App-Tip">
            (for more information visit the pages)
          </div>
        </header>
      </div>
    );
  }
}

export default Main;

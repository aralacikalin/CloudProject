import React, { Component } from 'react';
import logo from '../../logo.svg';
import './main.css';

class Main extends Component {
  constructor(props){
    super(props)
    this.state={
      uploadedFile:null
    }
    this.onFileChange=this.onFileChange.bind(this);
    this.onFileUpload=this.onFileUpload.bind(this);
  }

  onFileChange(event){
    this.setState({ uploadedFile: event.target.files[0] }); 

  }
  async onFileUpload(){
    //fetch("upload",{method:"POST",body:this.state.uploadedFile})
    const data=new FormData()
    console.log(this.state.uploadedFile)
    data.append("file",this.state.uploadedFile)

    console.log(data)
    await fetch("http://localhost:4000/upload",{method:"POST",body:data,credentials: 'include'})
  }
  render(){

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <input type="file" onChange={this.onFileChange} /> 
                <button onClick={this.onFileUpload}> 
                  Upload! 
                </button> 
      </div>
    );
  }
}

export default Main;

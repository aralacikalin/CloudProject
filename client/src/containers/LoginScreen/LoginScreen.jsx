import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class LoginScreen extends Component {
        constructor(props){
            super(props);
            this.state={
                username:'',
                password:''
            }
       }
       async handleClick(event){
            var apiBaseUrl = "http://localhost:4000/userinfo";
            var self = this;
            var payload={
                "email":this.state.username,
                "password":this.state.password
            }
            fetch(apiBaseUrl,{method:"post",body:payload}).then(async response => {
                const data = await response.json();
                
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
    
                this.setState({ totalReactPackages: data.total })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
        }

      render() {
          return (
            <div>
              <MuiThemeProvider>
                <div>
                <AppBar
                   title="Login"
                 />
                 <TextField
                   hintText="Enter your Username"
                   floatingLabelText="Username"
                   onChange = {(event,newValue) => this.setState({username:newValue})}
                   />
                 <br/>
                   <TextField
                     type="password"
                     hintText="Enter your Password"
                     floatingLabelText="Password"
                     onChange = {(event,newValue) => this.setState({password:newValue})}
                     />
                   <br/>
                   <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
               </div>
               </MuiThemeProvider>
            </div>
          );
        }
      }
      const style = {
       margin: 15,
      };

export default LoginScreen;

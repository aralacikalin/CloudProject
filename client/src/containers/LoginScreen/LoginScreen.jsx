import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      open: false,
      isLoggedin:false
    }
  }

  handleClose = () => {
    this.setState({ open: false })
  };
  async handleClick(event) {
    var apiBaseUrl = "/login/authenticate";
    var self = this;
    var payload = {
      username: this.state.username,
      password: this.state.password
    }
    fetch(apiBaseUrl, { method: "POST", credentials: 'include', headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), }).then(async response => {
      const data = await response.json();
      console.log(data.flag);
      if (!response.ok) {
        this.setState({ open: true })
      } else {
        //TODO Change the view
        this.setState({isLoggedin:true})
      }

      this.setState({ totalReactPackages: data.total })
    })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  async handleTest(){
    await fetch("http://localhost:4000/login",{credentials: 'include'})
  }

  render() {
    return (
      <div>
        {this.state.isLoggedin?(<Redirect to="/" />):(null)}
        <MuiThemeProvider>
          <div>
            <AppBar
              title="Login"
            />
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            <RaisedButton label="test" primary={true} style={style} onClick={(event) => this.handleTest()} />
            <Dialog
              open={this.state.open}
              TransitionComponent={Transition}
              keepMounted
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Wrong username or password
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
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

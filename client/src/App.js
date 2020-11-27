
import { createMuiTheme,  ThemeProvider } from '@material-ui/core/styles';
import {DarkTheme} from "./themes/darkTheme.json"
import {LightTheme} from "./themes/lightTheme.json"
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Main,CloudItemsMenu,LoginScreen,Nav} from "./containers"
import { Button } from '@material-ui/core';


class App extends Component {
  constructor(props){
    super(props)

    this.state={
      isDarkTheme:true,
      theme:this.darkTheme
    }
    this.themeChanger=this.themeChanger.bind(this)
  }

  darkTheme = createMuiTheme( DarkTheme
    /*
    {
    
    palette: {
      type:"dark",
      primary: {main:"#90caf9"},
      
    }
    
  }
  */
 );
 lightTheme=createMuiTheme(LightTheme)

 themeChanger(){
   this.setState({isDarkTheme:!this.state.isDarkTheme},()=>{

    this.setState({theme:this.state.isDarkTheme?createMuiTheme(DarkTheme):createMuiTheme(LightTheme)})
   })

 }

  render(){

    return (
      <Router>
        <ThemeProvider theme={this.state.theme}>
          <Nav themeController={this.themeChanger}/>
          <Route exact path="/LoginScreen" component={LoginScreen} />
          <Route exact path="/" component={Main} />
          <Route exact path="/clouditems" component={CloudItemsMenu} />
      </ThemeProvider>
        </Router>
    );
  }
}

export default App;

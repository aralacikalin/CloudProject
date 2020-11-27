
import { createMuiTheme,  ThemeProvider } from '@material-ui/core/styles';
import { indigo,cyan } from '@material-ui/core/colors';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Main,CloudItemsMenu,LoginScreen,Nav} from "./containers"


class App extends Component {

  theme = createMuiTheme({
    palette: {
      type:"dark",
      primary: {main:"#90caf9"},
      
    }
  });

  render(){

    return (
      <Router>
        <ThemeProvider theme={this.theme}>
          <Nav/>
          <Route exact path="/LoginScreen" component={LoginScreen} />
          <Route exact path="/" component={Main} />
          <Route exact path="/clouditems" component={CloudItemsMenu} />
      </ThemeProvider>
        </Router>
    );
  }
}

export default App;


import { createMuiTheme,  ThemeProvider } from '@material-ui/core/styles';
import {DarkTheme} from "./themes/darkTheme.json"
import {LightTheme} from "./themes/lightTheme.json"
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import {Main,CloudItemsMenu,LoginScreen,Nav, RemoteCommand} from "./containers"


class App extends Component {
  constructor(props){
    super(props)

    this.state={
      isDarkTheme:true,
      theme:this.darkTheme,
      isLoggedIn:null
    }
    this.themeChanger=this.themeChanger.bind(this)
    this.onLogin=this.onLogin.bind(this)
    this.onLogout=this.onLogout.bind(this)



  }



  async componentDidMount(){
    await fetch("/checkauth").then((res)=>{
      if(res.ok){
        this.setState({isLoggedIn:true})
        
      }
      else{
        this.setState({isLoggedIn:false})

      }
    })
  }
  

  onLogin(){

    this.setState({isLoggedIn:true})
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

 async onLogout(){
  await fetch("/logout").then(res=>{
    if(res.ok){
      this.setState({isLoggedIn:false})
    }
  })
 }

  render(){

    if(this.state.isLoggedIn==null){
      return(null)
    }

    return (
      <Router>
        <ThemeProvider theme={this.state.theme}>
          {this.state.isLoggedIn?<Nav themeController={this.themeChanger} onLogout={this.onLogout}/>:null}
          {/*this.state.isLoggedIn?<Redirect to="home"/>:<Redirect to="/login"/>*/}
          <Route exact path="/login" render={(props)=>(<LoginScreen {...props} onLogin={this.onLogin}/>)} />
          <Route exact path="/home" component={Main} />
          <Route exact path="/clouditems" component={CloudItemsMenu} />
          <Route exact path="/Remote" component={RemoteCommand} />
      </ThemeProvider>
        </Router>
    );
  }
}

export default App;

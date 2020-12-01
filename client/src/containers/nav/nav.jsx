import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Avatar, Button } from '@material-ui/core';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Nav extends Component {

    constructor(props){
        super(props)
        this.state={
            value:null,
            username:null
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleRedirect=this.handleRedirect.bind(this);
        this.parseJwt=this.parseJwt.bind(this);
    }

    async componentDidMount(){
        if(window.location.pathname==="/home"){
            this.setState({value:0})
        }
        else if(window.location.pathname==="/clouditems"){
            this.setState({value:1})
        }

        var userID=this.parseJwt(document.cookie).sub
        console.log(userID)
        await fetch(`/userinfo/${userID}`).then(res=>{
            if(res.ok){
                res.json().then(data=>{this.setState({username:data.username})})
            }
        })
    }

    parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    handleChange(event,newValue){
        this.setState({value:newValue})
        
    }

    handleRedirect(){
        if(this.state.value===0){
            return(<Redirect to="/home"/>)
        }
        else if(this.state.value===1){
            return(<Redirect to="/clouditems"/>)

        }
        else{
            return(null)
        }
    }

    render(){

        return (
            <Paper square>
            <Tabs
                value={this.state.value|undefined}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChange}
                scrollButtons="on"
                variant="scrollable"
            >
            <Tab label="Main" />
            <Tab label="Cloud" />
            <div style={{marginLeft:"auto",marginTop:"auto",marginBottom:"auto",display:"flex",flexDirection:"row"}}>
                <div style={{margin:"auto",padding:"6px 8px"}}>{this.state.username}</div>
                <Button style={{margin:"auto"}} onClick={this.props.onLogout} ><ExitToAppIcon/> </Button>
                <Button style={{margin:"auto"}} onClick={this.props.themeController} ><Brightness7Icon/> </Button>
            </div>
            </Tabs>
            {this.handleRedirect()}
        </Paper>
        );
    }
}

export default Nav;

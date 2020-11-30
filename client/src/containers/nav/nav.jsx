import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button } from '@material-ui/core';
import Brightness7Icon from '@material-ui/icons/Brightness7';

class Nav extends Component {

    constructor(props){
        super(props)
        this.state={
            value:null
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleRedirect=this.handleRedirect.bind(this);
    }

    componentDidMount(){
        if(window.location.pathname==="/home"){
            this.setState({value:0})
        }
        else if(window.location.pathname==="/clouditems"){
            this.setState({value:1})
        }
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
            <Button style={{marginLeft:"auto"}} onClick={this.props.themeController} ><Brightness7Icon/> </Button>
            </Tabs>
            {this.handleRedirect()}
        </Paper>
        );
    }
}

export default Nav;

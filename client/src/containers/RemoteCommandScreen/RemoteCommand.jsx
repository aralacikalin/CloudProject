
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

  
import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CssBaseline } from '@material-ui/core';



class RemoteCommand extends Component {
    ismounted=false
    constructor(props){
        super(props)

        this.state={}

    }

    useStyles =()=> makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        toolbar: {
          paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          ...theme.mixins.toolbar,
        },
        appBar: {
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
        appBarShift: {
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        menuButton: {
          marginRight: 36,
        },
        menuButtonHidden: {
          display: 'none',
        },
        title: {
          flexGrow: 1,
        },
        drawerPaper: {
          position: 'relative',
          whiteSpace: 'nowrap',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        drawerPaperClose: {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        },
        container: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        },
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 240,
        },
      }));


    classes = ()=> this.useStyles();

    fixedHeightPaper = clsx(this.classes.paper, this.classes.fixedHeight);


    render(){

        return (
            <div className={this.classes.root}>
                <CssBaseline/>
                <main className={this.classes.content}>
        <div className={this.classes.appBarSpacer} />
        <Container maxWidth="lg" className={this.classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <Paper className={this.fixedHeightPaper}>
                deneme1
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper className={this.fixedHeightPaper}>
                deneme2
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={this.classes.paper}>
                deneme3
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
            </div>
        );
    }
}

export default RemoteCommand;



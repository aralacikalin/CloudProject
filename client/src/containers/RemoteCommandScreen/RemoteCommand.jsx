
import React, { Component, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

  
import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CssBaseline, TextField, Typography } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
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
  form: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));




export default function RemoteCommand(props) {
    const classes=useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [key,setKey]=useState("")
    const [currentOption,setCurrentOption]=useState(1)
    const [url,setUrl]=useState("")
    useEffect(()=>{console.log(currentOption)},[currentOption])
    
    function onSendUrl(event){
      if(currentOption===1){
        JSON.stringify({url:url})
        fetch("/url",{method:"post",body:JSON.stringify({url:url}),headers:{ "Content-Type": "application/json" }}).then(res=>{
          if(res.ok){
            console.log("OK")
          }
        });

      }
      else if(currentOption===2){

      }
      else if(currentOption===3){

      }

      event.preventDefault()
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
              <div />
                <Container maxWidth="lg" className={classes.container}>
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Send Download Commands
                  </Typography>
                  <Typography variant="h4" align="center" color="textPrimary" paragraph>
                      Pick a method and provide the URL
                  </Typography>
                  <Typography variant="h6" align="center" color="textSecondary" paragraph>
                      Download: Provide a URL that triggers a download
                  </Typography>
                  <Typography variant="h6" align="center" color="textSecondary" paragraph>
                      List: Provide a web site and all downloadable links will be listed
                  </Typography>
                  <Typography variant="h6" align="center" color="textSecondary" paragraph>
                      Torrent: Provide a torrent link and it will be downloaded
                  </Typography>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} sm={6} md={8} lg={9}>
                      <form onSubmit={onSendUrl}>
                    <Paper className={classes.paper}>
                        <TextField id="filled-basic" onChange={event=>setUrl(event.target.value)} InputLabelProps={{shrink: true}} placeholder="Enter the URL" label="URL" variant="outlined" />
                    </Paper>
                      </form>
                  </Grid>
                  {/* Recent Deposits */}
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Paper className={classes.paper}>

                      <FormControl key={key} variant="standard" >
                      <InputLabel id="demo-controlled-open-select-label">Select Method</InputLabel>
                      <Select
                      
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={currentOption}
                        onChange={(event)=>{setCurrentOption(event.target.value)}}

                      >
                        <MenuItem value={1}>Download</MenuItem>
                        <MenuItem value={2}>List</MenuItem>
                        <MenuItem value={3}>Torrent</MenuItem>
                      </Select>
                    </FormControl>
                  </Paper>
                  </Grid>
                  {/* Recent Orders */}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      deneme3
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </main>
        </div>
    );

}




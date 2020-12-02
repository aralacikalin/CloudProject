
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
    useEffect(()=>{console.log(currentOption)},[currentOption])
    

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
              <div />
                <Container maxWidth="lg" className={classes.container}>
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Send Download Commands
                  </Typography>
                  <Typography variant="h5" align="center" color="textSecondary" paragraph>
                      (Explain the functionality and usage of this feature)
                  </Typography>
                <Grid container spacing={3}>
                  {/* Chart */}
                  <Grid item xs={12} sm={6} md={8} lg={9}>
                    <Paper className={classes.paper}>
                      <TextField id="filled-basic" InputLabelProps={{shrink: true}} placeholder="Enter the URL" label="URL" variant="outlined" />
                    </Paper>
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
                        <MenuItem value={1}>
                          First
                        </MenuItem>
                        <MenuItem value={2}>Ten</MenuItem>
                        <MenuItem value={3}>Twenty</MenuItem>
                        <MenuItem value={4}>Thirty</MenuItem>
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




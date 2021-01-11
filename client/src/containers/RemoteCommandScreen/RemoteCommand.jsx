
import React, { Component, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
  
import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ButtonBase, CssBaseline, TextField, Typography } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


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
  paperLink: {
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
    const [download,setDownload]=useState(false)
    const [downloadCount,setDownloadCount]=useState(0)
    const [notDownloading,setNotDownloading]=useState(false)
    const [isStarting,setIsStarting]=useState(false)
    const [torrentNotStarted,setTorrentNotStarted]=useState(false)
    const [links,setLinks]=useState([])
    const [isListing,setIsListing]=useState(false)
    const [listParent,setListParent]=useState("")
    useEffect(()=>{console.log(currentOption)},[currentOption])

    useEffect(() => {
      fetch("/downloadingCount").then(res=>(res.json())).then(data=>{setDownloadCount(data.count)})
    });
    
    function onSendUrl(event){
      if(currentOption===1){
        JSON.stringify({url:url})
        setIsStarting(true)
        fetch("/url",{method:"post",body:JSON.stringify({url:url}),headers:{ "Content-Type": "application/json" }}).then(res=>{
          if(res.ok){
            setDownload(true)
            setIsStarting(false)
          }
          else{
            setNotDownloading(true)
            setIsStarting(false)
          }
        });
        
      }
      else if(currentOption===2){
        setIsListing(true)
        setListParent(url)
        setLinks([])
        fetch("/listlinks",{method:"post",body:JSON.stringify({url:url}),headers:{ "Content-Type": "application/json" }}).then(res=>{
          if(res.ok){
            setIsListing(false)
            return(res.json())
          }
          else{
            setIsListing(false)
          }
        }).then(data=>{setLinks(data)})
        
      }
      else if(currentOption===3){
        setIsStarting(true)
        fetch("/torrent",{method:"post",body:JSON.stringify({url:url}),headers:{ "Content-Type": "application/json" }}).then(res=>{
          if(res.ok){
            setDownload(true)
            setIsStarting(false)
          }
          else{
            setTorrentNotStarted(true)
            setIsStarting(false)
          }
        })

      }

      event.preventDefault()
    }

    function onListItemClick(index,itemUrl){
      setIsStarting(true)
      fetch("/downloadlist",{method:"post",body:JSON.stringify({url:itemUrl,index:index}),headers:{ "Content-Type": "application/json" }}).then(res=>{
        if(res.ok){
          setDownload(true)
          setIsStarting(false)
        }
        else{
          setTorrentNotStarted(true)
          setIsStarting(false)
        }
      })


    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
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
                  <Typography variant="h7" align="center" color="textSecondary" paragraph>
                      (Currently only 2 dowloads can occur at the same time!)
                  </Typography>
                <Grid container spacing={3}>
                  {/*Download Count*/}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      Current Ongoing Downloads: {downloadCount}
                    </Paper>
                  </Grid>
                  {/*URL Input Field */}
                  <Grid item xs={12} sm={6} md={8} lg={9}>
                      <form onSubmit={onSendUrl}>
                    <Paper className={classes.paper}>
                        <TextField id="filled-basic" onChange={event=>setUrl(event.target.value)} InputLabelProps={{shrink: true}} placeholder="Enter the URL" label="URL" variant="outlined" />
                    </Paper>
                      </form>
                  </Grid>
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
                  {/* List of downloadable links when its selected as a option*/}
                  {/*can map this grid for the list*/}
                  {links&&links.length>0?(
                    <Grid item xs={12}>
                      <Paper className={classes.paper}>
                        Links on: {listParent}
                      </Paper>
                    </Grid>
                  ):(null)}
                  {links&&links.length>0?(
                    links&&links.map((item,index)=>(
                      <Grid key={index} item xs={12}>
                      <Paper  onClick={()=>onListItemClick(index,item)} className={classes.paperLink}>
                        <Button>{item}</Button>
                      </Paper>
                    </Grid>
                    ))

                  ):(null)}

                </Grid>
                <Snackbar open={download} autoHideDuration={6000} onClose={()=>{setDownload(false)}}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
                  <MuiAlert onClose={()=>{setDownload(false)}} severity="success" elevation={6} variant="standard" color="success">
                    Download Started Successfully!
                  </MuiAlert>
                </Snackbar>
                <Snackbar open={notDownloading} autoHideDuration={6000} onClose={()=>{setNotDownloading(false)}}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
                  <MuiAlert onClose={()=>{setNotDownloading(false)}} severity="error" elevation={6} variant="standard" color="error">
                    Download Failed to Start!
                  </MuiAlert>
                </Snackbar>
                <Snackbar open={torrentNotStarted} autoHideDuration={7000} onClose={()=>{setTorrentNotStarted(false)}}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
                  <MuiAlert onClose={()=>{setTorrentNotStarted(false)}} severity="error" elevation={6} variant="standard" color="error">
                    Torrent Download May not have Started!
                  </MuiAlert>
                </Snackbar>
                <Snackbar open={isStarting} onClose={()=>{setIsStarting(false)}}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
                  <MuiAlert icon={false} onClose={()=>{setIsStarting(false)}}  severity="info" elevation={6} variant="standard" color="info">
                    <CircularProgress size={17} style={{display:"inline-block",verticalAlign:"middle",marginRight:"12px"}} /> Starting Download!
                  </MuiAlert>
                </Snackbar>
                <Snackbar open={isListing} onClose={()=>{setIsListing(false)}}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
                  <MuiAlert icon={false} onClose={()=>{setIsListing(false)}}  severity="info" elevation={6} variant="standard" color="info">
                    <CircularProgress size={17} style={{display:"inline-block",verticalAlign:"middle",marginRight:"12px"}} /> Fetching List!
                  </MuiAlert>
                </Snackbar>
              </Container>
        </div>
    );

}




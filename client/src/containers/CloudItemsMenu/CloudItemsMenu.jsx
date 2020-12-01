
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {CloudItem} from '../../components';
import {DropzoneDialog} from 'material-ui-dropzone'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class CloudItemsMenu extends Component {
    ismounted=false
    constructor(props){
        super(props)

        this.state={
            items:[],
            isUploadView:false,
            isUploadSnack:false
        }
        this.fetchAll=this.fetchAll.bind(this)
        this.useStyles=this.useStyles.bind(this)
        this.classes=this.classes.bind(this)
        this.handleUploadViewClose=this.handleUploadViewClose.bind(this)
        this.handleUploadViewOpen=this.handleUploadViewOpen.bind(this)
        this.handleUpload=this.handleUpload.bind(this)
        this.handleSnackClose=this.handleSnackClose.bind(this)
    }

    useStyles = ()=> makeStyles((theme) => ({
        icon: {
          marginRight: theme.spacing(2),
        },
        heroContent: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
          marginTop: theme.spacing(4),
        },
        cardGrid: {
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8),
        },
        card: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        cardMedia: {
          paddingTop: '56.25%', // 16:9
        },
        cardContent: {
          flexGrow: 1,
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(6),
        },
      }));

    classes = ()=> this.useStyles();


    async componentDidMount(){
        this.fetchAll();
        
    }
    componentWillUnmount(){
        this.isUnmounted=true;
    }
    async fetch(){
        const res = await fetch("/content")
        if(res.ok){
            const data =await res.json()
            return data
        }
        return undefined
    }
    async fetchAll(){
        this.fetch().then(data=>{

            console.log(data)
            if(this.isUnmounted){
                return;
            }
            else{
    
                this.setState({items:data})
                console.log(this.state.items)
            }
        })

    }

    handleUploadViewClose(){
      this.setState({isUploadView:false})
    }
    handleUploadViewOpen(){
      this.setState({isUploadView:true})
    }

    async handleUpload(files){
      if(files.length){
        files.forEach(file=>{this.onFileUpload(file)})
        this.setState({isUploadView:false,isUploadSnack:true})
      }

    }

    async onFileUpload(file){
      //fetch("upload",{method:"POST",body:this.state.uploadedFile})
      const data=new FormData()
      console.log(file)
      data.append("file",file)
  
      console.log(data)
      await fetch("http://localhost:4000/upload",{method:"POST",body:data,credentials: 'include'})
    }

    handleSnackClose(){
      this.setState({isUploadSnack:false})
    }


    render(){

        return (
            <React.Fragment>
                <CssBaseline />
                <main>
                    {/* Hero unit */}
                    <div className={this.classes.heroContent}>
                    <Snackbar open={this.state.isUploadSnack} autoHideDuration={6000} onClose={this.handleSnackClose}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
                      <MuiAlert onClose={this.handleSnackClose} severity="success" elevation={6} variant="standard" color="success">
                        Successfully Uploaded Files!
                      </MuiAlert>
                    </Snackbar>
                      <DropzoneDialog
                        cancelButtonText={"cancel"}
                        submitButtonText={"submit"}
                        open={this.state.isUploadView}
                        onClose={this.handleUploadViewClose}
                        onSave={this.handleUpload}
                        showPreviews={true}
                        showFileNamesInPreview={true}
                        useChipsForPreview
                      />
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Cloud Items
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.
                        </Typography>
                        <div className={this.classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                            <Button variant="contained" color="primary" onClick={this.handleUploadViewOpen} startIcon={<CloudUploadIcon />}>
                                Upload File
                            </Button>
                            </Grid>
                            <Grid item>
                            <Button variant="outlined" color="primary">
                                Secondary action
                            </Button>
                            </Grid>
                        </Grid>
                        </div>
                    </Container>
                    </div>
                    <Container className={this.classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {this.state.items&& this.state.items.map((item) => (
                        <Grid item key={item} xs={12} sm={6} md={4}> 
                            <CloudItem item={item}/>
                        </Grid>
                        ))}
                    </Grid>
                    </Container>
                </main>
                </React.Fragment>
        );//lower md value to make the rows have more files
    }
}

export default CloudItemsMenu;



/*
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {CloudItem} from '../../components';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function CloudItemsMenu() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <CloudItem/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
    </React.Fragment>
  );
}
*/

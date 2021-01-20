
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {CloudItems, FileInput} from '../../components';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Cookies from "js-cookie";



class CloudItemsMenu extends Component {
    ismounted=false
    constructor(props){
        super(props)

        this.state={
            items:[],
            isUploadView:false,
            currentIp:null,
        }
        this.fetchAll=this.fetchAll.bind(this)
        this.useStyles=this.useStyles.bind(this)
        this.classes=this.classes.bind(this)
        this.handleUploadViewClose=this.handleUploadViewClose.bind(this)
        this.handleUploadViewOpen=this.handleUploadViewOpen.bind(this)
        this.handleSnackClose=this.handleSnackClose.bind(this)
    }
    refreshItems=()=>{
      this.fetchAll()
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
        fetch("/ip").then(res=>res.json()).then(data=>{this.setState({currentIp:data.ip})})
        Cookies.set("jwt",Cookies.get("jwt"),{domain:"http://"+"192.168.1.30"+":4000"})
        
        
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
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Cloud Items
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                          Here you can view the contents of the cloud storage. Files can be downloaded and deleted. 
                          If sub folders exists within you can also view them and delete them. 
                          For uploading files first select one or more files using upload box (either click to box for file selector or drag files) then click upload button.
                        </Typography>
                        <div className={this.classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                              <FileInput refresh={this.refreshItems}/>
                            </Grid>
                        </Grid>
                        </div>
                    </Container>
                    </div>
                    <CloudItems refresh={this.refreshItems} items={this.state.items} ip={this.state.currentIp}/>
                </main>
                </React.Fragment>
        );//lower md value to make the rows have more files
    }
}

export default CloudItemsMenu;




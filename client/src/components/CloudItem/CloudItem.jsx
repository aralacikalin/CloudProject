import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from 'react-router-dom';

const {proxy} =require("../../../package.json")

//TODO : change proxy to 127.0.0.1 from localhost


class CloudItem extends Component {
  constructor(props){
    super(props)
    this.preventDefault=this.preventDefault.bind(this)
    this.classes=this.classes.bind(this)
    this.useStyles=this.useStyles.bind(this)

    this.renderCardMedia=this.renderCardMedia.bind(this)
    this.handleFile=this.handleFile.bind(this)

    this.state={
      url:"",
      fileType:""
    }
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
    cardMediaNonImg:{
      overflow:"hidden !important" ,
      paddingTop: '56.25%', // 16:9
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
  classes =()=> this.useStyles();

  componentDidMount(){
    const controller = new AbortController()
    const signal = controller.signal
    fetch(`/cloudcontents/${this.props.item}`,{signal:signal}).then((res)=>{
      if(res.headers.get("content-type").split(";")[0].includes("image")){
        this.setState({fileType:"img"})
      }
      else{
        this.setState({fileType:res.headers.get("content-type").split(";")[0]})
      }
      console.log(res.headers.get("content-type").split(";")[0])
      if(res.headers.get("content-length")<200000000){

        return(res.blob())
      }
      controller.abort()
    }).then(img=>{
      if (img){

        var u=URL.createObjectURL(img)
        this.setState({url:u})
      }
    })
  }

  preventDefault(event){
     fetch(`/download/${this.props.item}`).then(response => {
      //const type = response.headers['content-type'];
      const filename = response.headers
          .get("content-disposition")
          .split('"')[1];
      /*const blob = */response.blob().then(blob=>{

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename; // Here I want to get rid of hardcoded value instead I want filename from server
        link.click();
        link.remove(); //  Probably needed to remove html element after downloading?
      })
    });


    event.preventDefault()
  }
  

  handleFile(){
    
  }


  renderCardMedia(){
    if(this.state.fileType==="img"){
      return(
        <CardMedia
          className={this.classes.cardMedia}
          component="img"
          src={this.state.url}
          title={this.props.item}
        />

      )
    }
    else if(this.state.fileType==="application/pdf"){
      return(
        <object width="100%" height="%100" className={this.classes.cardMediaNonImg} data={this.state.url} type="application/pdf">   </object>
      )

    }
    else if (this.state.fileType==="text/plain"){
      return(
        <object className={this.classes.cardMediaNonImg} width="100%" height="%100" data={this.state.url} type="text/plain">   </object>
      )
    }
    else{
      return(null)
    }
  }

  render(){


    return(
      
      <Card className={this.classes.card}>
        {this.renderCardMedia()}
        <CardContent className={this.classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.item}
          </Typography>
          <Typography>
            Insert Possible File Information (like size, type)
          </Typography>
        </CardContent>
        <CardActions>
        <a style={{textDecoration:"none"}}  href={`${this.props.ip}download/${this.props.item}`}>

          <Button size="small" color="primary">
            <GetAppIcon/>
          </Button>
        </a>
          <Button size="small" onClick={this.preventDefault} color="primary">
            <GetAppIcon/>
          </Button>

          <a style={{textDecoration:"none"}} target="_blank" rel="noopener noreferrer" href={this.state.url}>
            <Button size="small" color="primary">
              See File
            </Button>

          </a>
        </CardActions>
      </Card>
    );


    /*
    return (
      <div>
          <Link onClick={this.preventDefault}>
            {this.props.item}
          </Link>
      </div>
    );
    */
  }
}

export default CloudItem;

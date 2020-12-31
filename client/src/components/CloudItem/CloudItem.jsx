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
import { Accordion, AccordionDetails, AccordionSummary, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const {proxy} =require("../../../package.json")

//TODO : change proxy to 127.0.0.1 from localhost

const accordionStyle={
  backgroundColor:'gray',
  borderStyle:"groove",
  borderBottom:"none",
  borderTop:"none"
}
const collapsableStyle={
  borderStyle:"groove",
  borderLeft:"none",
  borderRight:"none",
  borderTop:"none"
}

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
      fileType:"",
      subContent:[],
      subFolder:""

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
    if(this.props.ext!=="folder"){

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
    }else{
      fetch(`/subcontent/${this.props.item}`).then(res=>(res.json())).then(data=>{
        this.setState({subContent:data})
      })
    }
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

  renderDetails=()=>{
    if(parseFloat(this.props.size).toFixed(3)>1000){
      return(<div>{parseFloat(this.props.size/1000).toPrecision(2)} GB </div>)
    }
    else if(parseInt(this.props.size).toFixed(3)>0) {
      return(<div>{parseFloat(this.props.size).toFixed(2)} MB</div>)
    }
    else if(parseInt(this.props.size)<=0){
      return(<div>{parseFloat(this.props.size).toFixed(3)*1000} KB</div>)
    }
  }

  render(){

    var name=this.props.item
    var nameArray =name.split(".")
    if(this.props.ext!=="folder"){
      nameArray.pop()
    }

    var nameWOExt=nameArray.join(".")
    nameWOExt=nameWOExt.split("/").pop()





      return(
        <Card className={this.classes.card}>
          {this.renderCardMedia()}
          <CardContent className={this.classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {nameWOExt}
            </Typography>
            <Typography >
              <div style={{display:"flex"}}>Size: &nbsp; {this.renderDetails()}</div>
              <div style={{display:"flex"}}>Type: &nbsp; {this.props.ext}</div> 
            </Typography>
          </CardContent>
          {this.props.ext!=="folder"?(<CardActions>
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
          </CardActions>):
          (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}/>
              <Paper elevation={30} style={collapsableStyle}>
                {this.state.subContent.map(item=>(
                <AccordionDetails style={accordionStyle}><CloudItem item={this.props.item+"/"+item[0]}  ip={this.props.ip} size={item[1]} ext={item[2]}></CloudItem></AccordionDetails>
                ))}
              </Paper>
          </Accordion>

          )
      }</Card>
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

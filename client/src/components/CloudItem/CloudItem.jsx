import React, { Component } from 'react';
import axios from "axios"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


class CloudItem extends Component {
  constructor(props){
    super(props)
    this.preventDefault=this.preventDefault.bind(this)
    this.classes=this.classes.bind(this)
    this.useStyles=this.useStyles.bind(this)
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
  classes =()=> this.useStyles();
  preventDefault(event){
    /*
    //!not very safe
    fetch(`/download/${this.props.item}`)
      .then(res=>{
        if(res.ok){
          window.open(`http://localhost:4000/download/${this.props.item}`)
        }
      });
      */
     //probably safer alternative than above
     fetch(`/download/${this.props.item}`).then(response => {
      const type = response.headers['content-type'];
      const filename = response.headers
          .get("content-disposition")
          .split('"')[1];
      const blob = response.blob().then(blob=>{

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
  

  render(){


    return(
      
      <Card className={this.classes.card}>
        <CardMedia
          className={this.classes.cardMedia}
          component="img"
          src={`http://localhost:4000/cloudcontents/${this.props.item}`}
          title={this.props.item}
        />
        <CardContent className={this.classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.item}
          </Typography>
          <Typography>
            Insert Possible File Information (like size, type)
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={this.preventDefault}>
            Download
          </Button>
          <Button size="small" color="primary">
            Edit
          </Button>
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

import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import axios from "axios"

class CloudItem extends Component {
  constructor(props){
    super(props)
    this.preventDefault=this.preventDefault.bind(this)
  }
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
      const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' });
      //const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename; // Here I want to get rid of hardcoded value instead I want filename from server
      link.click();
      link.remove(); //  Probably needed to remove html element after downloading?
    });

    event.preventDefault()
  }
  

  render(){

    return (
      <div>
          <Link href={`/download/${this.props.item}`} onClick={this.preventDefault}>
            {this.props.item}
          </Link>
      </div>
    );
  }
}

export default CloudItem;

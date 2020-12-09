import React, { Component } from 'react';
import Axios from "axios";
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'; //TODO can use this icon
import Grid from '@material-ui/core/Grid';




class FileInput extends Component {
  constructor(props){
    super(props)
    this.state={
        files:[],
        uploadProgress:0,
        isUploadSnack:false,

    }
    this.handleUpload=this.handleUpload.bind(this);
    this.onFileUpload=this.onFileUpload.bind(this);
    this.handleSnackClose=this.handleSnackClose.bind(this);
  }

  async handleUpload(){
    if(this.state.files.length){
      this.state.files.forEach(file=>{this.onFileUpload(file)})
    }

  }

  async onFileUpload(file){
    //fetch("upload",{method:"POST",body:this.state.uploadedFile})
    const data=new FormData()
    console.log(file)
    data.append("file",file)

    console.log(data)
    Axios.post("/upload",data,{onUploadProgress: progressEvent=>{
      this.setState({uploadProgress:parseInt(Math.round((progressEvent.loaded*100)/progressEvent.total))})
    }}).then(()=>{
      this.setState({isUploadSnack:true})
    });
    //await fetch("/upload",{method:"POST",body:data,credentials: 'include'})
  }

  handleSnackClose(){
    this.setState({isUploadSnack:false})
  }

  render(){

    return (
        <div>
            <Grid container spacing={2} justify="center">
                <Grid item>
                    <Dropzone onDrop={acceptedFiles => {this.setState({files:acceptedFiles})}}>
                        {({getRootProps, getInputProps}) => (
                        <section className="container">
                            <div {...getRootProps({className: 'dropzone'})}>
                            <input multiple {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                            <h4>Files</h4>
                            <aside>
                                <ul>{this.state.files.map(file=>
                                    (<li key={file.name}>
                                        {file.name} - {(parseInt(file.size)/1000000).toFixed(1)} Megabytes
                                    </li>))}
                                </ul>

                            </aside>
                            </div>
                        </section>
                        )}
                    </Dropzone>
                </Grid>
                <Grid item>
                    <div>{this.state.uploadProgress}</div>
                    <Button variant="outlined" color="primary" onClick={this.handleUpload}>Submit Files</Button>
                </Grid>
            </Grid>
            <Snackbar open={this.state.isUploadSnack} autoHideDuration={6000} onClose={this.handleSnackClose}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
                      <MuiAlert onClose={this.handleSnackClose} severity="success" elevation={6} variant="standard" color="success">
                        Successfully Uploaded Files!
                      </MuiAlert>
                    </Snackbar>
        </div>
      
    );
  }
}

export default FileInput;
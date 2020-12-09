import React, { Component } from 'react';
import Axios from "axios";
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';


class FileInput extends Component {
  constructor(props){
    super(props)
    this.state={
        files:[],
        uploadProgress:0
    }
    this.handleUpload=this.handleUpload.bind(this);
    this.onFileUpload=this.onFileUpload.bind(this);
  }

  async handleUpload(){
    if(this.state.files.length){
      this.state.files.forEach(file=>{this.onFileUpload(file)})
      //this.setState({isUploadView:false,isUploadSnack:true})
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
    }});
    //await fetch("/upload",{method:"POST",body:data,credentials: 'include'})
  }

  render(){

    return (
        <div>
            <Dropzone onDrop={acceptedFiles => {this.setState({files:acceptedFiles})}}>
                {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                    <input multiple {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <h4>Files</h4>
                    <ul>{this.state.files.map(file=>( <li key={file.name}>
                    {file.name} - {file.size} bytes
                </li>))}</ul>
                    </div>
                </section>
                )}
            </Dropzone>
            <div>{this.state.uploadProgress}</div>
            <Button variant="outlined" color="primary" onClick={this.handleUpload}>action</Button>
        </div>
      
    );
  }
}

export default FileInput;

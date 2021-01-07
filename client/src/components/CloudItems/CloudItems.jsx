
import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import {CloudItem} from '../../components';

import { Button, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ListIcon from '@material-ui/icons/List';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


class CloudItems extends Component {
    constructor(props){
        super(props)

        this.state={
            search:"",
            isDeleteAlert:false,
            isListView:false
        }

    }

    handleDeleteConfirmationAlertClose=()=>{
        this.setState({isDeleteAlert:false})
    }

    isDeleted=()=>{
        this.setState({isDeleteAlert:true})
    }
    handleIsList=()=>{
        this.setState({isListView:!this.state.isListView})
    }


    render(){

        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth={this.state.isListView?("md"):("xl")}>
                    
                    {/* End hero unit */}
                    <Container maxWidth="sm" >

                        <Grid container xs={12} spacing={1} style={{margin:8}} alignItems={'flex-end'}>
                            <Grid item xs={1} >
                                <SearchIcon />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField id="standard-basic" fullWidth onChange={(event)=>{this.setState({search:event.target.value})}} label="Search"/>
                            </Grid>
                            <Grid item xs={1} >
                                <Button onClick={this.handleIsList}>
                                    <ListIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                    <Grid container spacing={4}>
                        {this.props.items&& this.props.items.filter(item=>item[0].toLowerCase().includes(this.state.search.toLowerCase().trim())||item[2].includes(this.state.search.trim())).map((item) => (
                        !this.state.isListView?(<Grid item key={item[0]} xs={12} sm={6} md={4} lg={3}> 
                            <CloudItem isListView={false} refresh={this.props.refresh} isDeleted={this.isDeleted} item={item[0]} size={item[1]} ext={item[2]} ip={"http://"+this.props.ip+":4000/"}/>
                        </Grid>):
                        (<Grid item key={item[0]} xs={12}> 
                            <CloudItem isListView={true} refresh={this.props.refresh} isDeleted={this.isDeleted} item={item[0]} size={item[1]} ext={item[2]} ip={"http://"+this.props.ip+":4000/"}/>
                        </Grid>)
                        ))}
                    </Grid>
                    </Container>
                    <Snackbar open={this.state.isDeleteAlert} autoHideDuration={6000} onClose={this.handleDeleteConfirmationAlertClose}  anchorOrigin={{vertical: 'bottom',horizontal: 'left',}}>
                        <MuiAlert onClose={this.handleDeleteConfirmationAlertClose} severity="success" elevation={6} variant="standard" color="success">
                            Deleted Successfully!
                        </MuiAlert>
                    </Snackbar>
                </React.Fragment>
        );//lower md value to make the rows have more files
    }
}

export default CloudItems;



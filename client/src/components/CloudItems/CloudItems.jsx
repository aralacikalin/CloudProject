
import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import {CloudItem} from '../../components';

import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';




class CloudItems extends Component {
    constructor(props){
        super(props)

        this.state={
            search:""
        }

    }





    render(){

        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md">
                    
                    {/* End hero unit */}
                        <Grid container xs={12} spacing={1} style={{margin:8}} alignItems={'flex-end'}>
                            <Grid item >
                                <SearchIcon />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField id="standard-basic" fullWidth onChange={(event)=>{this.setState({search:event.target.value})}} label="Search"/>
                            </Grid>
                        </Grid>
                    <Grid container spacing={4}>
                        {this.props.items&& this.props.items.filter(item=>item[0].toLowerCase().includes(this.state.search.toLowerCase().trim())||item[2].includes(this.state.search.trim())).map((item) => (
                        <Grid item key={item[0]} xs={12} sm={6} md={4}> 
                            <CloudItem item={item[0]} size={item[1]} ext={item[2]} ip={"http://"+this.props.ip+":4000/"}/>
                        </Grid>
                        ))}
                    </Grid>
                    </Container>
                </React.Fragment>
        );//lower md value to make the rows have more files
    }
}

export default CloudItems;



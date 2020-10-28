import axios from 'axios';
import React, { Component } from 'react';
import {CloudItem} from '../../components';

class CloudItemsMenu extends Component {
    ismounted=false
    constructor(props){
        super(props)

        this.state={
            items:[]
        }
        this.fetchAll=this.fetchAll.bind(this)
        this.fetch=this.fetch.bind(this)
    }

    async componentDidMount(){
        this.fetchAll();
        
    }
    componentWillUnmount(){
        this.isUnmounted=true;
    }
    async fetch(){
        
        const res = await fetch("http://192.168.1.30:4000/content")
        const data =await res.json()
        return data
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


    render(){

        return (
            <div>
                CLOUD ITEMS
                {this.state.items.map((val,i)=>(<CloudItem key={i} item={val} />))}
            </div>
        );
    }
}

export default CloudItemsMenu;

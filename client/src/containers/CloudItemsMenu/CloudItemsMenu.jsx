import React, { Component } from 'react';
import {CloudItem} from '../../components';

class CloudItemsMenu extends Component {
  constructor(props){
    super(props)

  }


  render(){

    return (
      <div>
          CLOUD ITEMS
          <CloudItem></CloudItem>
          <CloudItem></CloudItem>
          <CloudItem></CloudItem>
      </div>
    );
  }
}

export default CloudItemsMenu;

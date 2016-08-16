import React, { Component } from 'react';
import { ListItem } from './ListItem.js';

export class GroceryList extends Component{

  render(){
    return(
      <ul>
        <ListItem quantity="1">Bread</ListItem>
        <ListItem quantity="6">Eggs</ListItem>
        <ListItem quantity="2">Milk</ListItem>
      </ul>
    );
  }
}

import React, { Component } from 'react';

export class ListItem extends Component {
  render(){
    return(
      <li>
        { this.props.quantity } x { this.props.children }
      </li>
    );
  }
}

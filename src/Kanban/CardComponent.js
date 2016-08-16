import React, { Component, PropTypes } from 'react';

import { CheckListComponent } from './CheckListComponent.js';
import marked from 'marked';

export class CardComponent extends Component {

  constructor(){
    super(...arguments);
    this.state = {
      showDetails: false
    };
  }

  toggleDetails(event){
    this.setState({ showDetails: !this.state.showDetails });
  }

  render(){
    let cardDetails;
    if(this.state.showDetails){
      cardDetails = (
        <div  className="card__details">
        <span dangerouslySetInnerHTML={{ __html:marked(this.props.description) }} />
          <CheckListComponent cardId={this.props.id} tasks={this.props.tasks} />
        </div>
      );
    }
    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };
    return (
      <div className="card">
        <div style={ sideColor } />
        <div className={
          this.state.showDetails ? "card__title card__title--is-open" : "card__title"
        } onClick={ this.toggleDetails.bind(this) }> {this.props.title}</div>
        { cardDetails }
      </div>
    );
  }
}

let titlePropType = (props, propName, componentName) => {
  if(props[propName]){
    let value = props[propName];
    if(typeof value !== 'string' || value.length > 80){
      return new Error(`${propName} in ${componentName} is longer than 80 characters`);
    }
  }
};

CardComponent.propTypes = {
  id: PropTypes.number,
  title: titlePropType,
  description: PropTypes.string,
  color: PropTypes.string,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

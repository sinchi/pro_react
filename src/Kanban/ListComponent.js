import React, { Component, PropTypes } from 'react';
import { _ } from 'underscore';

import { DropTarget } from 'react-dnd';
import constants from '../modules/constants';

import  CardComponent  from './CardComponent.js';
//import  FontAwesome  from 'react-fontawesome';


const listTargetSpec = {
    hover(props, monitor){
      const draggedId = monitor.getItem().id;      
      props.cardCallbacks.updateCardStatus(draggedId, props.id)
    }
}

function collect(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class ListComponent extends Component {
  render(){
    const { connectDropTarget } = this.props;

    let cards = _.map(this.props.cards, (card) => {
      return <CardComponent key={ card.id } cardCallbacks={  this.props.cardCallbacks} taskCallbacks={ this.props.taskCallbacks } id={ card.id } { ...card } />
    });

    return connectDropTarget(
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

ListComponent.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  title : PropTypes.string.isRequired,
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(ListComponent);

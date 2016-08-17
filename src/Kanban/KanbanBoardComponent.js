import React, { Component, PropTypes } from 'react';
import { _ } from 'underscore';

import  ListComponent  from './ListComponent.js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class KanbanBoardComponent extends Component {
  render(){
    return(
      <div className="app">
        <ListComponent id='todo' title="To Do" cardCallbacks={ this.props.cardCallbacks } taskCallbacks={ this.props.taskCallbacks }  cards={ _.filter(this.props.cards, (card) => card.status === "todo") } />
        <ListComponent id="in-progress" title="In Progress" cardCallbacks={ this.props.cardCallbacks } taskCallbacks={ this.props.taskCallbacks } cards={ _.filter(this.props.cards, (card) => card.status === 'in-progress') }/>
        <ListComponent id="done" title="Done" cardCallbacks={ this.props.cardCallbacks } taskCallbacks={ this.props.taskCallbacks } cards={ _.filter(this.props.cards, (card) => card.status === "done") } />
      </div>
    );
  }


}

KanbanBoardComponent.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoardComponent);

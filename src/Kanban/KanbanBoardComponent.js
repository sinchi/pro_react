import React, { Component, PropTypes } from 'react';
import { _ } from 'underscore';
import { Link } from 'react-router';

import  ListComponent  from './ListComponent.js';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class KanbanBoardComponent extends Component {
  render(){
    let cardModal = this.props.children && React.cloneElement(this.props.children, {
      cards: this.props.cards,
      cardCallbacks: this.props.cardCallbacks
    });
    return(
      <div className="app">
        <Link to="/new" className="float-button">+</Link>
        <ListComponent id='todo'
                      title="To Do"
                      cardCallbacks={ this.props.cardCallbacks }
                      taskCallbacks={ this.props.taskCallbacks }
                      cards={ _.filter(this.props.cards, (card) => card.status === "todo") } />
        <ListComponent id="in-progress"
                        title="In Progress"
                        cardCallbacks={ this.props.cardCallbacks }
                        taskCallbacks={ this.props.taskCallbacks }
                        cards={ _.filter(this.props.cards, (card) => card.status === 'in-progress') }/>
        <ListComponent id="done"
                      title="Done"
                      cardCallbacks={ this.props.cardCallbacks }
                      taskCallbacks={ this.props.taskCallbacks }
                      cards={ _.filter(this.props.cards, (card) => card.status === "done") } />
        { cardModal }
      </div>
    );
  }
};

KanbanBoardComponent.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object,
  cardCallbacks: PropTypes.object
};

export default DragDropContext(HTML5Backend)(KanbanBoardComponent);

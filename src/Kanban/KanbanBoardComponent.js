import React, { Component, PropTypes } from 'react';
import { _ } from 'underscore';

import { ListComponent } from './ListComponent.js';

export class KanbanBoardComponent extends Component {
  render(){
    return(
      <div className="App">
        <ListComponent id='todo' title="To Do" cards={ _.filter(this.props.cards, (card) => card.status === "todo") } />
        <ListComponent id="in-progress" title="In Progress" cards={ _.filter(this.props.cards, (card) => card.status === 'in-progress') }/>
        <ListComponent id="done" title="Done" cards={ _.filter(this.props.cards, (card) => card.status === "done") } />
      </div>
    );
  }


}

KanbanBoardComponent.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object)
};

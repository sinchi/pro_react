import React, { Component } from 'react';

import { KanbanBoardComponent } from './KanbanBoardComponent.js';
import 'whatwg-fetch';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'sinchi'
};

export class KanbanBoardContainerComponent extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      cards: []
    }
  }

  addTask(cardId, taskName){
    console.log("addTask");
    console.log("cardId", cardId);
    console.log("taskName", taskName);
  }

  deleteTask(cardId, taskId, taskIndex){
    console.log("deleteTask");
    console.log("cardId", cardId);
    console.log("taskId", taskId);
    console.log("taskIndex", taskIndex);
  }

  toggleTask(cardId, taskId, taskIndex){
    console.log("toggleTask");
    console.log("cardId", cardId);
    console.log("taskId", taskId);
    console.log("taskIndex", taskIndex);
  }

  componentDidMount(){
    fetch(API_URL+'/cards', { headers: API_HEADERS })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ cards: responseData });
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    })
  }

  render(){
    return (
      <KanbanBoardComponent cards={ this.state.cards }
                            taskCallbacks={{
                              toggle: this.toggleTask.bind(this),
                              delete: this.deleteTask.bind(this),
                              add: this.addTask.bind(this)
                            }}/>
    )
  }
}

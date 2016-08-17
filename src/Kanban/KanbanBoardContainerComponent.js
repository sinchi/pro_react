import React, { Component } from 'react';

import  KanbanBoardComponent  from './KanbanBoardComponent.js';
import 'whatwg-fetch';
import 'babel-polyfill';
import  update  from 'react-addons-update';

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

  componentDidMount(){
    fetch(`${API_URL}/cards`, { headers: API_HEADERS })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({ cards: responseData })
      window.state = this.state;
    })
    .catch((error) => {
      console.log('Error fetching and parsing data', error);
    })
  }


  addTask(cardId, taskName){

    // Keep a reference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

    // Create a new task with the given name and a temporary ID
    let newTask = { id: Date.now(), name: taskName, done: false };

    // Create a new object and push the new task to the array of tasks
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $push: [newTask] }
      }
    });

    // Set the Component state to the mutated object
    this.setState({ cards: nextState});

    // Call the API to add the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(newTask)
    })
    .then((response) => {
      if(response.ok){
        return response.json()
      }else{
        // Throw an error if the server response wasn't 'ok'
        // so you can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK");
      }
    })
    .then((responseData) => {
      // When the server return the definitive ID
      // used to the new Task on the servern, update it on React
      newTask.id = responseData.id;
      this.setState({ cards: nextState });
    })
    .catch((error) => {
      this.setState(prevState);
    });

  }

  deleteTask(cardId, taskId, taskIndex){

    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

    // Keep a reference to the original state prior to the mutations
    // in case you need to revert the optimistic changes in the UI
    let prevState = this.state;

    // Create new Obejct without the task
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: { $splice: [[taskIndex, 1]] }
      }
    });

    // set the component state to the mutated object
    this.setState({ cards: nextState });

    // Call the API to remove the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'delete',
      headers: API_HEADERS
    })
    .then((response) => {
      if(!response.ok){
        // Throw an error if server response wasn't 'ok'
        // so you can revert back the optimistic changes
        // made to the UI.
        throw new Error("Server response wasn't OK");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      this.setState(prevState);
    });
  }

  toggleTask(cardId, taskId, taskIndex){

    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    // Keep a reference to the original state prior to the mutations
    // in case you need to revert the optimistic change in the UI
    let prevState = this.state;

    // Save a reference to the task's 'done' value
    let newDoneValue ;
    // Using $apply command, you will change the done value to its opposite
    let nextState = update(this.state.cards, {
      [cardIndex]: {
        tasks: {
          [taskIndex]: {
            done: {
              $apply: (done) => {
                newDoneValue = !done;
                return newDoneValue;
              }
            }
          }
        }
      }
    });
    // Set the component state to mutate object
    this.setState({ cards: nextState });

    // Call the API to toggle the task on the server
    fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify({ done: newDoneValue })
    })
    .then((response) => {
      if(!response.ok){
        throw new Error("Server response wasn't OK");
      }
    })
    .catch((error) => {
      console.log("Fetch error", error);
      this.setState(prevState);
    });
  }

  updateCardStatus(cardId, listId){
    let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
    let card = this.state.cards[cardIndex];

    // Only proceed if hovering over a different list
    if(card.status !== listId){
      // set the component state to the mutated object
      this.setState(update(this.state, {
        cards:{
          [cardIndex]: {
            status: { $set: listId }
          }
        }
      }));
    }
  }

  updateCardPosition(cardId, afterId){
    // Only proceed if hovering over a different card
    if(cardId !== afterId){
      // Find the index of the card
      let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
      // get the current card
      let card = this.state.cards[cardIndex];
      // Find the index of the card the user is hovering over
      let afterIndex = this.state.cards.findIndex((card) => card.id === afterId);
      // Use splice to remove the card and reinsert it at the new index
      this.setState(update(this.state, {
        cards:{
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }


  render(){
    return (
      <KanbanBoardComponent cards={ this.state.cards }
                            taskCallbacks={{
                              toggle: this.toggleTask.bind(this),
                              delete: this.deleteTask.bind(this),
                              add: this.addTask.bind(this)
                            }}
                            cardCallbacks={{
                              updateCardPosition: this.updateCardPosition.bind(this),
                              updateCardStatus: this.updateCardStatus.bind(this)
                            }}/>
    )
  }
}

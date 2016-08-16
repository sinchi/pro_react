import React, { Component } from 'react';
import './App.css';
import { KanbanBoardContainerComponent } from './Kanban/KanbanBoardContainerComponent.js';

class App extends Component {
  render() {

    return (
      <div className="app">
        <KanbanBoardContainerComponent />
      </div>
    );
  }
}

export default App;

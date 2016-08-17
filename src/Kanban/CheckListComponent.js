import React, { Component, PropTypes } from 'react';

import { _ } from 'underscore';


export class CheckListComponent extends Component {

  checkInputKeyPress(event){
    if(event.key === 'Enter'){
      this.props.taskCallbacks.add(this.props.cardId, event.target.value);
      event.target.value = "";
    }
  }

  render(){
    let tasks = _.map(this.props.tasks, (task, taskIndex) => {
      return <li key={ task.id } className="checklist__task">
                <input type="checkbox" defaultChecked={ task.done } onChange={ this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex) }/>
                { task.name }
                <a href="#" className="checklist__task--remove" onClick={ this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex) }/>
              </li>
    });

    return (
      <div className="checklist">
        <ul>{ tasks }</ul>
        <input type="text"
              className="checklist--add-task"
              placeholder="Type then hit Enter to add a task"
              onKeyPress={ this.checkInputKeyPress.bind(this) }
        />
      </div>
    );
  }
}

CheckListComponent.propTypes = {
  cardId: PropTypes.number,
  taskCallbacks: PropTypes.object,
  tasks: PropTypes.array
}

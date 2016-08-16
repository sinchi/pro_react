import React, { Component, PropTypes } from 'react';

import { _ } from 'underscore';

export class CheckListComponent extends Component {
  render(){
    let tasks = _.map(this.props.tasks, (task) => {
      return <li key={ task.id } className="checklist__task">
                <input type="checkbox" defaultChecked={ task.done } />
                { task.name }
                <a href="#" className="checklist__task--remove" />
              </li>
    });

    return (
      <div className="checklist">
        <ul>{ tasks }</ul>
        <input type="text"
              className="checklist--add-task"
              placeholder="Type then hit Enter to add a task" />
      </div>
    );
  }
}

CheckListComponent.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object)
}

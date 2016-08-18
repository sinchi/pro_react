import React from 'react';
import {render} from 'react-dom';
import { Route, Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import  KanbanBoardContainerComponent  from './Kanban/KanbanBoardContainerComponent';
import  KanbanBoardComponent  from './Kanban/KanbanBoardComponent';
import NewCard from './Kanban/NewCard.js';
import EditCard from './Kanban/EditCard.js';
import './style.css';

render((
  <Router history={createBrowserHistory()}>
    <Route component={KanbanBoardContainerComponent}>
      <Route path="/" component={KanbanBoardComponent}>
        <Route path="new" component={NewCard}/>
        <Route path="edit/:card_id" component={EditCard} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'));

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import List from './List';
import Create from './Create';
import './App.css';

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/:list" component={List} />
      <Route exact path="/:list/create" component={Create} />
    </div>
  </Router>
);

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Categories from './Categories';
import Joke from './Joke';
import './App.css';

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={Categories} />
      <Route exact path="/joke/:category" component={Joke} />
    </div>
  </Router>
);

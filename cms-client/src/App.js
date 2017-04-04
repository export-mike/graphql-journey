import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import components from '../components';
class App extends Component {
  render() {
    return (
      <div className="App">
        {Object.keys(components).map(k => <Section {...components[k]} />)}
      </div>
    );
  }
}

export default App;

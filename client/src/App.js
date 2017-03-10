import React from 'react';
import compose from 'recompose/compose';
import { gql, graphql } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

const App = props =>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Time to have a laugh with Chuck Norris</h2>
      </div>
      {
        props.data.loading && <span>Loading Norris Jokes</span>
      }
      {
        !props.data.loading
        && <p className="App-intro">
          {props.data.chuckNorrisJokeCategories.map(c => <span key={c.category}>{c.category}</span>)}
        </p>
      }

    </div>

// const JokeQuery = gql`
// query JokeQuery {
//   getJokeByCategory($category: String!){
//    value
//  }
// }
// `;

const CategoriesQuery = gql`
query CategoriesQuery {
  chuckNorrisJokeCategories {
    category
  }
}`
export default compose(
  graphql(CategoriesQuery)
)(App);

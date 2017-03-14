import React from 'react';
import { gql, graphql } from 'react-apollo';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
// <a key={c.category} href={`/joke/${c.category}`}>
//   {c.category}
// </a>
const App = props => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Time to have a laugh with Chuck Norris</h2>
    </div>
    {props.data.loading && <span>Loading Norris Jokes</span>}
    {!props.data.loading &&
      <p className="App-intro">
        {props.data.jokeCategories.map(c => (
          <div>

            <Link key={c.category} to={`/joke/${c.category}`}>
              {c.category}
            </Link>
          </div>
        ))}
      </p>}
  </div>
);

const CategoriesQuery = gql`
  query CategoriesQuery {
    jokeCategories {
      category
    }
  }
`;
export default graphql(CategoriesQuery)(App);

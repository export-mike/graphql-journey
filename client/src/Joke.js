import React from 'react';
import compose from 'recompose/compose';
import { gql, graphql } from 'react-apollo';
import logo from './logo.svg';

const Joke = props => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Time to have a laugh with Chuck Norris</h2>
      {props.data.loading && <span>Loading a cracking Joke!</span>}
    </div>
    {!props.data.loading && props.data.joke.value}
    {!props.data.loading &&
      <img src={props.data.joke.iconUrl} alt="presentation" />}

  </div>
);

const JokeQuery = gql`
  query JokeQuery($category: String!) {
    joke(category: $category) {
      value,
      iconUrl
    }
  }
`;

export default compose(
  graphql(JokeQuery, {
    options: ({ match }) => ({
      variables: {
        category: match.params.category,
      },
    }),
  })
)(Joke);

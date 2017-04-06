import React from 'react';
import compose from 'recompose/compose';
import { gql, graphql } from 'react-apollo';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { typesAsArray } from './types';

const Count = props => (
  <Link to={`/${props.displayName}`}> {props.displayName}s {props.count} </Link>
);

const dataKey = component => `count${component.displayName}s`;

const dataKeys = typesAsArray.map(dataKey);

const Home = props => {
  return (
    <div className="App">
      {Object.keys(props.data)
        .filter(k => dataKeys.includes(k))
        .map((k, i) => ({
          count: props.data[k],
          ...typesAsArray[i],
        }))
        .map(type => <Count key={type.displayName} {...type} />)}
    </div>
  );
};

const HomeQuery = gql`
  query Count {
    ${typesAsArray.map(component => dataKey(component))}
  }
`;

export default compose(graphql(HomeQuery))(Home);

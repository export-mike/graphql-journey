import React from 'react';
import compose from 'recompose/compose';
import { gql, graphql } from 'react-apollo';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { componentsAsArray } from './components';

const Count = props => (
  <Link to={`/${props.displayName}`}> {props.displayName}s {props.count} </Link>
);

const dataKey = component => `count${component.displayName}s`;

const dataKeys = componentsAsArray.map(dataKey);

const Home = props => {
  return (
    <div className="App">
      {Object.keys(props.data)
        .filter(k => dataKeys.includes(k))
        .map((k, i) => ({
          count: props.data[k],
          ...componentsAsArray[i],
        }))
        .map(component => <Count key={component.displayName} {...component} />)}
    </div>
  );
};

const HomeQuery = gql`
  query Count {
    ${componentsAsArray.map(component => dataKey(component))}
  }
`;

export default compose(graphql(HomeQuery))(Home);
